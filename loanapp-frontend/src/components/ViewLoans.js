import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";

export default function ViewLoans() {
    const baseURL = "http://localhost:7000/getAllLoans";
    const [loans, setLoanDetails] = useState([]);
  
    const setLoanData = () => {
      axios.get(baseURL ).then((response) => {
        setLoanDetails(response.data);
      }).catch(error => {
        alert("Error Ocurred while loading data:" + error);
      });
    }
  
    useEffect(() => {
      setLoanData();
    }, []);
  
    return (
      <div class="card-body">
        <br>
        </br>
  
  
        <br></br>
        <div className="col-md-6">
          <h4>Loans List</h4>
  
          <div class="container">
            <div class="row">
              <div class="col-12">
                <table class="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>Loan ID</th>
                      <th>Loan Type</th>
                      <th>Loan Duration (in months)</th>
                      {/* <th scope="col">Action</th> */}
  
                    </tr>
                  </thead>
                  <tbody>
  
                    {
                      
                      loans.map((loan, index) => (
  
                        <tr>
                          <th scope="row">{loan.loanId}</th>
  
                          <td>{loan.loanType}</td>
                          <td>{loan.loanDuration}</td>
  
  
                          {/* <td >
      <Link to={"/edit/" + loan.regno}>Edit
                          </Link>
                        </td> */}
                            
  
  
                            
  
                          
                        </tr>
  
                      ))
                    }
  
                  </tbody>
                </table>
  
  
                {/* <select >
                {
                loans.map((loan, index) => (
                <option key={loan.loanId} value={loan.loanId}>{loan.loanType}</option>
                     
                    
                  ))
                    }
                </select> */}
  
              </div>
            </div>
          </div>
          
        </div>
  
      </div>
  
    );
}
