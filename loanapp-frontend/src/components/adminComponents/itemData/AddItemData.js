import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function AddItemData() {
    const baseURL = "http://localhost:7000/saveItem";
    const navigate = useNavigate();
    const adminId = sessionStorage.getItem("emp_id");
    const [itemId, setItemId] = useState("")
    const [itemStatus, setItemStatus] = useState("")
    const [itemDescription, setItemDescription] = useState("")
    const [itemMake, setItemMake] = useState("")
    const [itemCategory, setItemCategory] = useState("")
    const [itemValue, setItemValue] = useState("")

    const itemIdChangeHandler = (event) => {
        setItemId(event.target.value);
    }

    const itemStatusChangeHandler = (event) => {
        setItemStatus(event.target.value);
    }

    const itemDescriptionChangeHandler = (event) => {
        setItemDescription(event.target.value);
    }

    const itemMakeChangeHandler = (event) => {
        setItemMake(event.target.value);
    }

    const itemValueChangeHandler = (event) => {
        setItemValue(event.target.value);
    }

    const itemCategoryChangeHandler = (event) => {
        setItemCategory(event.target.value);
    }

    const submitActionHandler = (event) => {
        event.preventDefault();
        axios
          .post(baseURL, {
            itemId: itemId,
            itemStatus: itemStatus,
            itemDescription: itemDescription,
            itemMake: itemMake,
            itemCategory: itemCategory,
            itemValue: itemValue
          })
          .then((response) => {
            alert("Item "+ itemId +" added!");
            navigate("/admin/" + adminId + "/items");
          }).catch(error => {
            alert("error==="+error);
          });
    
      };

    return (
        <>
        <div className="modal show" style={{ display: 'block', position: 'initial' }}>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Add Item data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={submitActionHandler}>

              <Form.Group className="mb-3" controlId="formBasicID">
                <Form.Label>Item ID</Form.Label>
                <Form.Control type="text" placeholder="Enter ID: " value={itemId} onChange={itemIdChangeHandler} />
              </Form.Group>
        
              <Form.Group className="mb-3" controlId="formBasicStatus">
                <Form.Label>Item Status: </Form.Label>
                <Form.Control type="text" placeholder="Item Status" value={itemStatus} onChange={itemStatusChangeHandler}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicItemCategory">
                <Form.Label>Item Category: </Form.Label>
                <Form.Control type="text" placeholder="Eg./ Furniture" value={itemCategory} onChange={itemCategoryChangeHandler}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicItemMake">
                <Form.Label>Item Make: </Form.Label>
                <Form.Control type="text" placeholder="Wooden" value={itemMake} onChange={itemMakeChangeHandler}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicItemDescrip">
                <Form.Label>Item Description: </Form.Label>
                <Form.Control type="text" placeholder="Depatment" value={itemDescription} onChange={itemDescriptionChangeHandler}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicDob">
                <Form.Label>Item Value: </Form.Label>
                <Form.Control type="number" value={itemValue} onChange={itemValueChangeHandler}/>
              </Form.Group>
              
              <Button type="submit">Register</Button>
            </Form>
            </Modal.Body>
          </Modal.Dialog>
        </div>
        {/* <form onSubmit={submitActionHandler}>
            <p>
            <label>Item Id: <input type="text" value={itemId} onChange={itemIdChangeHandler}></input></label>
            </p>

            <p>
            <label>Item Status: <input type="text" value={itemStatus} onChange={itemStatusChangeHandler}></input></label>
            </p>

            <p>
            <label>Item Category: <input type="text" value={itemCategory} onChange={itemCategoryChangeHandler}></input></label>
            </p>

            <p>
            <label>Item Make: <input type="text" value={itemMake} onChange={itemMakeChangeHandler}></input></label>
            </p>

            <p>
            <label>Item Description: <input type="text" value={itemDescription} onChange={itemDescriptionChangeHandler}></input></label>
            </p>

            <p>
            <label>Item Value: <input type="number" value={itemValue} onChange={itemValueChangeHandler}></input></label>
            </p>

            <button type="submit">Register</button>
        </form> */}
        </>
    )
}
