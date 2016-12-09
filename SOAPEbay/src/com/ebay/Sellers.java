package com.ebay;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class Sellers {

	public ArrayList<String> loadCategory() {
		DBConnector connector = new DBConnector();
		Connection connection = connector.connect();
		PreparedStatement stmt = null;
		ResultSet rs = null;
		ArrayList<String> cats = new ArrayList<>();
		try {
			String query = "SELECT * FROM category";
			stmt = connection.prepareStatement(query);
			rs = stmt.executeQuery();
			while (rs.next()) {
				cats.add(rs.getString("cat_name"));
			}
			System.out.println(cats.get(2));
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return cats;
	}

	public void insertProduct(String title, String desc, String price, String bid, String sold) {
		DBConnector connector = new DBConnector();
		Connection connection = connector.connect();
		PreparedStatement stmt = null;
		ResultSet rs = null;

		try {
			String query = "INSERT INTO products values(?, ?, ?, ?, ?)";
			stmt = connection.prepareStatement(query);
			stmt.setString(1, title);
			stmt.setString(2, desc);
			stmt.setString(3, price);
			stmt.setString(4, bid);
			stmt.setString(5, sold);
			stmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}
