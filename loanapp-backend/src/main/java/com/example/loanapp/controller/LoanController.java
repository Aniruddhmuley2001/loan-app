package com.example.loanapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.loanapp.model.Loan;
import com.example.loanapp.service.LoanService;

@RestController
@CrossOrigin("http://localhost:3000")
public class LoanController {

	@Autowired
	LoanService loanService;
	
	
	@PostMapping("/saveLoan")
	public String loanType(@RequestBody Loan l) {
		
		String result = "";
		result = loanService.saveLoan(l);
		
		return result;
		
	}
	
	@GetMapping("/getAllLoans")
	public List<Loan> getAllLoans() {
		return loanService.getAllLoans();
	}

	@GetMapping("/allLoanTypes")
	public List<String> getAllTypes() {
		return loanService.getLoanBytype();
	}
	
	@GetMapping("/loanById/{loanno}")
	public Loan getLoanById(@PathVariable("loanno")  int lno)
	{
		return loanService.getLoanById(lno);
	}
	
}
