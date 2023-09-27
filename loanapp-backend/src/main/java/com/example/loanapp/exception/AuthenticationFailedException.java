package com.example.loanapp.exception;

public class AuthenticationFailedException extends Exception {
	private static final long serialVersionUID = 1L;

	public AuthenticationFailedException(String message) {
		super(message);
	}
}
