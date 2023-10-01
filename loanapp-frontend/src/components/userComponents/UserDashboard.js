import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
export default function UserDashboard() {
    const empId = sessionStorage.getItem("emp_id");
    const { id } = useParams();
    const navigate = useNavigate();

    const logout = () => {
        sessionStorage.removeItem("emp_id");
        toast.info("Logged Out!");
        navigate("/")
    }
    useEffect(() => {
        if (id !== empId) {

            toast.error("You have to log in to the Employee's account to continue");
            navigate("/user/login");
        }
    }, [id, empId, navigate]);

    return (
        <div>

            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">

                <div className="container-fluid">
                    <a className="navbar-brand" href={`/user/${empId}/viewLoans`}>View Loans</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    </button>
                </div>

                <div className="container-fluid">
                    <a className="navbar-brand" href={`/user/${empId}/viewItems`}>Items Purchased</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    </button>
                </div>

                <div className="container-fluid">
                    <a className="navbar-brand" href={`/user/${empId}/applyLoan`}>Apply Loan</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    </button>
                </div>

                <div className="container-fluid">
                    <a className="navbar-brand" onClick={logout}>Logout</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>

                <div className="vl"></div>
                <div className="container-fluid"><a className="navbar-brand">Welcome User {empId}</a></div>


            </nav>

            <br />

            <Outlet />
        </div>
    );


} 