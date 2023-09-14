package com.example.loanapp.model;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name="user_card_details")
public class UserCard {
	@Id
//	@GeneratedValue
	@Column(name="row_id")
	private String row_id;
	
//	@JsonBackReference
	@ManyToOne
	@JoinColumn(name="user_id")
	private User user;
	
//	@JsonBackReference
	@ManyToOne
	@JoinColumn(name="loan_id")
	private Loan loan;
	
	@JsonFormat(pattern= "yyyy-MM-dd")
	@Column(name="issue_date", nullable=false)
	private LocalDate issueDate;
	
	public String getRow_id() {
		return row_id;
	}


	public void setRow_id(String row_id) {
		this.row_id = row_id;
	}


	public User getUser() {
		return user;
	}


	public void setUser(User user) {
		this.user = user;
	}


	public Loan getLoan() {
		return loan;
	}


	public void setLoan(Loan loan) {
		this.loan = loan;
	}


	public LocalDate getIssueDate() {
		return issueDate;
	}


	public void setIssueDate(LocalDate issueDate) {
		this.issueDate = issueDate;
	}
}
