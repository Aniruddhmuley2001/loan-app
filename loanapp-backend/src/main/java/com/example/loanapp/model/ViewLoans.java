package com.example.loanapp.model;

import java.time.LocalDate;

public class ViewLoans {
    private LocalDate issueDate;
    private Loan loans;

    public ViewLoans(LocalDate issueDate, Loan loans) {
        this.issueDate=issueDate;
        this.loans = loans;
    }

    public Loan getLoans() {
        return loans;
    }

    public void setLoans(Loan loans) {
        this.loans = loans;
    }

    public LocalDate getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(LocalDate issueDate) {
        this.issueDate = issueDate;
    }
}
