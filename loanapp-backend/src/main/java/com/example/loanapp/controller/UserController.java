package com.example.loanapp.controller;

import java.util.List;
import java.util.Optional;

import com.example.loanapp.model.UserCard;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.loanapp.model.ApplyLoan;
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
	
	@GetMapping("/fetchUserDetails/{emp_id}")
	public Optional<User> fetchUserDetails(@PathVariable("emp_id") String emp_id) {
		return userService.fetchUser(emp_id);
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
	
	@GetMapping("/findUserDetailsById/{emp_id}")
	public List<User> findUserDetailsById(@PathVariable("emp_id") String emp_id){
		return userService.findUserDetailsById(emp_id);
	}
	
	@PostMapping("/applyLoan")
	public String applyLoan(@RequestBody ApplyLoan applyLoan) {
		return userService.applyLoan(applyLoan);
	}
}
