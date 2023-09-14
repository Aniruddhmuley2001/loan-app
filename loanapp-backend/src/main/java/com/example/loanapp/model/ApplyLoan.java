package com.example.loanapp.model;

public class ApplyLoan {
	private String id;
	private String itemCategory;
	private String itemDescription;
	private String itemMake;
	private int itemValue;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getItemCategory() {
		return itemCategory;
	}
	public void setItemCategory(String itemCategory) {
		this.itemCategory = itemCategory;
	}
	public String getItemDescription() {
		return itemDescription;
	}
	public void setItemDescription(String itemDescription) {
		this.itemDescription = itemDescription;
	}
	public String getItemMake() {
		return itemMake;
	}
	public void setItemMake(String itemMake) {
		this.itemMake = itemMake;
	}
	public int getItemValue() {
		return itemValue;
	}
	public void setItemValue(int itemValue) {
		this.itemValue = itemValue;
	}
}
