import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Modal, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function UserForm(props) {
  const baseURL = props.url;
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
  const [datevalidationError, setDateValidationError] = useState('');
  const [passwordvalidationError, setPasswordValidationError] = useState('');
  const validateDates = (dob, doj) => {
    //debugger
    const currentDate = getCurrentDate();
    const dobDate = new Date(dob);
    const dojDate = new Date(doj);

    if (dobDate >= currentDate) {
      setDateValidationError('Date of birth must be less than the current date');
    }
    else if (dojDate > currentDate) {
      setDateValidationError('Date of joining must be less than the current date');
    }
    else if (dobDate >= dojDate) {
      setDateValidationError('Date of Birth must be less than Date of Joining');
    } else {
      setDateValidationError('');
    }
  };
  const validatePassword = (value) => {

    // Define a regular expression pattern for a strong password
    const strongPasswordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,40}$/;

    if (strongPasswordPattern.test(value)) {

      setPasswordValidationError('');
    }
    else {

      setPasswordValidationError(
        'Password must be between (6-40) characters long and include at least one uppercase letter, one number, and one special character among(!@#$%^&*).'
      );
    }

  };

  const getCurrentDate = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
  };
  const idChangeHandler = (event) => {
    setId(event.target.value);

  }

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  }
  const passwordBlurHandler = (event) => {
    const newValue = event.target.value;

    // Perform password validation on blur
    validatePassword(newValue);

  };

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
    validateDates(event.target.value, doj);
  }

  const dojChangeHandler = (event) => {
    setDoj(event.target.value);
    validateDates(dob, event.target.value);
  }

  const genderChangeHandler = (event) => {
    setGender(event.target.value);
  }

  const submitActionHandler = (event) => {
    event.preventDefault();
    const currentDate = getCurrentDate();
    const dobDate = new Date(dob);
    const dojDate = new Date(doj);

    if (dob >= doj || dobDate >= currentDate || dojDate > currentDate || passwordvalidationError) {
      if (passwordvalidationError) {

        setPasswordValidationError('Password must be between (6-40) characters long and include at least one uppercase letter, one number, and one special character among (!@#$%^&*).');
      }
      else if (dobDate >= dojDate) {
        setDateValidationError('Date of birth must be less than the date of joining');
      }
      else {
        if (dobDate >= currentDate) {
          setDateValidationError('Date of birth must be less than the current date');
        }
        else {
          setDateValidationError('Date of joining must be less than or equal to the current date');
        }
      }

    }


    else {

      axios
        .post(baseURL, {
          id: id,
          password: password,
          name: name,
          designation: designation,
          department: department,
          dob: dob,
          doj: doj,
          gender: gender
        })
        .then((response) => {
          if (response.data === "User saved successfuly.") {
            toast.success("Employee " + name + " added!", { autoClose: 1500 });
            sessionStorage.setItem("emp_id", id);
            navigate("/admin/" + adminId + "/customers")
          }
          else if (response.data === "User already exists.") {
            toast.error("User already exists, please add unique user");
          }
          else {
            toast.error("Registration unsuccessful!");
          }
        }).catch(error => {
          console.log(error);
          toast.error("Failed to add: " + error.response.data.message, { autoClose: 3000 });
        });

    }
  };


  return (
    <>
      <div className="modal show" style={{ display: 'block', position: 'initial' }}>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Add User data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={submitActionHandler}>
              <Form.Group className="mb-3" controlId="formBasicID">
                <Form.Label>Employee ID</Form.Label>
                <Form.Control required type="text" placeholder="Enter ID" value={id} onChange={idChangeHandler} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control required type="password" placeholder="Password" value={password} onChange={passwordChangeHandler} onBlur={passwordBlurHandler} />

                {passwordvalidationError && (
                  <p style={{ color: 'red' }}>{passwordvalidationError}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control required type="test" placeholder="Name" value={name} onChange={nameChangeHandler} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicDesig">
                <Form.Label>Designation</Form.Label>
                <Form.Control required type="test" placeholder="Designation" value={designation} onChange={designationChangeHandler} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicDept">
                <Form.Label>Department</Form.Label>
                <Form.Control required type="test" placeholder="Department" value={department} onChange={deptChangeHandler} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicDob">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control required type="date" value={dob} onChange={dobChangeHandler} onBlur={validateDates} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicDoj">
                <Form.Label>Date of Joining</Form.Label>
                <Form.Control required type="date" value={doj} onChange={dojChangeHandler} onBlur={validateDates} />
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
}
