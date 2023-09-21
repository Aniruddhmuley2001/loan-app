package com.example.loanapp.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;


import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class Item {
	
	@Id
	@GeneratedValue
	@Column(name="item_id")
	private int itemId;
	
	@Column(name="issue_status")
	private boolean issueStatus;
	
	@Column(name="item_description", length=50, nullable=false)
	private String itemDescription;
	
	//Same as loan type
	@Column(name="item_category",length=30, nullable=false)
	private String itemCategory;
	
	@Column(name="item_make", length=30, nullable=false)
	private String itemMake;
	
	@Column(name="item_value", nullable=false)
	private int itemValue;
	
	@JsonBackReference
	@OneToMany(mappedBy="item",fetch=FetchType.EAGER, cascade=CascadeType.ALL)
	@OnDelete(action=OnDeleteAction.CASCADE)
	private List<UserIssue> userIssue;

	public int getItemId() {
		return itemId;
	}

	public void setItemId(int itemId) {
		this.itemId = itemId;
	}

	public boolean isIssueStatus() {
		return issueStatus;
	}

	public void setIssueStatus(boolean issueStatus) {
		this.issueStatus = issueStatus;
	}

	public String getItemDescription() {
		return itemDescription;
	}

	public void setItemDescription(String itemDescription) {
		this.itemDescription = itemDescription;
	}

	public String getItemCategory() {
		return itemCategory;
	}

	public void setItemCategory(String itemCategory) {
		this.itemCategory = itemCategory;
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

	public List<UserIssue> getUserIssue() {
		return userIssue;
	}

	public void setUserIssue(List<UserIssue> userIssue) {
		this.userIssue = userIssue;
	}

}
