import { useState,React } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';

const UserLogin = () => {

    const baseURL = "http://localhost:7000/loginUser";
    const navigate = useNavigate();
    const [id, setId] = useState("")
    const [password, setPassword] = useState("");

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
                // alert("Employee "+ id +" logged in!");
                toast.success('Successfully logged In!',{autoClose:1500});
                sessionStorage.setItem("emp_id", id);
                navigate("/user/" + id )
            }
            else {
                // alert('Invalid credentials')
                toast.error('Invalid credentials',{autoClose:3000});
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
              <Modal.Title>Login to your profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={submitActionHandler}>
              <Form.Group className="mb-3" controlId="formBasicID">
                <Form.Label>Employee ID</Form.Label>
                <Form.Control type="text" placeholder="Enter ID" value={id} onChange={idChangeHandler} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={passwordChangeHandler}/>
              </Form.Group>
              <Button type="submit">Login</Button>
            </Form>

            <hr></hr>

            <div className="leftBlock">
                <div className="center">
                  <button onClick={() => navigate("/user/register")} type="button" class="btn btn-secondary zoom">Sign Up</button>
                
                </div>

                {/* <div className="vl "></div> */}

                <div className="center">
                <button onClick={() => navigate("/admin/login")} type="button" class="btn btn-info zoom">Admin Login</button>
                </div>
              </div>
            
           
            </Modal.Body>
          </Modal.Dialog>
          </div>
        </>
    )
};



export default UserLogin;