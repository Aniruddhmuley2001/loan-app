package com.example.loanapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.loanapp.model.UserIssue;

public interface UserIssueRepository extends JpaRepository<UserIssue, Integer> {

}
