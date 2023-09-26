import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function LoansList() {
    const navigate = useNavigate();
    const loanDataBaseURL = "http://localhost:7000/fetchLoans";
    const deleteLoanDataBaseURL = "http://localhost:7000/deleteLoan";
    const [loans, setLoanDetails] = useState([]);
    
    const setLoansData = () => {
        axios.get(loanDataBaseURL).then((response) => {
          setLoanDetails(response.data);
        }).catch(error => {
          alert("Error Occured while loaing Loan Data: " + error);
        })
    }

    const deleteEntry = (id) => {
      axios.delete(deleteLoanDataBaseURL+"/"+id).then((response) => {
        alert("Loan deleted!");
        navigate("./delete")
      }).catch(error => {
        alert("Error Occured while deleting loan: " + error);
      })
    }

    useEffect(() => {
        setLoansData();
    }, []);

    if(loans.length === 0) {
      return (
        <div>
          <h3>Loan Master Data</h3>
          <button onClick={() => navigate("./add")}>Add loan</button>

          <Outlet/>

          <br></br>
          <br></br>

          <div className='container'>
            <p>No data to display</p>
          </div>
        </div>
      )
    }
    else {
      return (
          <div>
              <h3>Loan Master Data</h3>
              <button onClick={() => navigate("./add")}>Add loan</button>
  
              <Outlet/>
  
              <br></br>
              <br></br>
  
              <div className="container">
              <div className="row">
                <div className="col-12">
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>Loan ID</th>
                        <th>Loan Type</th>
                        <th>Loan Duration (mnths)</th>
                        <th>Operations</th>  
                      </tr>
                    </thead>
                    <tbody>
    
                      {
                        
                        loans.map((loan, index) => (
    
                          <tr>
                            <td scope="row">{loan.loanId}</td>
                            <td>{loan.loanType}</td>
                            <td>{loan.loanDuration}</td>
    
                            <td > 
                              <Link to={"./" + loan.loanId}>Edit</Link>, 
                              {<Link onClick={() => deleteEntry(loan.loanId)}>Delete</Link>  }
                            </td>
                            
                          </tr>
    
                        ))
                      }
    
                    </tbody>
                  </table>
    
                </div>
              </div>
            </div>
          </div>
      )
    }

}
