// import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';



const ApplyLoan = () => {
  const itemCategoryURL = "http://localhost:7000/allItemCategories";
  const itemMakeURL = "http://localhost:7000/allItemMakes";
  const applyLoanURL = "http://localhost:7000/applyLoan";

  const empId = sessionStorage.getItem("emp_id");

  const [itemsCategory, setItemsCategory] = useState([]);
  const [itemCategory, setItemCategory] = useState("");
  const [itemDescription, setItemDescription] = useState([]);
  const [itemValue, setItemValue] = useState([]);
  const [itemsMake, setItemsMake] = useState([]);
  const [itemMake, setItemMake] = useState("");

  const setItemCategoryData = () => {
    axios.get(itemCategoryURL).then((response) => {
      setItemsCategory(response.data);
    }).catch(error => {
      alert("Error Ocurred while loading data:" + error);
    });
  }

  const setItemMakeData = () => {
    axios.get(itemMakeURL).then((response) => {
      setItemsMake(response.data);
    }).catch(error => {
      alert("Error Ocurred while loading data:" + error);
    });
  }


  const itemCategoryChangeHandler = (event) => {
    setItemCategory(event.target.value);
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



  const submitActionHandler = (event) => {
    event.preventDefault();
    axios
      .post(applyLoanURL, {
        id: empId,
        itemCategory: itemCategory,
        itemDescription: itemDescription,
        itemValue: itemValue,
        itemMake: itemMake
      })
      .then((response) => {
        // alert(response.data.fullname);
        alert("Loan Applied successfully");
        // navigate("/account");
      }).catch(error => {
        alert("error===" + error);
      });

  };

  useEffect(() => {
    setItemCategoryData();
    setItemMakeData();
  }, []);

  return (
    <>
      <div className="modal show" style={{ display: 'block', position: 'initial' }}>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Select Product and Apply for Loan</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={submitActionHandler}>
              <Form.Group className="mb-3" controlId="formBasicID">
                <Form.Label>Employee ID</Form.Label>
                <Form.Control type="text" value={empId} disabled />
              </Form.Group>
              <Form.Group>
                <Form.Label>Item Category</Form.Label>
                <Form.Select aria-label="Item Category">
                  {
                    itemsCategory.map((item, index) => (
                      <option key={index} value={item} onChange={itemCategoryChangeHandler}>{item}</option>))
                  }
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicDesc">
                <Form.Label>Item Description</Form.Label>
                <Form.Control type="text" placeholder="Description" value={itemDescription} onChange={itemDescriptionChangeHandler} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicValue">
                <Form.Label>Item Value</Form.Label>
                <Form.Control type="text" placeholder="val" value={itemValue} onChange={itemValueChangeHandler} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Item Make</Form.Label>
                <Form.Select aria-label="Item Make">
                  {
                    itemsMake.map((item, index) => (
                      <option key={index} value={item} onChange={itemMakeChangeHandler}>{item}</option>))
                  }
                </Form.Select>
              </Form.Group>

              <Button type="submit">Login</Button>
            </Form>
          </Modal.Body>
        </Modal.Dialog>
      </div>
      <form onSubmit={submitActionHandler}>

        {/* <p> 
                <label>Item Category:  
                    <select >
                    {
                        itemsCategory.map((item, index) => (
                        <option key={index} value={item} onChange={itemCategoryChangeHandler}>{item}</option> ))
                    }
                    </select>
              </label>
            </p> */}

        {/* <p>
                <label>
                Item Description: <input type="text" value={itemDescription} onChange={itemDescriptionChangeHandler}></input>
                </label>
            </p> */}

        {/* <p> 
                <label>Item Make:  
                    <select >
                    {
                        itemsMake.map((item, index) => (
                        <option key={index} value={item} onChange={itemMakeChangeHandler}>{item}</option> ))
                    }
                    </select>
              </label>
            </p> */}

        {/* <p>
                <label>
                Item Value: <input type="number" value={itemValue} onChange={itemValueChangeHandler}></input>
                </label>
            </p> */}



        {/* <button type="submit">Apply Loan</button> */}
      </form>
    </>
  )
};


export default ApplyLoan;