package com.example.loanapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.loanapp.model.Item;
import com.example.loanapp.model.UserIssue;
@Repository
public interface UserIssueRepository extends JpaRepository<UserIssue, Integer> {

	@Query("SELECT uid.issueId FROM UserIssue uid WHERE uid.user.id=?1")
	public List<Integer> findItemsIssueIdById(String emp_id);
	
	@Query("SELECT uid.item FROM UserIssue uid WHERE uid.user.id=?1")
	public List<Item> findItemsPurchasedById(String emp_id);
}
