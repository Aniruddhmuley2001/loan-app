package com.example.loanapp.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.loanapp.model.Item;
import com.example.loanapp.model.ViewItem;
import com.example.loanapp.repository.UserIssueRepository;

@Service
public class IssueService {
	@Autowired
	UserIssueRepository issueRepo;
	
	public List<ViewItem> findItemsPurchasedById(String emp_id){
		
		List<Integer> issueIds = issueRepo.findItemsIssueIdById(emp_id);
		List<Item> items = issueRepo.findItemsPurchasedById(emp_id);
		List<ViewItem> items_purchased = new ArrayList<ViewItem>();
		for(int i=0;i<items.size();i++) {
			items_purchased.add(new ViewItem(issueIds.get(i),items.get(i)));
		}
		
		return items_purchased;
		
	}
}
