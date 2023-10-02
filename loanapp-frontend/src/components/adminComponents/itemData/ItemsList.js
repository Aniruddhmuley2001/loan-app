import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function ItemsList() {
  const navigate = useNavigate();
  const itemDataBaseURL = "http://localhost:7000/fetchItems";
  const deleteItemDataBaseURL = "http://localhost:7000/deleteItem";
  const [items, setItemDetails] = useState([]);

  const setItemsData = () => {
    axios.get(itemDataBaseURL).then((response) => {
      setItemDetails(response.data);
    }).catch(error => {
      toast.error("Error Occured while loading Item Data: ", { autoClose: 1500 });
      console.log(error);
    })
  }

  const deleteEntry = (id) => {
    axios.delete(deleteItemDataBaseURL + "/" + id).then((response) => {
      toast.success("Item " + id + " deleted successfully!", { autoClose: 1500 });
      navigate("./delete")
    }).catch(error => {
      toast.error("Error Occured while deleting item ", { autoClose: 1500 });
      console.log(error)
    })
  }

  useEffect(() => {
    setItemsData();
  }, []);

  if (items.length === 0) {
    return (
      <div>
        <h3 className='white-text'>Item Master Data</h3>
        <br></br>
        <Button onClick={() => navigate("./add")}>Add loan</Button>

        <Outlet />

        <br></br>
        <br></br>

        <div className='container'>
          <Container className="empty-list-container">
            <Row>
              <Col md={8} className="mx-auto text-center">
              <h3 className="display-4">No data to Display</h3>
                <br></br>
                <p className="lead">Try adding by clicking on the above button</p>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    )
  }
  else {
    return (
      <div>
        <h3 className='white-text'>Item Master Data</h3>
        <br />
        <Button onClick={() => navigate("./add")}>Add item</Button>
        <Outlet />

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
                          {<Link onClick={() => deleteEntry(item.itemId)}>Delete</Link>}
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
