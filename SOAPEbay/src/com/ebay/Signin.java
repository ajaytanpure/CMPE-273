package com.ebay;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class Signin {

	public boolean signInUser(String email, String password) {
		DBConnector connector = new DBConnector();
		Connection connection = connector.connect();
		PreparedStatement stmt = null;
		ResultSet rs = null;
		try {
			String query = "SELECT email, password from users WHERE email = ?";
			stmt = connection.prepareStatement(query);
			stmt.setString(1, email);
			rs = stmt.executeQuery();
			String userPassword = "";
			while (rs.next()) {
				userPassword = rs.getString("password");
			}
			if (password.equals(userPassword)) {
				return true;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return false;
	}

	public void updateLastLogin(String email) {
		DBConnector connector = new DBConnector();
		Connection connection = connector.connect();
		PreparedStatement stmt = null;
		ResultSet rs = null;
		try {
			String query = "UPDATE users SET lastLogin = NOW() WHERE email = ?";
			stmt = connection.prepareStatement(query);
			stmt.setString(1, email);
			stmt.executeUpdate();
			System.out.println("Updated time successfully");
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}
