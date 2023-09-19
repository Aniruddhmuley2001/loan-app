package com.example.loanapp.repository;

import java.util.List;

import com.example.loanapp.model.UserCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.loanapp.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
	
	@Query("SELECT distinct u FROM User u WHERE u.id=?1")
	public List<User> findUserDetailsById(String emp_id);
	
}
