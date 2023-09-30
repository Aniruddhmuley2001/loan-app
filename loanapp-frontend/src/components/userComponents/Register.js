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
    const [datevalidationError, setDateValidationError] = useState('');
    const [idvalidationError, setIdValidationError] = useState('');
    const validateDates = (dob, doj) => {
     
      const currentDate = getCurrentDate();
      const dobDate = new Date(dob);
      const dojDate = new Date(doj);
  
      if (dobDate >= currentDate ) {
        setDateValidationError('Date of birth must be less than the current date');
      } 
      else if( dojDate >= currentDate){
        setDateValidationError('Date of joining must be less than the current date');
      }
      else if (dobDate >= dojDate) {
        setDateValidationError('Date of Birth must be less than Date of Joining');
      } else {
        setDateValidationError('');
      }
    };
   
    const getCurrentDate = () => {
      const now = new Date();
      return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    };
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
        validateDates(event.target.value, doj);
    }

    const dojChangeHandler = (event) => {
        setDoj(event.target.value);
        validateDates(dob,event.target.value);
    }

    const genderChangeHandler = (event) => {
        setGender(event.target.value);
    }

    const submitActionHandler = (event) => {
        event.preventDefault();
        const currentDate = getCurrentDate();
        const dobDate = new Date(dob);
        const dojDate = new Date(doj);
       
        if(dob >= doj||dobDate>=currentDate||dojDate>=currentDate) {
    
          if(dobDate>=dojDate){
            setDateValidationError('Date of birth must be less than the date of joining');
          }
          else{
if(dobDate>=currentDate){
  setDateValidationError('Date of birth must be less than the current date');
}
else{
  setDateValidationError('Date of joining must be less than the current date');
}
          }
        
          //alert('DOB greater than DOJ');
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
                <Form.Control required type="test" placeholder="Department" value={department} onChange={deptChangeHandler}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicDob">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control required type="date" value={dob} onChange={dobChangeHandler} onBlur={validateDates}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicDoj">
                <Form.Label>Date of Joining</Form.Label>
                <Form.Control required type="date" value={doj} onChange={dojChangeHandler} onBlur={validateDates}/>
              </Form.Group>
              
              
              <Form.Group className="mb-3" controlId="formBasicGender">
                <Form.Label>Gender</Form.Label>
                <Form.Select
            required
            value={gender}
            onChange={genderChangeHandler} placeholder="Gender"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Prefer not to disclose">Prefer not to disclose</option>
          </Form.Select>
                
              </Form.Group>
             
              <Button type="submit">Register</Button>
            </Form>
            
            {datevalidationError && <p style={{ color: 'red' }}>{datevalidationError}</p>}
            </Modal.Body>
          </Modal.Dialog>
        </div>
        </>
    )
};


export default Register;