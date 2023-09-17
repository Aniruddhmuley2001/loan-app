package com.example.loanapp.controller;


import com.example.loanapp.model.ViewLoans;

import com.example.loanapp.service.UserCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserCardController {
    @Autowired
    UserCardService userCardService;

    @GetMapping("/fetchLoansById/{employee}")
    public List<ViewLoans> fetchLoansById(@PathVariable("employee") String employee){
        return userCardService.findLoansPurchasedById(employee);
    }
}
