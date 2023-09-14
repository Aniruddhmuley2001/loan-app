package com.example.loanapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.loanapp.model.Loan;

@Repository
public interface LoanRepository extends JpaRepository<Loan, Integer> {
	
	@Query("SELECT l.loanId FROM Loan l WHERE l.loanType=?1")
	public int findByLoanType(String itemCategory);
	
}