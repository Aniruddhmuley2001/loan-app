package com.example.loanapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.loanapp.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
	
	@Query("SELECT distinct u FROM User u inner JOIN u.userCard c WHERE u.id=?1")
	public List<User> findAllCards(String emp_id);
	
	@Query("SELECT distinct u FROM User u")
	public List<User> fetchAllUsers();
	
}
