import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

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
        <div className="modal show" style={{ display: 'block', position: 'initial' }}>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Admin Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={submitActionHandler}>
              <Form.Group className="mb-3" controlId="formBasicID">
                <Form.Label>Admin ID</Form.Label>
                <Form.Control type="text" placeholder="Enter ID" value={id} onChange={idChangeHandler} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={passwordChangeHandler}/>
              </Form.Group>
              <Button type="submit">Login</Button>
            </Form>
            </Modal.Body>
          </Modal.Dialog>
        </div>
        </>
    )
};



export default AdminLogin;