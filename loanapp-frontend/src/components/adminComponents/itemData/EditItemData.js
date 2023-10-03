import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { Modal, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function EditItemData() {
  let params = useParams();
  const getItemBaseURL = "http://localhost:7000/fetchItemDetails/" + params.itemId;
  const updateItemBaseURL = "http://localhost:7000/updateItem";

  const navigate = useNavigate();
  const adminId = sessionStorage.getItem("emp_id");

  const [itemId, setItemId] = useState("")
  const [itemIssueStatus, setItemStatus] = useState("")
  const [itemDescription, setItemDescription] = useState("")
  const [itemMake, setItemMake] = useState("")
  const [itemCategory, setItemCategory] = useState("")
  const [itemValue, setItemValue] = useState("")

  const setItemData = () => {
    axios.get(getItemBaseURL).then((response) => {
      let item = response.data;
      setItemId(item.itemId);
      setItemStatus(item.issueStatus===true ? "Y" : "N");
      setItemDescription(item.itemDescription);
      setItemMake(item.itemMake);
      setItemCategory(item.itemCategory);
      setItemValue(item.itemValue);
    }).catch(error => {
      toast.error("Error Ocurred while loading items data", {autoClose: 1500});
      console.log(error);
    });
  }

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

  useEffect(() => {
    setItemData();
  }, []);

  const submitActionHandler = (event) => {
    event.preventDefault();
    if (itemValue <= 0) {
      toast.error('Please enter valid value', {autoClose: 1500});
    }
    else {

      axios
        .put(updateItemBaseURL, {
          itemId: parseInt(itemId, 10),
          issueStatus: itemIssueStatus === 'Y' ? true : false,
          itemDescription: itemDescription,
          itemMake: itemMake,
          itemCategory: itemCategory,
          itemValue: itemValue
        }, {
          headers: {
            "Access-Control-Allow-Headers": "*", // this will allow all CORS requests
            "Access-Control-Allow-Methods": 'OPTIONS,POST,GET,DELETE,PUT', // this states the allowed methods
            "Content-Type": "application/json" // this shows the expected content type
          }
        })
        .then((response) => {
          toast.success("Item added successfully!", { autoClose: 1500 });
          navigate("/admin/" + adminId + "/items");
        }).catch(error => {
          toast.error("Facing issues in updating Item", { autoClose: 1500 });
          console.log(error)
        });
    }

  };

  return (
    <>
      <div className="modal show" style={{ display: 'block', position: 'initial' }}>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Edit Item data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={submitActionHandler}>

              <Form.Group className="mb-3" controlId="formBasicID">
                <Form.Label>Item ID</Form.Label>
                <Form.Control disabled type="text" placeholder="Enter ID: " value={itemId} onChange={itemIdChangeHandler} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicStatus">
                <Form.Label>Item Status: </Form.Label>
                <Form.Control type="text" placeholder="Item Status" value={itemIssueStatus} onChange={itemStatusChangeHandler} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicItemCategory">
                <Form.Label>Item Category: </Form.Label>
                <Form.Control required type="text" placeholder="Eg./ Furniture" value={itemCategory} onChange={itemCategoryChangeHandler} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicItemMake">
                <Form.Label>Item Make: </Form.Label>
                <Form.Control required type="text" placeholder="Wooden" value={itemMake} onChange={itemMakeChangeHandler} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicItemDescrip">
                <Form.Label>Item Description: </Form.Label>
                <Form.Control required type="text" placeholder="Depatment" value={itemDescription} onChange={itemDescriptionChangeHandler} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicDob">
                <Form.Label>Item Value: </Form.Label>
                <Form.Control required type="number" value={itemValue} onChange={itemValueChangeHandler} />
              </Form.Group>

              <Button type="submit">Save</Button>
            </Form>
          </Modal.Body>
        </Modal.Dialog>
      </div>
    </>
  )
}
