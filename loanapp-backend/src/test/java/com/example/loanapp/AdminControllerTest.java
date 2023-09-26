package com.example.loanapp;

import static org.junit.Assert.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.example.loanapp.model.AdminLogin;
import com.example.loanapp.repository.AdminRepository;
import com.example.loanapp.repository.ItemRepository;
import com.example.loanapp.repository.LoanRepository;
import com.example.loanapp.repository.UserCardRepository;
import com.example.loanapp.repository.UserIssueRepository;
import com.example.loanapp.repository.UserRepository;
import com.example.loanapp.service.AdminService;
import com.example.loanapp.service.IssueService;
import com.example.loanapp.service.ItemService;
import com.example.loanapp.service.LoanService;
import com.example.loanapp.service.UserCardService;
import com.example.loanapp.service.UserService;


@RunWith(SpringRunner.class)
@WebMvcTest
class AdminControllerTest {
	
	@Autowired
	private MockMvc mvc; 
	
	@MockBean
	private UserService userService;
	
	@MockBean
	private UserCardService userCardService;
	
	@MockBean
	private ItemService itemService;
	
	@MockBean
	private IssueService issueService;
	
	@MockBean
	private LoanService loanService;
	
	@MockBean
	private AdminService adminService;
	
	@MockBean
	private UserRepository userRepository;
	
	@MockBean
	private LoanRepository loanRepository;
	
	@MockBean
	private ItemRepository itemRepository;
	
	@MockBean
	private UserCardRepository userCardRepository;
	
	@MockBean
	private UserIssueRepository userIssueRepository;
	
	@MockBean
	private AdminRepository adminRepository;
	
	private static ObjectMapper mapper = new ObjectMapper();
	

	@Test
	public void testSaveAdmin() throws Exception {
		AdminLogin admin = new AdminLogin();
		admin.setId("admin");
		admin.setPassword("1234");
		Mockito.when(adminService.saveAdmin(ArgumentMatchers.any())).
		thenReturn("User saved successfuly.");
		String json = mapper.writeValueAsString(admin);
		mvc.perform(post("/saveAdmin").
				contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8")
				.content(json).accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk());

	}
	
	@Test
	public void testLoginAdmin() throws Exception {
		AdminLogin admin = new AdminLogin();
		admin.setId("admin");
		admin.setPassword("1234");
		Mockito.when(adminService.saveAdmin(ArgumentMatchers.any())).
		thenReturn("User saved successfuly.");
		String json = mapper.writeValueAsString(admin);
		mvc.perform(post("/loginAdmin").
				contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8")
				.content(json).accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk());

	}
	
}