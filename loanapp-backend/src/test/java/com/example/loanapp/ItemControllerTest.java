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
import com.example.loanapp.model.Item;
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
class ItemControllerTest {
	
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
	public void testSaveItem() throws Exception {
		Item item = new Item();
		item.setItemId(1);
		item.setIssueStatus("No");
		item.setItemCategory("Auto");
		item.setItemMake("Electric");
		item.setItemDescription("Tesla");
		item.setItemValue(10000);
		Mockito.when(itemService.saveItem(ArgumentMatchers.any())).
		thenReturn("Item saved successfuly.");
		String json = mapper.writeValueAsString(item);
		mvc.perform(post("/saveItem").
				contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8")
				.content(json).accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk());

	}
	
	@Test
	public void testFindItems() throws Exception {
		Item item = new Item();
		item.setItemId(1);
		item.setIssueStatus("No");
		item.setItemCategory("Auto");
		item.setItemMake("Electric");
		item.setItemDescription("Tesla");
		item.setItemValue(10000);
		
		List<Item> allItem = new ArrayList<>();
		allItem.add(item);
		
		Mockito.when(itemService.getAllItems()).
		thenReturn(allItem);
		mvc.perform(get("/fetchItems").
				contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
				.andExpect(jsonPath("$", Matchers.hasSize(1)))
				.andExpect(jsonPath("$[0].itemId", Matchers.equalTo(item.getItemId())));

	}
	
	@Test
    public void testDeleteItem() throws Exception {
		Item item = new Item();
		item.setItemId(1);
		item.setIssueStatus("No");
		item.setItemCategory("Auto");
		item.setItemMake("Electric");
		item.setItemDescription("Tesla");
		item.setItemValue(10000);
		Mockito.when(itemService.getItemById(ArgumentMatchers.anyInt())).thenReturn(item);
        itemService.deleteItem(ArgumentMatchers.anyInt());
        mvc.perform(delete("/deleteItem/{item_id}",1))
        		.andExpect(status().isOk()).andReturn();
//        String result = requestResult.getResponse().getContentAsString();
//        assertEquals(result, "Item deleted successfully!");
    }
	
	@Test
    public void testUpdateItem() throws Exception {
		Item item = new Item();
		item.setItemId(1);
		item.setIssueStatus("No");
		item.setItemCategory("Auto");
		item.setItemMake("Electric");
		item.setItemDescription("Tesla");
		item.setItemValue(10000);
		Mockito.when(itemService.getItemById(ArgumentMatchers.anyInt())).thenReturn(item);
//		Mockito.when(itemService.updateItem(item)).thenReturn("Item updated successfully!");
		String json = mapper.writeValueAsString(item);
		mvc.perform(put("/updateItem").contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8")
				.content(json).accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
    }
	
}
