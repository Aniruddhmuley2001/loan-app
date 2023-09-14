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
        <form onSubmit={submitActionHandler}>
            <p>
            <label>Employee Id: <input type="text" value={id} onChange={idChangeHandler}></input></label>
            </p>

            <p>
            <label>Password: <input type="password" value={password} onChange={passwordChangeHandler}></input></label>
            </p>

            <p>
            <label>Full Name: <input type="text" value={fullname} onChange={fullnameChangeHandler}></input></label>
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
};


export default Register;