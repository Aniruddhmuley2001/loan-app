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
        <form onSubmit={submitActionHandler}>
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
        </form>
        </>
    )
}
