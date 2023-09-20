import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

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
        <form onSubmit={submitActionHandler}>
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
        </form>
        </>
    )
}
