package com.example.loanapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.loanapp.model.AdminLogin;
import com.example.loanapp.service.AdminService;

@RestController
@CrossOrigin("http://localhost:3000")
public class AdminController {

	@Autowired
	AdminService adminService;
	
	@PostMapping("/saveAdmin")
	public String saveAdmin(@RequestBody AdminLogin u) {
		String result = "";
		result = adminService.saveAdmin(u);
		
		return result;
	}
	
	@PostMapping("/loginAdmin")
	public String loginAdmin(@RequestBody AdminLogin u) {
		String result = "";
		result = adminService.loginAdmin(u);
		
		return result;
	}
}
