package com.example.loanapp.service;

import java.util.List;
import java.util.Map;
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
	
	public List<String> getDistinctMakesByCategory(String category) 
	{
		return itemRepo.getDistinctMakesByCategory(category);
	}
	
	public List<String> getDistinctDescriptionByMakeAndCategory(String category, String make) 
	{
		return itemRepo.getDistinctDescriptionByMakeAndCategory(category, make);
	}
	
	public Item getItemByMakeAndCategoryAndDescription(String category, String make, String description) 
	{
		return itemRepo.getItemByMakeAndCategoryAndDescription(category, make, description);
	}
	
	public List<String> getItemByMake(){
		List<String> itemMake = itemRepo.findAll().stream().map(Item::getItemMake).distinct().collect(Collectors.toList());
		return itemMake;
	}
	
	public List<Map<String,Object>> getAllItemsByEmpId(String emp_id)
	{
		List<Map<String,Object>> allItems=itemRepo.getAllItemsByEmpId(emp_id);
		return allItems;
	}
}