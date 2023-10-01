import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { Modal, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function EditUserData() {
  let { userId } = useParams();
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
  const [datevalidationError, setDateValidationError] = useState('');
  const [passwordvalidationError, setPasswordValidationError] = useState('');
  const validateDates = (dob, doj) => {
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

  useEffect(() => {
    setUserData();
  }, []);

  const setUserData = () => {
    axios.get(getUserBaseURL).then((response) => {
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
      toast.error("Error Ocurred while loading user data", { autoClose: 1500 });
      console.log(error);
    });
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
        .put(updateUserBaseURL, {
          id: id,
          password: password,
          name: name,
          designation: designation,
          department: department,
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
          toast.success("Employee " + id + " updated!", { autoClose: 1500 });
          navigate("/admin/" + adminId + "/customers");
        }).catch(error => {
          toast.error("Failed to update: " + error, { autoClose: 1500 });
          console.log(error);
        });

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
                <Form.Label>Employee ID</Form.Label>
                <Form.Control required disabled type="text" placeholder="Enter ID" value={id} onChange={idChangeHandler} />
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
