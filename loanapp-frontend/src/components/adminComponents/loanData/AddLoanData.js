import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function AddLoanData() {
    const baseURL = "http://localhost:7000/saveLoan";
    const navigate = useNavigate();
    const adminId = sessionStorage.getItem("emp_id");
    const [loanId, setLoanId] = useState("")
    const [loanType, setLoanType] = useState("")
    const [loanDuration, setLoanDuration] = useState("")

    const loanIdChangeHandler = (event) => {
        setLoanId(event.target.value);
    }

    const loanTypeChangeHandler = (event) => {
        setLoanType(event.target.value);
    }

    const loanDurationChangeHandler = (event) => {
        setLoanDuration(event.target.value);
    }

    const submitActionHandler = (event) => {
        event.preventDefault();
        axios
          .post(baseURL, {
            loanId: loanId,
            loanType: loanType,
            loanDuration: loanDuration,
          })
          .then((response) => {
            alert("Loan "+ loanId +" added!");
            navigate("/admin/" + adminId + "/loans");
          }).catch(error => {
            alert("error==="+error);
          });
    
      };

    return (
        <>
        <form onSubmit={submitActionHandler}>
            <p>
            <label>Loan Id: <input type="text" value={loanId} onChange={loanIdChangeHandler}></input></label>
            </p>

            <p>
            <label>Loan Type: <input type="text" value={loanType} onChange={loanTypeChangeHandler}></input></label>
            </p>

            <p>
            <label>Loan Duration: <input type="number" value={loanDuration} onChange={loanDurationChangeHandler}></input></label>
            </p>

            <button type="submit">Register</button>
        </form>
        </>
    )
}
