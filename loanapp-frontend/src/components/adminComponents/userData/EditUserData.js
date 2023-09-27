import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { Modal, Form, Button } from 'react-bootstrap';

export default function EditUserData() {
    let {userId} = useParams();
    const getUserBaseURL = "http://localhost:7000/fetchUserDetails/" + userId;
    const updateUserBaseURL = "http://localhost:7000/updateUser";

    const navigate = useNavigate();
    const adminId = sessionStorage.getItem("emp_id");

    const [id, setId] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [designation, setDesignation] = useState("")
    const [department, setDepartment] = useState("")
    const [dob, setDob] = useState("")
    const [doj, setDoj] = useState("")
    const [gender, setGender] = useState("");

    const setUserData = () => {
        axios.get(getUserBaseURL ).then((response) => {
            let user = response.data;
            setId(user.id);
            setPassword(user.password);
            setName(user.name);
            setDesignation(user.designation);
            setDepartment(user.department);
            setDob(user.dob);
            setDoj(user.doj);
            setGender(user.gender);
        }).catch(error => {
            alert("Error Ocurred while loading user data:" + error);
        });
    }

    const idChangeHandler = (event) => {
        setId(event.target.value);
    }

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    }

    const nameChangeHandler = (event) => {
        setName(event.target.value);
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

    useEffect(() => {
        setUserData();
      }, []);

    const submitActionHandler = (event) => {
        event.preventDefault();
        if(dob >= doj) {
          alert('DOB greater than DOJ');
        }
        else {
          let today = new Date();
          let dd = String(today.getDate()).padStart(2, '0');
          let mm = String(today.getMonth()+1).padStart(2, '0');
          let yyyy = today.getFullYear();
          today = yyyy + '-' + mm + '-' + dd;

          if(dob>today || doj>today) {
            alert('Cannot enter future date')
          }
          else {

            axios
              .put(updateUserBaseURL, {
                id: id,
                password: password,
                name: name,
                designation: designation,
                department:department,
                dob: dob,
                doj: doj,
                gender: gender
              }, 
              {
                headers: {
                  "Access-Control-Allow-Headers": "*", // this will allow all CORS requests
                  "Access-Control-Allow-Methods": 'OPTIONS,POST,GET,DELETE,PUT', // this states the allowed methods
                  "Content-Type": "application/json" // this shows the expected content type
                }
              })
              .then((response) => {
                // alert(response.data.name);
                alert("Employee "+ id +" added!");
                navigate("/admin/" + adminId + "/customers");
              }).catch(error => {
                alert("error==="+error);
              });
          }
      
        }
      };

    return (
        <>
         <div className="modal show" style={{ display: 'block', position: 'initial' }}>
          <Modal.Dialog>
            <Modal.Header>
            <Modal.Title>Edit User data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={submitActionHandler}>
           
              <Form.Group className="mb-3" controlId="formBasicID">
                <Form.Label>Employee ID: </Form.Label>
                <Form.Control required type="text" placeholder="K100987" value={id} disabled />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Label>Password: </Form.Label>
                <Form.Control required type="password" value={password} onChange={passwordChangeHandler}/>
              </Form.Group>
           
              <Form.Group className="mb-3" controlId="formBasicItemCategory">
                <Form.Label>Fullname: </Form.Label>
                <Form.Control required type="text" value={name} onChange={nameChangeHandler}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicItemCategory">
                <Form.Label>Designation: </Form.Label>
                <Form.Control required type="text" value={designation} onChange={designationChangeHandler}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicItemCategory">
                <Form.Label>Department: </Form.Label>
                <Form.Control required type="text" value={department} onChange={deptChangeHandler}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicItemCategory">
                <Form.Label>Date Of Birth: </Form.Label>
                <Form.Control required type="date" value={dob} onChange={dobChangeHandler}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicItemCategory">
                <Form.Label>Date of joining: </Form.Label>
                <Form.Control required type="date" value={doj} onChange={dojChangeHandler}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicItemCategory">
                <Form.Label>Gender: </Form.Label>
                <Form.Control required type="text" value={gender} onChange={genderChangeHandler}/>
              </Form.Group>
              
              <Button type="submit">Register</Button>
            </Form>
            </Modal.Body>
          </Modal.Dialog>
        </div>
        {/* <form onSubmit={submitActionHandler}>
            <p>
            <label>Employee Id: <input type="text" value={id} disabled></input></label>
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
