package com.example.loanapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.loanapp.model.User;
import com.example.loanapp.model.UserLogin;
import com.example.loanapp.service.UserService;

@RestController
@CrossOrigin("http://localhost:3000")
class UserController {
	
	@Autowired
	UserService userService;
	
	
	@GetMapping("/showMessage")
	public String showMessage() {
		return "Welcome!";
	}
	
	@PostMapping("/saveUser")
	public String saveUser(@RequestBody User u) {
		String result = "";
		result = userService.saveUser(u);
		
		return result;
	}
	
	@PostMapping("/loginUser")
	public String loginUser(@RequestBody UserLogin u) {
		String result = "";
		result = userService.loginUser(u);
		
		return result;
	}
}
