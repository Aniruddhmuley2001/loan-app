package com.example.loanapp.exception;

public class DesignationLengthExceededException extends Exception{

	private static final long serialVersionUID = 1L;

	public DesignationLengthExceededException(String message) {
	        super(message);
	    }
}
