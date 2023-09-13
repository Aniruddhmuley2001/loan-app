import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";

export default function ViewItems() {
    const baseURL = "http://localhost:7000/allItems";
    const [items, setItemDetails] = useState([]);
  
    const setItemData = () => {
      axios.get(baseURL ).then((response) => {
        setItemDetails(response.data);
      }).catch(error => {
        alert("Error Ocurred while loading data:" + error);
      });
    }
  
    useEffect(() => {
      setItemData();
    }, []);
  
    return (
      <div class="card-body">
        <br>
        </br>
  
  
        <br></br>
        <div className="col-md-6">
          <h4>Items List</h4>
  
          <div class="container">
            <div class="row">
              <div class="col-12">
                <table class="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>Item ID</th>
                      <th>Item Description</th>
                      <th>Item Value</th>
                      <th>Item Make</th>
                      {/* <th scope="col">Action</th> */}
  
                    </tr>
                  </thead>
                  <tbody>
  
                    {
                      
                      items.map((item, index) => (
  
                        <tr>
                          <th scope="row">{item.itemId}</th>
  
                          <td>{item.itemDescription}</td>
                          <td>{item.itemValue}</td>
                          <td>{item.itemMake}</td>
  
  
                          {/* <td >
      <Link to={"/edit/" + loan.regno}>Edit
                          </Link>
                        </td> */}
                            
  
  
                            
  
                          
                        </tr>
  
                      ))
                    }
  
                  </tbody>
                </table>
  
  
                {/* <select >
                {
                items.map((loan, index) => (
                <option key={loan.loanId} value={loan.loanId}>{loan.loanType}</option>
                     
                    
                  ))
                    }
                </select> */}
  
              </div>
            </div>
          </div>
          
        </div>
  
      </div>
  
    );
}
