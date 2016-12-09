package com.ebay;

import java.sql.*;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.ConnectionPoolDataSource;

public class DBConnector {

	static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
	static final String DB_URL = "jdbc:mysql://localhost:3306/StartTest";
	static final String USER = "root";
	static final String PASSWORD = "root123";
	Connection conn = null;
	
	public Connection getConnector() {
		try {
			Context ctx = new InitialContext();
			ConnectionPoolDataSource cpds = (ConnectionPoolDataSource)ctx.lookup("");
			((Object) cpds).setDatabaseName("StartTest"); 
            ((Object) cpds).setUserIF("root");
            PooledConnection pc = cpds.getPooledConnection(); 
            Connection conn = pc.getConnection(); 
		} catch (NamingException e) {
			e.printStackTrace();
		}
		return conn;
	}
	
	public void closeConnection(){
		try {
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}
