import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function UserForm(props) {
    const baseURL = props.url;
    const navigate = useNavigate();
    const adminId = sessionStorage.getItem("emp_id");
    const [id, setId] = useState("")
    const [password, setPassword] = useState("")
    const [name, setname] = useState("")
    const [designation, setDesignation] = useState("")
    const [department, setDepartment] = useState("")
    const [dob, setDob] = useState("")
    const [doj, setDoj] = useState("")
    const [gender, setGender] = useState("");

    const idChangeHandler = (event) => {
        setId(event.target.value);
    }

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    }

    const nameChangeHandler = (event) => {
        setname(event.target.value);
    }

    const designationChangeHandler = (event) => {
        setDesignation(event.target.value);
    }

    const deptChangeHandler = (event) => {
        setDepartment(event.target.value);
    }

    const dobChangeHandler = (event) => {
        setDob(event.target.value);
    }

    const dojChangeHandler = (event) => {
        setDoj(event.target.value);
    }

    const genderChangeHandler = (event) => {
        setGender(event.target.value);
    }

    const submitActionHandler = (event) => {
        event.preventDefault();
        axios
          .post(baseURL, {
            id: id,
            password: password,
            name: name,
            designation: designation,
            department:department,
            dob: dob,
            doj: doj,
            gender: gender
          })
          .then((response) => {
            // alert(response.data.name);
            alert("Employee "+ id +" added!");
            navigate("/admin/" + adminId + "/customers");
          }).catch(error => {
            alert("error==="+error);
          });
    
      };

    return (
        <>
         <div className="modal show" style={{ display: 'block', position: 'initial' }}>
          <Modal.Dialog>
            <Modal.Header>
            <Modal.Title>Eidt User data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={submitActionHandler}>
           
              <Form.Group className="mb-3" controlId="formBasicID">
                <Form.Label>Employee ID: </Form.Label>
                <Form.Control type="text" placeholder="K100987" value={id} disabled />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Label>Password: </Form.Label>
                <Form.Control type="password" value={password} onChange={passwordChangeHandler}/>
              </Form.Group>
           
              <Form.Group className="mb-3" controlId="formBasicItemCategory">
                <Form.Label>Fullname: </Form.Label>
                <Form.Control type="text" value={name} onChange={nameChangeHandler}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicItemCategory">
                <Form.Label>Designation: </Form.Label>
                <Form.Control type="text" value={designation} onChange={designationChangeHandler}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicItemCategory">
                <Form.Label>Department: </Form.Label>
                <Form.Control type="text" value={department} onChange={deptChangeHandler}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicItemCategory">
                <Form.Label>Date Of Birth: </Form.Label>
                <Form.Control type="date" value={dob} onChange={dobChangeHandler}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicItemCategory">
                <Form.Label>Date of joining: </Form.Label>
                <Form.Control type="date" value={doj} onChange={dojChangeHandler}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicItemCategory">
                <Form.Label>Gender: </Form.Label>
                <Form.Control type="text" value={gender} onChange={genderChangeHandler}/>
              </Form.Group>
              
              <Button type="submit">Register</Button>
            </Form>
            </Modal.Body>
          </Modal.Dialog>
        </div>
        {/* <form onSubmit={submitActionHandler}>
            <p>
            <label>Employee Id: <input type="text" value={id} onChange={idChangeHandler}></input></label>
            </p>

            <p>
            <label>Password: <input type="password" value={password} onChange={passwordChangeHandler}></input></label>
            </p>

            <p>
            <label>Full Name: <input type="text" value={name} onChange={nameChangeHandler}></input></label>
            </p>

            <p>
            <label>Designation: <input type="text" value={designation} onChange={designationChangeHandler}></input></label>
            </p>

            <p>
            <label>Department <input type="text" value={department} onChange={deptChangeHandler}></input></label>
            </p>

            <p>
            <label>Date of Birth: <input type="date" value={dob} onChange={dobChangeHandler}></input></label>
            </p>

            <p>
            <label>Date of Joining: <input type="date" value={doj} onChange={dojChangeHandler}></input></label>
            </p>

            <p>
            <label>Gender <input type="text" value={gender} onChange={genderChangeHandler}></input></label>
            </p>

            <button type="submit">Register</button>
        </form> */}
        </>
    )
}
