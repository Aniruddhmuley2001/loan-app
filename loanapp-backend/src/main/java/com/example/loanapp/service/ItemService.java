package com.example.loanapp.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.loanapp.model.Item;
import com.example.loanapp.model.Loan;
import com.example.loanapp.repository.ItemRepository;

@Service
public class ItemService {
	
	@Autowired
	ItemRepository itemRepo;
	
	
	public String saveItem(Item i) {
		String result="";
		
		Item obj = null;
		Optional<Item>optional = itemRepo.findById(i.getItemId());
		
		if(optional.isPresent()) {
			result="Item already exists.";
		}
		else {
			obj = itemRepo.save(i);
			if(obj!=null)
				result = "Item saved successfuly.";
			else
				result = "Registration failed!";
		}
		
		return result;
	}
	
	public List<Item> getAllItems(){
		return itemRepo.findAll();
	}
	
	public Item getItemById(int iNo){
		return itemRepo.findById(iNo).get();
	}
	
	public List<String> getItemBytype(){
		List<String> loanType = itemRepo.findAll().stream().map(Item::getItemCategory).distinct().collect(Collectors.toList());
		return loanType;
	}
}