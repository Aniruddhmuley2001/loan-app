package com.example.loanapp.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.loanapp.model.Item;
import com.example.loanapp.model.Loan;
import com.example.loanapp.service.ItemService;

@RestController
@CrossOrigin("http://localhost:3000")
class ItemController {
	
	@Autowired
	ItemService itemService;
	
	
	@PostMapping("/saveItem")
	public String itemType(@RequestBody Item i) {
		
		String result = "";
		result = itemService.saveItem(i);
		
		return result;
		
	}

	@GetMapping("/fetchItems")
	public List<Item> getAllItems() {
		return itemService.getAllItems();
	}
	
	@PutMapping("/updateItem")
	public String updateLoan(@RequestBody Item i) {
		String result = "";
		result = itemService.updateItem(i);
		
		return result;
	}
	
	@DeleteMapping("/deleteItem/{item_id}")
	public String deleteItem(@PathVariable("item_id") int item_id) {
		String result = "";
		result = itemService.deleteItem(item_id);
		
		return result;
	}
	
	@GetMapping("/fetchItemDetails/{itemno}")
	public Item getItemById(@PathVariable("itemno")  int ino)
	{
		return itemService.getItemById(ino);
	}
	
	@GetMapping("/allItemCategories")
	public List<String> getAllTypes() {
		return itemService.getItemBytype();
	}
	
	// Get List of Item Make as per Item Category selected
	@GetMapping("/{category}/getAllMake") 
	public List<String> getDistinctMakesByCategory(@PathVariable String category) 
	{
		return itemService.getDistinctMakesByCategory(category);
	}
	
	// Get Item Descriptions as per Item Category and Item Make
	@GetMapping("/{category}/{make}/getAllDescriptions")
	public List<String> getDistinctDescriptionByMakeAndCategory(@PathVariable String category, @PathVariable String make)
	{
		return itemService.getDistinctDescriptionByMakeAndCategory(category, make);
	}
	
	// Get Item by Category, Make and Description
	@GetMapping("/{category}/{make}/{description}/getItem")
	public String getItemByMakeAndCategoryAndDescription(@PathVariable String category, @PathVariable String make, @PathVariable String description) 	
	{
		Integer item = itemService.getItemByMakeAndCategoryAndDescription(category, make, description);
		System.out.println(item);
		return item.toString();
	}
	
	@GetMapping("/allItemMakes")
	public List<String> getAllMakes() {
		return itemService.getItemByMake();
	}
	
	@GetMapping("/viewItems/{emp_id}")
	public List<Map<String,Object>> getAllItemsByEmpId(@PathVariable("emp_id") String emp_id)
	{
		return itemService.getAllItemsByEmpId(emp_id);
	}
	
}