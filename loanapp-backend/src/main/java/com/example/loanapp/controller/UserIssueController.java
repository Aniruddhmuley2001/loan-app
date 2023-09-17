package com.example.loanapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.loanapp.model.ViewItem;
import com.example.loanapp.service.IssueService;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserIssueController {
	@Autowired
	IssueService issueService;
	
	@GetMapping("/fetchItemsById/{employee}")
	public List<ViewItem> fetchItemsById(@PathVariable("employee") String employee){
		return issueService.findItemsPurchasedById(employee);
	}
}
