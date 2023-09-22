package com.example.loanapp;

import static org.junit.Assert.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDate;
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
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.example.loanapp.model.User;
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
class UserControllerTest {
	
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
	
//	private static ObjectMapper mapper = new ObjectMapper();
	
	ObjectMapper mapper = JsonMapper.builder()
		    .addModule(new JavaTimeModule())
		    .build();
	
//	@Test
//	public void testGetEmployees() throws Exception {
//		User user = new User();
//		user.setId("1");
//		user.setName("testing");
//		user.setPassword("test@123");
////		user.setDob();
//		user.setDepartment("abc");
//		user.setDesignation("test1");;
//
//		List<User> allUsers = new ArrayList<>();
//		allUsers.add(user);
//
//		Mockito.when(userService.fetchUser("1")).thenReturn((Optional<User>)user);
//
//		System.out.println("test method");
//		mvc.perform(get("/api/v1/getAllEmployees").
//				contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
//				.andExpect(jsonPath("$", Matchers.hasSize(1)))
//				.andExpect(jsonPath("$[0].firstName", Matchers.equalTo(user.getFirstName())));
//	}
	
	@Test
	public void testSaveUser() throws Exception {
		User user = new User();
		LocalDate dob = LocalDate.parse("2010-11-01");
		LocalDate doj = LocalDate.parse("2018-11-01");
		user.setId("1");
		user.setName("testing");
		user.setPassword("test@123");
		user.setDob(dob);
		user.setDepartment("abc");
		user.setDesignation("test1");
		user.setGender("male");
		user.setDoj(doj);
		Mockito.when(userService.saveUser(ArgumentMatchers.any())).
		thenReturn("User saved successfuly.");
		String json = mapper.writeValueAsString(user);
		mvc.perform(post("/saveUser").
				contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8")
				.content(json).accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk());

	}
	
	@Test
	public void testFindUserCard() throws Exception {
		User user = new User();
		LocalDate dob = LocalDate.parse("2010-11-01");
		LocalDate doj = LocalDate.parse("2018-11-01");
		user.setId("1");
		user.setName("testing");
		user.setPassword("test@123");
		user.setDob(dob);
		user.setDepartment("abc");
		user.setDesignation("test1");
		user.setGender("male");
		user.setDoj(doj);
		
		List<User> allUser = new ArrayList<>();
		allUser.add(user);
		
		Mockito.when(userService.findUserDetailsById("1")).
		thenReturn(allUser);
		mvc.perform(get("/findUserDetailsById/{id}",1).
				contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
				.andExpect(jsonPath("$", Matchers.hasSize(1)))
				.andExpect(jsonPath("$[0].name", Matchers.equalTo(user.getName())));

	}
	
	@Test
	public void testMessage() throws Exception {
		mvc.perform(get("/showMessage").
				contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8")
				.content("Welcome").accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk());

	}
	
}
