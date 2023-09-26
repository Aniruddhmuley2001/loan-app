import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Modal, Form, Button } from 'react-bootstrap';

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
            loanId: parseInt(loanId, 10),
            loanType: loanType,
            loanDuration: parseInt(loanDuration, 10),
          }, {
            headers: {
              "Access-Control-Allow-Headers": "*", // this will allow all CORS requests
              "Access-Control-Allow-Methods": 'OPTIONS,POST,GET,DELETE,PUT', // this states the allowed methods
              "Content-Type": "application/json" // this shows the expected content type
            }
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
        <div className="modal show" style={{ display: 'block', position: 'initial' }}>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Add Loan data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={submitActionHandler}>
           
              <Form.Group className="mb-3" controlId="formBasicID">
                <Form.Label>Loan ID</Form.Label>
                <Form.Control type="number" placeholder="123456" value={loanId} onChange={loanIdChangeHandler} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Label>Loan Type: </Form.Label>
                <Form.Control type="text" placeholder="Property" value={loanType} onChange={loanTypeChangeHandler}/>
              </Form.Group>
           
              <Form.Group className="mb-3" controlId="formBasicItemCategory">
                <Form.Label>Loan Duration: </Form.Label>
                <Form.Control type="number" placeholder="Number of year" value={loanDuration} onChange={loanDurationChangeHandler}/>
              </Form.Group>

              <Button type="submit">Register</Button>
            </Form>
            </Modal.Body>
          </Modal.Dialog>
        </div>
        {/* <form onSubmit={submitActionHandler}>
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
        </form> */}
        </>
    )
}
