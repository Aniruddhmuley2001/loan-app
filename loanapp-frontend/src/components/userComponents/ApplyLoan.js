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
                await setCategory(json[0]);
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
            // console.log(json)
            setMakeArr(json);
            await setItemMake(json[0])
        };
        if (category){
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
            await setItemDescription(json[0]);
        };
        if (category && itemMake){
            data();
        }

    }, [category, itemMake]);
    const getItemValue = async () => {
        // alert(itemDescription);
        const response = await fetch(
            `http://localhost:7000/${category}/${itemMake}/${itemDescription}/getItem`

        ).then((response)=>response.json());
      //  alert(response);
        await setValue(response);
        // console.log(response)

};
    useEffect(() => {
        // console.log("Inside 4th useeffect");
        const data = async () => {
            const response = await fetch(
                `http://localhost:7000/${category}/${itemMake}/${itemDescription}/getItem`

            );
            
    
        const parsedJson = await response.json();
        console.log(parsedJson);
        setItem(parsedJson[0]);
        // setValue(item?.itemValue);
        // console.log(item)
        };

        if (category && itemMake && itemDescription)
            getItemValue();
    }, [category, itemMake, itemDescription]);



    const itemCategoryChangeHandler = async(event) => {
         setCategory(event.target.value);
        // console.log(category);
        await getItemValue();
    }
    const itemMakeChangeHandler = async (event) => {
        setItemMake(event.target.value);
        await getItemValue();
    }

    const itemDescriptionChangeHandler = (event) => {
        setItemDescription(event.target.value);
        getItemValue();
    }

    // const itemValueChangeHandler = (event) => {
    //     setValue(event.target.value);
    // }




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
            const json = await response.json();
            console.log(json);
            if (response.status === 200) {
                alert("Loan applied Successfuly.")
            } else {
                alert("Failed to apply for loan")
            }
        };
        submitLoan();
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


                <div>
                    {/* <label>
                        Item Value: <input type="number" value={value} onChange={itemValueChangeHandler}></input>
                    </label> */}
                    <div>Item value: {item?.itemValue}</div>
                </div>



                <button type="submit">Apply Loan</button>
            </form>
        </>
    )
};


export default ApplyLoan;