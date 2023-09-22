package com.example.loanapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.loanapp.model.AdminLogin;
import com.example.loanapp.model.User;

@Repository
public interface AdminRepository extends JpaRepository<AdminLogin, String> {

}
