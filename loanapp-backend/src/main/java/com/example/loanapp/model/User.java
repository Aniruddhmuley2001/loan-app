package com.example.loanapp.model;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="user_info")
public class User {
	@Id
	@Column(name="user_id")
	private String id;
	
	@Column(length=10, nullable=false)
	private String password;
	
	@Column(name="full_name",length=40, nullable=false)
	private String name;
	
	@JsonFormat(pattern="yyyy-MM-dd")
	@Column(nullable=false)
	private LocalDate dob;
	
	@Column(length=30, nullable=false)
	private String designation;
	
	@Column(length=20, nullable=false)
	private String department;
	
	@Column(nullable=false)
	private String gender;
	
	@JsonFormat(pattern="yyyy-MM-dd")
	@Column(nullable=false)
	private LocalDate doj;
	
	@OneToMany(mappedBy="user",fetch=FetchType.EAGER, cascade=CascadeType.ALL)
	@JsonIgnore
//	@JsonBackReference
	private List<UserCard> userCard;
	
	@OneToMany(mappedBy="user",fetch=FetchType.EAGER, cascade=CascadeType.ALL)
//	@JsonBackReference
	@JsonIgnore
	private Set<UserIssue> userIssue;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public LocalDate getDob() {
		return dob;
	}
	public void setDob(LocalDate dob) {
		this.dob = dob;
	}
	public List<UserCard> getUserCard() {
		return userCard;
	}
	public void setUserCard(List<UserCard> userCard) {
		this.userCard = userCard;
	}
	public Set<UserIssue> getUserIssue() {
		return userIssue;
	}
	public void setUserIssue(Set<UserIssue> userIssue) {
		this.userIssue = userIssue;
	}
	
	public String getDesignation() {
		return designation;
	}
	public void setDesignation(String designation) {
		this.designation = designation;
	}
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public LocalDate getDoj() {
		return doj;
	}
	public void setDoj(LocalDate doj) {
		this.doj = doj;
	}
	
	
	
	
}
