import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const AdminLogin = () => {

    const baseURL = "http://localhost:7000/loginAdmin";
    const navigate = useNavigate();
    const [id, setId] = useState("")
    const [password, setPassword] = useState("")

    const idChangeHandler = (event) => {
        setId(event.target.value);
    }

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    }

    const submitActionHandler = (event) => {
        event.preventDefault();
        axios
          .post(baseURL, {
            id: id,
            password: password
          })
          .then((response) => {
            console.log(response);
            if(response.data === "Login Success") {
                alert("Admin "+ id +" logged in!");
                sessionStorage.setItem("emp_id", id);
                navigate("/admin/" + id )
            }
            else {
                alert('Invalid credentials')
            }
          }).catch(error => {
            alert("error==="+error);
          });
    
      };

    return (
        <>
        <p>Admin Login</p>
        <form onSubmit={submitActionHandler}>
            <p>
            <label>Enter Admin User ID: <input type="text" value={id} onChange={idChangeHandler}></input></label>
            </p>

            <p>
            <label>Enter Admin Password: <input type="password" value={password} onChange={passwordChangeHandler}></input></label>
            </p>

            <button type="submit">Login</button>
        </form>
        </>
    )
};



export default AdminLogin;