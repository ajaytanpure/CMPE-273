package com.ebay;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Register {

	public void registerUser(String email, String firstName, String lastName, String mobile,String password){
		DBConnector connector = new DBConnector();
		Connection connection = connector.connect();
		PreparedStatement stmt = null;
		ResultSet rs = null;
		try {
			String query = "INSERT INTO users(email, firstName, lastName, mobile, password) VALUES (?, ?, ?, ?, ?)";
			stmt = connection.prepareStatement(query);
			stmt.setString(1, email);
			stmt.setString(2, firstName);
			stmt.setString(3, lastName);
			stmt.setString(4, mobile);
			stmt.setString(5, password);
			stmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}		
	}
}
