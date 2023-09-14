package com.example.loanapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.loanapp.model.UserCard;

@Repository
public interface UserCardRepository extends JpaRepository<UserCard, String>{

}
