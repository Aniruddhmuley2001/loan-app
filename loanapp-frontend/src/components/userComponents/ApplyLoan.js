import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


const ApplyLoan = () => {
    const navigate = useNavigate();
    const itemCategoryURL = "http://localhost:7000/allItemCategories";
    // const itemMakeURL = "http://localhost:7000/allItemMakes";
    // const applyLoanURL = "http://localhost:7000/applyLoan";

    const empId = sessionStorage.getItem("emp_id");

    if (empId === null) {
        navigate("/login");
    }

    const [category, setCategory] = useState("");
    const [itemMake, setItemMake] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [value, setValue] = useState(0);
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
            console.log(json)
            setMakeArr(json);
            setItemMake(json[0])
        };
        if (category)
            data();
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
        if (category && itemMake)
            data();
    }, [category, itemMake]);

    useEffect(() => {
        const data = async () => {
            const response = await fetch(
                `http://localhost:7000/${category}/${itemMake}/${itemDescription}/getItem`

            );

            //const json1=response.text();
            //const json2=json1 ? JSON.parse(json1) : {};
            //const json=JSON.parse(json1);
            const json = await response.json();
            console.log(json)
            setValue(json.itemValue);
        };
        if (category && itemMake && itemDescription)
            data();
    }, [category, itemMake, itemDescription]);



    const itemCategoryChangeHandler = (event) => {
        setCategory(event.target.value);
        // console.log(category);
    }

    const itemDescriptionChangeHandler = (event) => {
        setItemDescription(event.target.value);
    }

    const itemValueChangeHandler = (event) => {
        setValue(event.target.value);
    }

    const itemMakeChangeHandler = (event) => {
        setItemMake(event.target.value);
    }



    function submitHandler() {
        const data = async () => {
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
                        itemValue: value,
                    }),
                }
            );
            const json = await response.json();
            if (response.status === 200) {
                alert("Loan applied Successfuly.")
            } else {
                alert("Failed to apply for loan")
            }
        };
        data();
    }


    return (
        <>
            <div>
                <p>Select Product and Apply for Loan</p>
            </div>
            <form onSubmit={submitHandler}>

                <p>
                    <label>Employee Id: <input type="text" value={empId} disabled></input></label>
                </p>

                <p>
                    <label>Item Category:
                        <select onChange={itemCategoryChangeHandler} >
                            {
                                categories.map((category, index) => (
                                    <option key={index} value={category} >{category}</option>))
                            }
                        </select>
                    </label>
                </p>

                <p>
                    <label>Item Make:
                        <select onChange={itemMakeChangeHandler}>
                            {
                                makeArr.map((make, index) => (
                                    <option key={index} value={make} >{make}</option>))
                            }
                        </select>
                    </label>
                </p>

                <p>
                    <label>Item Description:
                        <select onChange={itemDescriptionChangeHandler}>
                            {
                                description.map((desc, index) => (
                                    <option key={index} value={desc} >{desc}</option>))
                            }
                        </select>
                    </label>
                </p>


                <p>
                    <label>
                        Item Value: <input type="number" value={value} onChange={itemValueChangeHandler}></input>
                    </label>
                </p>



                <button type="submit">Apply Loan</button>
            </form>
        </>
    )
};


export default ApplyLoan;