package com.example.loanapp.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.loanapp.model.AdminLogin;
import com.example.loanapp.model.User;
import com.example.loanapp.repository.AdminRepository;

@Service
public class AdminService {

	@Autowired
	AdminRepository adminRepo;
	
	public String saveAdmin(AdminLogin u) {
		String result="";
		
		AdminLogin obj = null;
		Optional<AdminLogin>optional = adminRepo.findById(u.getId());
		
		if(optional.isPresent()) {
			result="User already exists.";
		}
		else {
			obj = adminRepo.save(u);
			if(obj!=null)
				result = "User saved successfuly.";
			else
				result = "Registration failed!";
		}
		
		return result;
	}
	
	public String loginAdmin(AdminLogin u) {
		String result="";
		AdminLogin admin = null;

		Optional<AdminLogin>optional = adminRepo.findById(u.getId());
		
		if(optional.isEmpty()) {
			result = "Invalid Employee";
		}
		else {
			admin = optional.get();
			if(admin.getPassword().equals(u.getPassword())) {
				result = "Login Success";
			}
			else {
				result = "Login Failed";
			}
		}
		
		return result;
	}
}
