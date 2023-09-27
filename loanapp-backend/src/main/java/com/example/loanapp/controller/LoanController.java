package com.example.loanapp.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.loanapp.model.Loan;
import com.example.loanapp.service.LoanService;

@RestController
@CrossOrigin("http://localhost:3000")
public class LoanController {

	@Autowired
	LoanService loanService;
	
	
	@PostMapping(value="/saveLoan", consumes={"application/json"})
	public String loanType(@Valid @RequestBody Loan l) {
		
		String result = "";
		result = loanService.saveLoan(l);
		
		return result;
		
	}
	
	@GetMapping("/fetchLoans")
	public List<Loan> getAllLoans() {
		return loanService.getAllLoans();
	}

	@GetMapping("/allLoanTypes")
	public List<String> getAllTypes() {
		return loanService.getLoanBytype();
	}
	
	@PutMapping(value="/updateLoan", consumes={"application/json"})
	public String updateLoan(@Valid @RequestBody Loan l) {
		String result = "";
		result = loanService.updateLoan(l);
		
		return result;
	}
	
	@DeleteMapping("/deleteLoan/{loan_id}")
	public String deleteLoan(@PathVariable("loan_id") int loan_id) {
		String result = "";
		result = loanService.deleteLoan(loan_id);
		
		return result;
	}
	
	@GetMapping("/fetchLoanDetails/{loanno}")
	public Loan getLoanById(@PathVariable("loanno")  int lno)
	{
		return loanService.getLoanById(lno);
	}

	@GetMapping("/viewLoans/{emp_id}")
	public List<Map<LocalDate,Object>> getAllItemsByEmpId(@PathVariable("emp_id") String emp_id)
	{
		return loanService.getLoansByEmpId(emp_id);
	}
	
}
