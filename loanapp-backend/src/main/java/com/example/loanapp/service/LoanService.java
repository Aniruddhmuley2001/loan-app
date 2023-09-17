package com.example.loanapp.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import com.example.loanapp.model.UserCard;
import com.example.loanapp.model.ViewLoans;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.loanapp.model.Loan;
import com.example.loanapp.repository.LoanRepository;

@Service
public class LoanService {
	@Autowired
	LoanRepository loanRepo;
	
	
	public String saveLoan(Loan l) {
		String result="";
		
		Loan obj = null;
		Optional<Loan>optional = loanRepo.findById(l.getLoanId());
		
		if(optional.isPresent()) {
			result="Loan already exists.";
		}
		else {
			obj = loanRepo.save(l);
			if(obj!=null)
				result = "Loan saved successfuly.";
			else
				result = "Registration failed!";
		}
		
		return result;
	}
	
	public List<Loan> getAllLoans(){
		return loanRepo.findAll();
	}
	
	public List<String> getLoanBytype(){
		List<String> loanType = loanRepo.findAll().stream().map(Loan::getLoanType).distinct().collect(Collectors.toList());
		return loanType;
	}
	
	public Loan getLoanById(int lNo){
		return loanRepo.findById(lNo).get();
	}

	public List<Map<LocalDate,Object>> getLoansByEmpId(String empId)
	{
		List<Map<LocalDate,Object>> allLoans =loanRepo.getLoansByEmpId(empId);
		return allLoans;
	}
}
