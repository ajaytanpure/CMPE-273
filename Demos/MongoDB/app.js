var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , session = require('express-session')
  , signin = require('./routes/signinRoute')
  , register = require('./routes/registerRoute')
  , mongoStore = require("connect-mongo")(session)
  , mongo = require("./routes/mongo");

var app = express();
var mongoSessionConnectURL = "mongodb://localhost:27017/test";

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(session({
	secret: 'secret_dont tell anyone',
	resave: false,  //don't save session if unmodified
	saveUninitialized: false,	// don't create session until something stored
	duration: 30 * 60 * 1000,    
	activeDuration: 5 * 60 * 1000,
	store: new mongoStore({
		url: mongoSessionConnectURL
	})
}));


app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.post('/signin', signin.signin);
app.post('/register', register.register);
app.post('/sessionActive', routes.sessionActive);
app.post('/logout', routes.logout);
app.post('/getDetails', routes.getDetails);
//app.post('/sessionActive', routes.sessionActive);
//app.post('/sessionKill', routes.sessionKill);

//connect to the mongo collection session and then createServer
mongo.connect(mongoSessionConnectURL, function(){
	console.log('Connected to mongo at: ' + mongoSessionConnectURL);
	http.createServer(app).listen(app.get('port'), function(){
		console.log('Express server listening on port ' + app.get('port'));
	});  
});