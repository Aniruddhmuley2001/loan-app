package com.example.loanapp.model;

public class ViewItem {
	private int issueId;
	
	private Item item;
	
	public ViewItem(int issueId, Item item) {
		// TODO Auto-generated constructor stub
		this.issueId = issueId;
		this.item = item;
	}

	public int getIssueId() {
		return issueId;
	}

	public void setIssueId(int issueId) {
		this.issueId = issueId;
	}

	public Item getItem() {
		return item;
	}

	public void setItem(Item item) {
		this.item = item;
	}
}
