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
import com.example.loanapp.model.Loan;
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
class LoanControllerTest {
	
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
	public void testSaveLoan() throws Exception {
		Loan loan = new Loan();
		loan.setLoanId(1);
		loan.setLoanDuration(2);
		loan.setLoanType("auto");
		Mockito.when(loanService.saveLoan(ArgumentMatchers.any())).
		thenReturn("Loan saved successfuly.");
		String json = mapper.writeValueAsString(loan);
		mvc.perform(post("/saveLoan").
				contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8")
				.content(json).accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk());

	}
	
	@Test
	public void testFindItems() throws Exception {
		Loan loan = new Loan();
		loan.setLoanId(1);
		loan.setLoanDuration(2);
		loan.setLoanType("auto");
		
		List<Loan> allLoan = new ArrayList<>();
		allLoan.add(loan);
		
		Mockito.when(loanService.getAllLoans()).
		thenReturn(allLoan);
		mvc.perform(get("/fetchLoans").
				contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
				.andExpect(jsonPath("$", Matchers.hasSize(1)))
				.andExpect(jsonPath("$[0].loanId", Matchers.equalTo(loan.getLoanId())));

	}
	
	@Test
    public void testDeleteItem() throws Exception {
		Loan loan = new Loan();
		loan.setLoanId(1);
		loan.setLoanDuration(2);
		loan.setLoanType("auto");
		Mockito.when(loanService.getLoanById(ArgumentMatchers.anyInt())).thenReturn(loan);
        loanService.deleteLoan(ArgumentMatchers.anyInt());
        mvc.perform(delete("/deleteLoan/{loan_id}",1))
        		.andExpect(status().isOk()).andReturn();
//        String result = requestResult.getResponse().getContentAsString();
//        assertEquals(result, "Item deleted successfully!");
    }
	
	@Test
    public void testUpdateItem() throws Exception {
		Loan loan = new Loan();
		loan.setLoanId(1);
		loan.setLoanDuration(2);
		loan.setLoanType("auto");
		Mockito.when(loanService.getLoanById(ArgumentMatchers.anyInt())).thenReturn(loan);
//		Mockito.when(itemService.updateItem(item)).thenReturn("Item updated successfully!");
		String json = mapper.writeValueAsString(loan);
		mvc.perform(put("/updateLoan").contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8")
				.content(json).accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
    }
	
}
