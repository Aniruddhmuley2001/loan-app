import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import { toast } from 'react-toastify';

export default function ViewItems() {
  const empId = sessionStorage.getItem("emp_id");
  const fetchUserDetailsBaseURL = `http://localhost:7000/fetchUserDetails/${empId}`;
  const fetchItemsPurchasedBaseURL = `http://localhost:7000/fetchItemsById/${empId}`;
  const [itemsWithIssueId, setItemDetails] = useState([]);
  const [userDetails, setUserDetails] = useState([]);

  const setUserData = () => {
    axios.get(fetchUserDetailsBaseURL).then((response) => {
      setUserDetails(response.data);
    }).catch(error => {
      toast.error("Error Occured while loaing Items: " + error);
    })
  }

  const setItemData = () => {
    axios.get(fetchItemsPurchasedBaseURL).then((response) => {
      setItemDetails(response.data);
    }).catch(error => {
      toast.error("Error Ocurred while loading data:" + error);
    });
  }

  useEffect(() => {
    setUserData();
    setItemData();
  }, []);

  return (
    <div className="card-body">
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

      <br></br>
      <div>
        <h4 className='white-text'>Items Purchased</h4>

        <div className="container">
          {
            itemsWithIssueId.length > 0 &&
            <div className="row">
              <div className="col-12">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>Issue ID</th>
                      <th>Item ID</th>
                      <th>Item Description</th>
                      <th>Item Value</th>
                      <th>Item Make</th>
                      <th>Item Category</th>
                      {/* <th scope="col">Action</th> */}

                    </tr>
                  </thead>
                  <tbody>

                    {

                      itemsWithIssueId.map((itemWithIssueId, index) => (

                        <tr key={index}>
                          <td scope="row">{itemWithIssueId.issueId}</td>
                          <td>{itemWithIssueId.item.itemId}</td>
                          <td>{itemWithIssueId.item.itemDescription}</td>
                          <td>{itemWithIssueId.item.itemValue}</td>
                          <td>{itemWithIssueId.item.itemMake}</td>
                          <td>{itemWithIssueId.item.itemCategory}</td>

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
                  items.map((loan, index) => (
                  <option key={loan.loanId} value={loan.loanId}>{loan.loanType}</option>
                      
                      
                    ))
                      }
                  </select> */}

              </div>
            </div>
          }

          {
            itemsWithIssueId.length === 0 &&
            <Container className="empty-list-container">
              <Row>
                <Col md={8} className="mx-auto text-center">
                  <h3 className="display-4">No data to display</h3>
                  <br></br>
                  <p className="lead">Try applying for a loan</p>
                </Col>
              </Row>
            </Container>
          }
        </div>

      </div>

    </div>

  );
}
