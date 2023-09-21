import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

export default function DeleteData(props) {
    const navigate = useNavigate();
    const adminId = sessionStorage.getItem("emp_id");
    const redirectToList = () => {
        navigate("/admin/"+adminId+"/"+props.path);
    }

    useEffect(() => {
        redirectToList();
    }, []);

  return (
    <div></div>
  )
}
