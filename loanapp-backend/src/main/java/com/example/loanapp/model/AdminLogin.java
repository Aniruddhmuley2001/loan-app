package com.example.loanapp.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name="admin_info")
public class AdminLogin {
	@Id
	@NotBlank(message = "ID cannot be blank")
	private String id;
	
	@NotBlank(message = "Password cannot be blank")
	private String password;
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
	
	
}
