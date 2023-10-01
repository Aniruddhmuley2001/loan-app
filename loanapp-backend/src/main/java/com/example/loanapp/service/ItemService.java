package com.example.loanapp.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.loanapp.model.Item;
import com.example.loanapp.model.Loan;
import com.example.loanapp.model.User;
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
	
	public String updateItem(Item item) {
		String result="";
		Item obj = null;
		Optional<Item> optional = itemRepo.findById(item.getItemId());
		
		if(optional.isPresent()) {
			Item i = optional.get();
			i.setItemId(item.getItemId());
			i.setIssueStatus(item.isIssueStatus());
			i.setItemDescription(item.getItemDescription());
			i.setItemCategory(item.getItemCategory());
			i.setItemMake(item.getItemMake());
			i.setItemValue(item.getItemValue());
			
			obj = itemRepo.save(i);
			if(obj!=null)
				result="Item updated successfully!";
			else
				result="Item not updated!";
		}
		else {
			result = "Item Not found!";
		}
		
		return result;
	}
	
	public String deleteItem(int id) {
		String result="";
		User obj = null;
		Optional<Item> optional = itemRepo.findById(id);
		
		if(optional.isPresent()) {
			itemRepo.deleteById(id);
			result="Item deleted successfully!";
		}
		else {
			result = "Item Not found!";
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
//		List<String> itemCategories = itemRepo.findAll().stream().map(Item::getItemCategory).distinct().collect(Collectors.toList());
//		return itemCategories;
		
		return itemRepo.getDistinctCategory();
	}
	
	public List<String> getDistinctMakesByCategory(String category) 
	{
		return itemRepo.getDistinctMakesByCategory(category);
	}
	
	public List<String> getDistinctDescriptionByMakeAndCategory(String category, String make) 
	{
		return itemRepo.getDistinctDescriptionByMakeAndCategory(category, make);
	}
	
	public List<Item> getItemByMakeAndCategoryAndDescription(String category, String make, String description) 
	{
		
		List<Item> i=itemRepo.getItemByMakeAndCategoryAndDescription(category, make, description);
		System.out.println(i);
		return i;
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