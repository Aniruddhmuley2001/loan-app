package com.example.loanapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.loanapp.model.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item, Integer> {
	
	@Query("SELECT item FROM Item item WHERE item.itemCategory=?1 AND item.itemMake=?2")
	public Item findByMakeCategory(String itemCategory, String itemMake);
}