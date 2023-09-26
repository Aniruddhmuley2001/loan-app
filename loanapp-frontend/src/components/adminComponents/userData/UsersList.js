import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function UsersList() {
    const navigate = useNavigate();
    const userDataBaseURL = "http://localhost:7000/fetchUsers";
    const deleteUserDataBaseURL = "http://localhost:7000/deleteUser/";
    const [users, setUserDetails] = useState([]);
    
    const setUsersData = () => {
        axios.get(userDataBaseURL).then((response) => {
          setUserDetails(response.data);
        }).catch(error => {
          alert("Error Occured while loaing User Data: " + error);
        })
    }

    const deleteEntry = (id) => {
      axios.delete(deleteUserDataBaseURL+id, {
        headers: {
          "Access-Control-Allow-Headers": "*", // this will allow all CORS requests
          "Access-Control-Allow-Methods": 'OPTIONS,POST,GET,DELETE,PUT', // this states the allowed methods
          "Content-Type": "application/json" // this shows the expected content type
        }
      }).then((response) => {
        alert("User deleted!");
        navigate("./delete")
      }).catch(error => {
        alert("Error Occured while deleting User: " + error);
      })
    }

    useEffect(() => {
        setUsersData();
    }, []);

    if(users.length === 0) {
      return (
        <div>
          <h3>Customer Master Data</h3>
          <button onClick={() => navigate("./add")}>Add loan</button>

          <Outlet/>

          <br></br>
          <br></br>

          <div className='container'>
            <p>No data to display</p>
          </div>
        </div>
      )
    }
    else {
      return (
          <div>
              <h3>Customer Master Data</h3>
              <button onClick={() => navigate("./add")}>Add customer</button>
  
              <Outlet/>
  
              <br></br>
              <br></br>
  
              <div className="container">
              <div className="row">
                <div className="col-12">
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>Employee ID</th>
                        <th>Employee Name</th>
                        <th>Designation</th>
                        <th>Department</th>
                        <th>Gender</th>
                        <th>Date Of Birth</th>
                        <th>Date of Joining</th>
                        <th>Operations</th>
    
                      </tr>
                    </thead>
                    <tbody>
    
                      {
                        
                        users.map((user, index) => (
    
                          <tr>
                            <td scope="row">{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.designation}</td>
                            <td>{user.department}</td>
                            <td>{user.gender}</td>
                            <td>{user.dob}</td>
                            <td>{user.doj}</td>
    
    
                            <td > 
                              <Link to={"./" + user.id}>Edit</Link>, 
                              {<Link onClick={() => deleteEntry(user.id)}>Delete</Link>  }
                            </td>
                            
                          </tr>
    
                        ))
                      }
    
                    </tbody>
                  </table>
    
                </div>
              </div>
            </div>
          </div>
      )
    }

}
