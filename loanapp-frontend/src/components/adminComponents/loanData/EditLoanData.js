import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { Modal, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function EditLoanData() {
    let params = useParams();
    const getLoanBaseURL = "http://localhost:7000/fetchLoanDetails/" + params.loanId;
    const updateLoanBaseURL = "http://localhost:7000/updateLoan";

    const navigate = useNavigate();
    const adminId = sessionStorage.getItem("emp_id");

    const [loanId, setLoanId] = useState(0)
    const [loanType, setLoanType] = useState("")
    const [loanDuration, setLoanDuration] = useState(0)

    const setLoanData = () => {
        axios.get(getLoanBaseURL ).then((response) => {
          let loan = response.data;
          setLoanId(loan.loanId);
          setLoanType(loan.loanType);
          setLoanDuration(loan.loanDuration);
        }).catch(error => {
          toast.error("Error Ocurred while loading loan data", { autoClose: 1500 });
          console.log(error);
        });
    }

    const loanIdChangeHandler = (event) => {
        setLoanId(event.target.value);
    }

    const loanTypeChangeHandler = (event) => {
        setLoanType(event.target.value);
    }

    const loanDurationChangeHandler = (event) => {
        setLoanDuration(event.target.value);
    }

    useEffect(() => {
        setLoanData();
      }, []);

    const submitActionHandler = (event) => {
        event.preventDefault();
        if(loanDuration<=0) {
          toast.error('Please enter valid value', { autoClose: 1500 });
        }
        else {
          axios
            .put(updateLoanBaseURL, {
              loanId: parseInt(loanId, 10),
              loanType: loanType,
              loanDuration: parseInt(loanDuration, 10),
            })
            .then((response) => {
              toast.success("Loan added successfully!", { autoClose: 1500 });
              navigate("/admin/" + adminId + "/loans");
            }).catch(error => {
              toast.error("Facing issues in updating loan", { autoClose: 1500 });
              console.log(error);
            });
        }
    
      };

    return (
        <>
         <div className="modal show" style={{ display: 'block', position: 'initial' }}>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Edit Loan data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={submitActionHandler}>
           
              <Form.Group className="mb-3" controlId="formBasicID">
                <Form.Label>Loan ID</Form.Label>
                <Form.Control type="number" disabled placeholder="123456" value={loanId} onChange={loanIdChangeHandler} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Label>Loan Type: </Form.Label>
                <Form.Control required type="text" disabled placeholder="Property" value={loanType} onChange={loanTypeChangeHandler}/>
              </Form.Group>
           
              <Form.Group className="mb-3" controlId="formBasicItemCategory">
                <Form.Label>Loan Duration: </Form.Label>
                <Form.Control required type="number" placeholder="Number of months" value={loanDuration} onChange={loanDurationChangeHandler}/>
              </Form.Group>

              <Button type="submit">Save</Button>
            </Form>
            </Modal.Body>
          </Modal.Dialog>
        </div>
        </>
    )
}
