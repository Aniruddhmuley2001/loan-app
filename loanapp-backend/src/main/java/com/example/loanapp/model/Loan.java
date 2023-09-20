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
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Loan {
	@Id
	@GeneratedValue
	@Column(name="loan_id")
	private int loanId;
	
	@Column(name="loan_type", length=40, nullable=false)
	private String loanType;
	
	@Column(name="loan_duration", nullable=false)
	private int loanDuration;
	
//	@JsonBackReference
//	@OnDelete(action=OnDeleteAction.CASCADE)
	@OneToMany(mappedBy="loan",fetch=FetchType.EAGER, cascade=CascadeType.ALL)
	private List<UserCard> userCard;
	
	public List<UserCard> getUserCard() {
		return userCard;
	}

	public void setUserCard(List<UserCard> userCard) {
		this.userCard = userCard;
	}

	public int getLoanDuration() {
		return loanDuration;
	}

	public void setLoanDuration(int loanDuration) {
		this.loanDuration = loanDuration;
	}

	
	public int getLoanId() {
		return loanId;
	}

	public void setLoanId(int loanId) {
		this.loanId = loanId;
	}

	public String getLoanType() {
		return loanType;
	}

	public void setLoanType(String loanType) {
		this.loanType = loanType;
	}

	

}
