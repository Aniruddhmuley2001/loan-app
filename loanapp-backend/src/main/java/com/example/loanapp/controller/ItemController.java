package com.example.loanapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.loanapp.model.Item;
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

	@GetMapping("/allItems")
	public List<Item> getAllItems() {
		return itemService.getAllItems();
	}
	
	@GetMapping("/itemById/{itemno}")
	public Item getItemById(@PathVariable("itemno")  int ino)
	{
		return itemService.getItemById(ino);
	}
	
	@GetMapping("/allItemCategories")
	public List<String> getAllTypes() {
		return itemService.getItemBytype();
	}
	
}