import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';


const ApplyLoan = () => {
    const navigate = useNavigate();
    const itemCategoryURL = "http://localhost:7000/allItemCategories";
    // const itemMakeURL = "http://localhost:7000/allItemMakes";
    // const applyLoanURL = "http://localhost:7000/applyLoan";

    const empId = sessionStorage.getItem("emp_id");
    
   

    const [category, setCategory] = useState("");
    const [itemMake, setItemMake] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [value, setValue] = useState(0);
    const [item, setItem] = useState([]);
    const [categories, setCategories] = useState([]);
    const [makeArr, setMakeArr] = useState([]);
    const [description, setDescription] = useState([]);

    useEffect(() => {
        const data = async () => {
            const response = await fetch(itemCategoryURL);
           
            const json = await response.json();
            if (response.status === 200) {
                setCategories(json);
                setCategory(json[0]);
            } else {
                setCategories([]);
            }
        };
        data();
    }, []);

    useEffect(() => {
        const data = async () => {
            const response = await fetch(`http://localhost:7000/${category}/getAllMake`);
            const json = await response.json();
            setMakeArr(json);
            setItemMake(json[0])
        };
        if (category) {
            data();
        }
    }, [category]);

    useEffect(() => {
        const data = async () => {
            const response = await fetch(
                `http://localhost:7000/${category}/${itemMake}/getAllDescriptions`
            );
            const json = await response.json();
            setDescription(json);
            setItemDescription(json[0]);
        };
        if (category && itemMake) {
            data();
        }

    }, [category, itemMake]);

    useEffect(() => {
        const data = async () => {
            const response = await fetch(
                `http://localhost:7000/${category}/${itemMake}/${itemDescription}/getItem`

            );


            const parsedJson = await response.json();
            setItem(parsedJson[0]);
        };

        if (category && itemMake && itemDescription)
            data();
    }, [category, itemMake, itemDescription]);



    const itemCategoryChangeHandler = async (event) => {
        setCategory(event.target.value);
        // await getItemValue();
    }
    const itemMakeChangeHandler = async (event) => {
        setItemMake(event.target.value);
        // await getItemValue();
    }

    const itemDescriptionChangeHandler = (event) => {
        setItemDescription(event.target.value);
        // getItemValue();
    }

    function submitHandler() { 

        const submitLoan = async () => {
            const response = await fetch(
                `http://localhost:7000/applyLoan`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: empId,
                        itemCategory: category,
                        itemDescription: itemDescription,
                        itemMake: itemMake,
                        itemValue: item?.itemValue,
                    }),
                }
            );
            console.log("dkmlcsd")
            const json = await response.json();
            console.log(response);
            console.log("dkmlcsd")
            console.log(json);
            if (response.status === 200) {
                toast.success('Loan Applied Successfully!', { autoClose: 1500 });
            } else {
                toast.error('Error applying for loan', { autoClose: 1500 });
            }
        };
        submitLoan();
    }


    return (
        <>
            <div className="modal show" style={{ display: 'block', position: 'initial' }}>
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Select Product and Apply for Loan</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={submitHandler}>

                            <Form.Group className="mb-3" controlId="formBasicID">
                                <Form.Label>Employee ID: </Form.Label>
                                <Form.Control type="text" placeholder="Enter ID" value={empId} disabled />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicCategory">
                                <Form.Label>Item Category:
                                
                                    <Form.Select onChange={itemCategoryChangeHandler} >
                                        {
                                            categories.map((category, index) => (
                                                <option key={index} value={category} >{category}</option>))
                                        }
                                    </Form.Select>
                                    

                                </Form.Label>

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicMake">
                                <Form.Label>Item Make:
                                    <Form.Select onChange={itemMakeChangeHandler} >
                                        {
                                            makeArr.map((make, index) => (
                                                <option key={index} value={make} >{make}</option>))
                                        }
                                    </Form.Select>

                                </Form.Label>

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicDescription">
                                <Form.Label>Item Description:
                                    <Form.Select onChange={itemDescriptionChangeHandler} >
                                        {
                                            description.map((desc, index) => (
                                                <option key={index} value={desc} >{desc}</option>))
                                        }
                                    </Form.Select>

                                </Form.Label>

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicValue">
                                <Form.Label>Item value: </Form.Label>
                                <Form.Control type="number" placeholder="Item value" value={item?.itemValue} />
                                {/* <div>Item value: {item?.itemValue}</div>                */}
                            </Form.Group>

                            <Button type="submit">Apply Loan</Button>

                        </Form>

                    </Modal.Body>
                </Modal.Dialog>
            </div>
        </>
    )
};


export default ApplyLoan;