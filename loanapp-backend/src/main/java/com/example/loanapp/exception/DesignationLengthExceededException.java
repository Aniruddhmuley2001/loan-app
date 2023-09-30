package com.example.loanapp.exception;

public class DesignationLengthExceededException extends RuntimeException{

	private static final long serialVersionUID = 1L;

	public DesignationLengthExceededException(String message) {
	        super(message);
	    }
}
