import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";

export default function ViewLoans() {
  const empId = sessionStorage.getItem("emp_id"); 
  const fetchUserDetailsBaseURL = `http://localhost:7000/fetchUserDetails/${empId}`;
  const fetchLoansURL = `http://localhost:7000/fetchLoansById/${empId}`;
  const [userDetails, setUserDetails] = useState([]);
  const [loans, setLoanDetails] = useState([]);

  const setUserData = () => {
    axios.get(fetchUserDetailsBaseURL).then((response) => {
      setUserDetails(response.data);
    }).catch(error => {
      alert("Error Ocurred while loading User Data: " + error);
    })
  }
  
  const setLoanData = () => {
    axios.get(fetchLoansURL ).then((response) => {
      setLoanDetails(response.data);
    }).catch(error => {
      alert("Error Ocurred while fetching Loans Data:" + error);
    });
  }
  
    useEffect(() => {
      setUserData();
      setLoanData();
    }, []);
  
    return (
      <div class="card-body">
        <br></br>
        {/* <div>
          <p>Employee ID: {userDetails.id}</p>
          <p>Designation: {userDetails.designation}</p>
          <p>Department: {userDetails.department}</p>
        </div> */}

      <Card border="light">
          <Card.Body>
            Employee ID: {userDetails.id}
            &nbsp;
            Designation: {userDetails.designation}
            &nbsp;
            Department: {userDetails.department}
          </Card.Body>
        </Card>

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
                      <th>Loan Duration (In Years)</th>
                      <th>Card Issue Date</th>
                      {/* <th scope="col">Action</th> */}
  
                    </tr>
                  </thead>
                  <tbody>
  
                    {
                      
                      loans.map((obj, index) => (
  
                        <tr key={index}>
                          <th scope="row">{obj.loans.loanId}</th>
                          <td>{obj.loans.loanType}</td>
                          <td>{obj.loans.loanDuration}</td>
                          <td>{obj.issueDate}</td>
  
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
