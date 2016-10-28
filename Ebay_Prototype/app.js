
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  ,session = require('express-session')
  ,signin = require('./routes/signinRoute')
  ,register = require('./routes/registerRoute')
  ,seller = require('./routes/sellRoute')
  ,products = require('./routes/productsRoute')
  ,passport = require('passport')
  ,mongoStore = require('connect-mongo')(session)
  ,mongo = require('./routes/mongo')
  ;

require('./routes/signinRoute')(passport);

var app = express();
var mongoSessionConnectURL = "mongodb://localhost:27017/testEbay";

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());


app.use(session({
  secret: 'secret dont tell anyone shhh',
  resave: false,  //don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  duration: 30 * 60 * 1000,    
  activeDuration: 5 * 60 * 1000,
  store: new mongoStore({
    url: mongoSessionConnectURL
  })
}));



app.use(app.router);
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/', routes.index);
app.get('/users', user.list);

app.post('/signin', function(req, res){
  console.log(req.body);
  passport.authenticate('signin', function(err, user){
    if(user){
      console.log("-----------------------------------------------------------");
      console.log(user['email']);
      req.session.username = user['email'];
      console.log(req.session.username);
      console.log('Before sending');
      res.send({'status':'success'});
    }
    else{
      res.send({'status':'fail'});
    }
    
    console.log("Session started in Passport");
  })(req, res);
});

app.post('/updateLogin', routes.updateLogin);
app.post('/register', register.register);
app.post('/sessionActive', routes.sessionActive);
app.post('/sessionKill', routes.sessionKill);
app.post('/getUserId', routes.getUserId);
app.post('/getUserDetails', routes.getUserDetails);
app.post('/loadCategory', seller.loadCategory);
app.post('/insertProduct', seller.insertProduct);
app.post('/getProducts', products.getProducts);
app.post('/getProduct', products.getProduct);
app.post('/addToCart', products.addToCart);
app.post('/getCart', products.getCart);
app.post('/updateUserBuy', products.updateUserBuy);
app.post('/viewBuyHistory', routes.viewBuyHistory);
app.post('/viewSellHistory', routes.viewSellHistory);
app.post('/updateMobile', routes.updateMobile);
app.post('/updateBirthdate', routes.updateBirthdate);
app.post('/updateLocation', routes.updateLocation);
app.post('/bidIt', routes.bidIt);
app.post('/mapEvents', products.mapEvents);

//connect to the mongo collection session and then createServer
mongo.connect(function(){
  console.log('Connected to mongo at: ' + mongoSessionConnectURL);
  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });  
});