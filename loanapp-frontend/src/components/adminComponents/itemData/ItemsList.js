import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


export default function ItemsList() {
    const navigate = useNavigate();
    const itemDataBaseURL = "http://localhost:7000/fetchItems";
    const deleteItemDataBaseURL = "http://localhost:7000/deleteItem";
    const [items, setItemDetails] = useState([]);
    
    const setItemsData = () => {
        axios.get(itemDataBaseURL).then((response) => {
          setItemDetails(response.data);
        }).catch(error => {
          alert("Error Occured while loaing Item Data: " + error);
        })
    }

    const deleteEntry = (id) => {
      axios.delete(deleteItemDataBaseURL+"/"+id).then((response) => {
        alert("Item deleted!");
        navigate("./delete")
      }).catch(error => {
        alert("Error Occured while deleting item: " + error);
      })
    }

    useEffect(() => {
        setItemsData();
    }, []);

    if(items.length === 0) {
      return (
        <div>
          <h3 style={{color:'white'}}>Item Master Data</h3>
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
              <h3 style={{color:'white'}}>Item Master Data</h3>
              <Button  onClick={() => navigate("./add")}>Add item</Button>
  
              <Outlet/>
  
              <br></br>
              <br></br>
  
              <div className="container">
              <div className="row">
                <div className="col-12">
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>Item ID</th>
                        <th>Description</th>
                        <th>Issue Status</th>
                        <th>Item Make</th>
                        <th>Item Category</th>
                        <th>Item Valuation</th>
                        <th>Operations</th>
    
                      </tr>
                    </thead>
                    <tbody>
    
                      {
                        
                        items.map((item, index) => (
    
                          <tr>
                            <td scope="row">{item.itemId}</td>
                            <td>{item.itemDescription}</td>
                            <td>{item.issueStatus ? "Y" : "N"}</td>
                            <td>{item.itemMake}</td>
                            <td>{item.itemCategory}</td>
                            <td>{item.itemValue}</td>  
    
                            <td > 
                              <Link to={"./" + item.itemId}>Edit</Link>, 
                              {<Link onClick={() => deleteEntry(item.itemId)}>Delete</Link>  }
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
