package com.example.loanapp.repository;

import com.example.loanapp.model.Loan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.loanapp.model.UserCard;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface UserCardRepository extends JpaRepository<UserCard, String>{
    @Query("SELECT uc.loan FROM UserCard uc WHERE uc.user.id=?1")
    public List<Loan> findLoanByEmpId(String empId);

    @Query("SELECT uc.issueDate FROM UserCard uc WHERE uc.user.id=?1")
    public List<LocalDate> findIssueDateById(String empId);
}
