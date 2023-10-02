import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function LoansList() {
  const navigate = useNavigate();
  const loanDataBaseURL = "http://localhost:7000/fetchLoans";
  const deleteLoanDataBaseURL = "http://localhost:7000/deleteLoan";
  const [loans, setLoanDetails] = useState([]);

  const setLoansData = () => {
    axios.get(loanDataBaseURL).then((response) => {
      setLoanDetails(response.data);
    }).catch(error => {
      toast.error("Error Occured while loaing Loan Data", { autoClose: 1500 });
      console.log(error);
    })
  }

  const deleteEntry = (id) => {
    axios.delete(deleteLoanDataBaseURL + "/" + id).then((response) => {
      toast.success("Loan " + id + " deleted successfully!", { autoClose: 1500 });
      navigate("./delete")
    }).catch(error => {
      if(error.response.data.message === "could not execute statement; SQL [n/a]; constraint [null]; nested exception is org.hibernate.exception.ConstraintViolationException: could not execute statement") {
        toast.error("Cannot delete active loan!", {autoClose: 1500});
      }
      else {
        toast.error("Error Occured while deleting loan", { autoClose: 1500 });
      }
      console.log(error)
    })
  }

  useEffect(() => {
    setLoansData();
  }, []);

  if (loans.length === 0) {
    return (
      <div>
        <h3 className='white-text'>Loan Master Data</h3>
        <br></br>
        <Button onClick={() => navigate("./add")}>Add loan</Button>
        <Outlet />

        <br></br>
        <br></br>

        <div className='container'>
          <Container className="empty-list-container">
            <Row>
              <Col md={8} className="mx-auto text-center">
                <h3 className="display-4">No data to Display</h3>
                <br></br>
                <p className="lead">Try adding by clicking on the above button</p>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    )
  }
  else {
    return (
      <div>
        <h3 className='white-text'>Loan Master Data</h3>
        <br />
        <Button onClick={() => navigate("./add")}>Add loan</Button>
        <Outlet />

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
                          {<Link onClick={() => deleteEntry(loan.loanId)}>Delete</Link>}
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
