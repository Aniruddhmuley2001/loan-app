import React from "react"
import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

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
    
      };

    return (
        <>
        <div>
            <main className="form-signin w-100 m-auto">
            <form onSubmit={submitActionHandler}>
            <img className="mb-4" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNv48GNbEnRiypNThhhx-LetVL89Vqe-I4xH9sE8VA9g&s" alt="" width="200" height="100"/>
        <h3 className="mb-3" style={{color:"black"}}><b>Sign Up</b></h3>
        <div className="form-floating mb-3">
    
      <input type="text" value={id} onChange={idChangeHandler} class="form-control" id="floatingInput"  fdprocessedid="q5g98"></input>

      <label for="floatingInput">Employee ID </label>
    </div>
    <div className="form-floating mb-3">
    
    <input type="text" value={password} onChange={passwordChangeHandler} class="form-control" id="floatingInput"  fdprocessedid="q5g98"></input>

    <label for="floatingInput">Password </label>
  </div>
  <div className="form-floating mb-3">
    
      <input type="text" value={fullname} onChange={fullnameChangeHandler} class="form-control" id="floatingInput"  fdprocessedid="q5g98"></input>

      <label for="floatingInput">Full Name </label>
    </div>
    <div className="form-floating mb-3">
    
      <input type="text" value={designation} onChange={designationChangeHandler} class="form-control" id="floatingInput"  fdprocessedid="q5g98"></input>

      <label for="floatingInput">Designation </label>
    </div>
    <div className="form-floating mb-3">
    
      <input type="text" value={department} onChange={deptChangeHandler} class="form-control" id="floatingInput"  fdprocessedid="q5g98"></input>

      <label for="floatingInput">Department </label>
    </div>
    <div className="form-floating mb-3">
    
      <input type="date" value={dob} onChange={dobChangeHandler} class="form-control" id="floatingInput"  fdprocessedid="q5g98"></input>

      <label for="floatingInput">Date of Birth </label>
    </div>
    <div className="form-floating mb-3">
    
      <input type="date" value={doj} onChange={dojChangeHandler} class="form-control" id="floatingInput"  fdprocessedid="q5g98"></input>

      <label for="floatingInput">Date of Joining </label>
    </div>
    <div className="form-floating mb-3">
    
      <input type="text" value={gender} onChange={genderChangeHandler} class="form-control" id="floatingInput"  fdprocessedid="q5g98"></input>

      <label for="floatingInput">Gender </label>
    </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/user/login" style={{color:"black"}}><b>Login</b></a>
        </p>
      </form>
            </main>
        </div>
        
        </>
    )
};


export default Register;