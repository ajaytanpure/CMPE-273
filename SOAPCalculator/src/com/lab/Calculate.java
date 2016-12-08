package com.lab;

public class Calculate {

	public String calculate(String op1, String operator, String op2) {

		float operand1 = Float.parseFloat(op1);
		float operand2 = Float.parseFloat(op2);
		float result = 0;
		String returnResult;

		if (operator.equals("+")) {
			result = operand1 + operand2;
		} else if (operator.equals("-")) {
			result = operand1 - operand2;
		} else if (operator.equals("*")) {
			result = operand1 * operand2;
		} else if (operator.equals("/")) {
			try {
				result = operand1 / operand2;
			} catch (Exception e) {
				e.printStackTrace(System.out);
				returnResult = "Error";
				return returnResult;
			}
		}
		return Float.toString(result);
	}
}