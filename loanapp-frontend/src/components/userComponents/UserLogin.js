import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const UserLogin = () => {

    const baseURL = "http://localhost:7000/loginUser";
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
                alert("Employee "+ id +" logged in!");
                sessionStorage.setItem("emp_id", id);
                navigate("/user/" + id )
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
        <form onSubmit={submitActionHandler}>
            <p>
            <label>Employee ID: <input type="text" value={id} onChange={idChangeHandler}></input></label>
            </p>

            <p>
            <label>Password: <input type="password" value={password} onChange={passwordChangeHandler}></input></label>
            </p>

            <button type="submit">Login</button>
        </form>
        </>
    )
};



export default UserLogin;