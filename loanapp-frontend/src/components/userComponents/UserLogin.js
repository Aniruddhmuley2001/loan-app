import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
        if (response.data === "Login Success") {
          alert("Employee " + id + " logged in!");
          sessionStorage.setItem("emp_id", id);
          navigate("/user/" + id)
        }
        else {
          alert('Invalid credentials')
        }
      }).catch(error => {
        alert("error===" + error);
      });

  };

  return (
    <>
      <div className="container" style={{width: "60%",justifyContent: "center", alignItems:"center",display:'flex',flexDirection:'column',backgroundColor:'#232b27', borderRadius: "30px"}}>
        <h2 class="fw-semi-bold mt-2 mb-2 text-uppercase text-white">Login</h2>
        <p class="text-white-50 mb-3">Please enter your Employee Id and Password</p>

        <Form className="col-12 col-md-8 col-lg-6 col-xl-5" onSubmit={submitActionHandler}>
          <Form.Group className="form-outline mb-4" controlId="formBasicEmail">
            {/* <Form.Label>Employee Id</Form.Label> */}
            <Form.Control type="text" value={id} onChange={idChangeHandler} placeholder="Enter your Employee Id" />
          </Form.Group>

          <Form.Group className="form-outline mb-4" controlId="formBasicPassword">
            {/* <Form.Label>Password</Form.Label> */}
            <Form.Control type="password" value={password} onChange={passwordChangeHandler} placeholder="Password" />
          </Form.Group>

          <Button className="mb-4" variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </>
  )
};



export default UserLogin;