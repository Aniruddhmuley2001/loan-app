package com.example.loanapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.loanapp.model.Loan;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Repository
public interface LoanRepository extends JpaRepository<Loan, Integer> {

	@Query("SELECT l.loanId FROM Loan l WHERE l.loanType=?1")
	public int findByLoanType(String itemCategory);

	@Query("SELECT uc.issueDate, l.loanId, l.loanType, l.loanDuration FROM Loan l INNER JOIN UserCard uc ON l.loanId = uc.loan.loanId WHERE uc.id=?1")
	public List<Map<LocalDate,Object>> getLoansByEmpId(String empId);


	
}