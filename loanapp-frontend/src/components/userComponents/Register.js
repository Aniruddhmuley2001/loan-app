import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const Register = () => {
    const baseURL = "http://localhost:7000/saveUser";
    const navigate = useNavigate();
    const [id, setId] = useState("")
    const [password, setPassword] = useState("")
    const [fullname, setFullname] = useState("")
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

    const fullnameChangeHandler = (event) => {
        setFullname(event.target.value);
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
        if(dob >= doj) {
          alert('DOB greater than DOJ');
        }
        else {

          axios
            .post(baseURL, {
              id: id,
              password: password,
              name: fullname,
              designation: designation,
              department:department,
              dob: dob,
              doj: doj,
              gender: gender
            })
            .then((response) => {
              // alert(response.data.fullname);
              alert("Employee "+ fullname +" added!");
              sessionStorage.setItem("emp_id", id);
              navigate("/user/" + id );
            }).catch(error => {
              alert("error==="+error);
            });
      
        }
      };

    return (
        <>
        <div className="modal show" style={{ display: 'block', position: 'initial' }}>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Register for loans</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={submitActionHandler}>
              <Form.Group className="mb-3" controlId="formBasicID">
                <Form.Label>Employee ID</Form.Label>
                <Form.Control required type="text" placeholder="Enter ID" value={id} onChange={idChangeHandler} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control required type="password" placeholder="Password" value={password} onChange={passwordChangeHandler}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control required type="test" placeholder="Name" value={fullname} onChange={fullnameChangeHandler}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicDesig">
                <Form.Label>Designation</Form.Label>
                <Form.Control required type="test" placeholder="Designation" value={designation} onChange={designationChangeHandler}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicDept">
                <Form.Label>Department</Form.Label>
                <Form.Control required type="test" placeholder="Depatment" value={department} onChange={deptChangeHandler}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicDob">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control required type="date" value={dob} onChange={dobChangeHandler}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicDoj">
                <Form.Label>Date of Joining</Form.Label>
                <Form.Control required type="date" value={doj} onChange={dojChangeHandler}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicGender">
                <Form.Label>Gender</Form.Label>
                <Form.Control required type="test" placeholder="Gender" value={gender} onChange={genderChangeHandler}/>
              </Form.Group>
              <Button type="submit">Login</Button>
            </Form>
            </Modal.Body>
          </Modal.Dialog>
        </div>
        </>
    )
};


export default Register;