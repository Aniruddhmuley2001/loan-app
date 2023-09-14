import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


const ApplyLoan = () => {
    const baseURL = "http://localhost:7000/allItemCategories";
    
    const [items, setItems] = useState([]);
    const [itemsCategory, setItemCategory] = useState([]);
    const [itemDescription, setItemDescription] = useState([]);
    const [itemValue, setItemValue] = useState([]);
    const [itemMake, setItemMake] = useState([]);

    const setItemsData = () => {
        axios.get(baseURL ).then((response) => {
            setItems(response.data);
            console.log(items)
        }).catch(error => {
            alert("Error Ocurred while loading data:" + error);
        });
    }
   

    const itemCategoryChangeHandler = (event) => {
        setItems(event.target.value);
    }

    const itemDescriptionChangeHandler = (event) => {
        setItemDescription(event.target.value);
    }

    const itemValueChangeHandler = (event) => {
        setItemValue(event.target.value);
    }

    const itemMakeChangeHandler = (event) => {
        setItemMake(event.target.value);
    }



    // const submitActionHandler = (event) => {
    //     event.preventDefault();
    //     axios
    //       .post(baseURL, {
    //         itemCategory: itemCategory,
    //         itemDescription: itemDescription,
    //         itemValue: itemValue,
    //         itemMake:itemMake
           
    //       })
    //       .then((response) => {
    //         // alert(response.data.fullname);
    //         alert("Loan Applied successfully");
    //         //navigate("/account");
    //       }).catch(error => {
    //         alert("error==="+error);
    //       });
    
    //   };

    useEffect(() => {
        setItemsData();
      }, []);

    return (
        <>
        <div>
            <h2>Loan Management Application</h2>
        </div>
        <div>
            <p>Select Product and Apply for Loan</p>
            </div>
        <form >

            <p>
            <label>Employee Id: <input type="text" value={sessionStorage.getItem("emp_id")} disabled></input></label>
            </p>

            <p> 
                <label>Item Category:  
                    <select >
                    {
                    items.map((item, index) => (
                    <option key={index} value={item} onChange={itemCategoryChangeHandler}>{item}</option> 
                        ))
                    }
                    </select>
              </label>
            </p>

            <p>
                <label>
                Item Description: <input type="text" value={itemDescription} onChange={itemDescriptionChangeHandler}></input>
                </label>
            </p>

            <p>
                <label>
                Item Make: <input type="text" value={itemMake} onChange={itemMakeChangeHandler}></input>
                </label>
            </p>

            <p>
                <label>
                Item Value: <input type="number" value={itemValue} onChange={itemValueChangeHandler} disabled></input>
                </label>
            </p>

            

            <button type="submit">Apply Loan</button>
        </form>
        </>
    )
};


export default ApplyLoan;