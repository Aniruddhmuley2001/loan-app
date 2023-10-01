import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Modal, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

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
    if (loanDuration <= 0) {
      toast.error('Please enter valid value', { autoClose: 1500 });
    }
    else {

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
          toast.success("Loan added successfully!", { autoClose: 1500 });
          navigate("/admin/" + adminId + "/loans");
        }).catch(error => {
          toast.error("Facing Issues in adding loan");
          console.log(error);
        });
    }

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
                <Form.Control required type="text" placeholder="Property" value={loanType} onChange={loanTypeChangeHandler} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicItemCategory">
                <Form.Label>Loan Duration: </Form.Label>
                <Form.Control required type="number" placeholder="Number of months" value={loanDuration} onChange={loanDurationChangeHandler} />
              </Form.Group>

              <Button type="submit">Add</Button>
            </Form>
          </Modal.Body>
        </Modal.Dialog>
      </div>
    </>
  )
}
