package com.ebay;

import java.sql.*;

public class DBConnector {

	static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
	static final String DB_URL = "jdbc:mysql://localhost:3306/StartTest";
	static final String USER = "root";
	static final String PASSWORD = "root123";

	
	public Connection connect(){
		Connection conn = null;
		try {
			Class.forName("com.mysql.jdbc.Driver");
		    System.out.println("Connecting to Database");
		    conn = DriverManager.getConnection(DB_URL,USER,PASSWORD);	
		} catch (Exception e) {
			e.printStackTrace();
		}
		return conn;		
	}
}
