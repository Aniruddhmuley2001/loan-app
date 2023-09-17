package com.example.loanapp.service;

import com.example.loanapp.model.Loan;

import com.example.loanapp.model.ViewLoans;
import com.example.loanapp.repository.UserCardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
@Service
public class UserCardService {
    @Autowired
    UserCardRepository userCardRepo;
    public List<ViewLoans> findLoansPurchasedById(String emp_id){

        List<LocalDate> issueDates = userCardRepo.findIssueDateById(emp_id);
        List<Loan> loans = userCardRepo.findLoanByEmpId(emp_id);
        List<ViewLoans> view_loans = new ArrayList<ViewLoans>();
        for(int i=0;i<loans.size();i++) {
            view_loans.add(new ViewLoans(issueDates.get(i),loans.get(i)));
        }

        return view_loans;

    }
}
