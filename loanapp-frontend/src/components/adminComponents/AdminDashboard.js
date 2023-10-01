import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

export default function AdminDashboard() {
    const empId = sessionStorage.getItem("emp_id");
    const navigate = useNavigate();
    const { id } = useParams();
    const logout = () => {
        sessionStorage.removeItem("emp_id");
        navigate("/")
    }
    useEffect(() => {
        if (id !== empId) {

            toast.error("You have to log in to the Admin's account to continue");
            navigate("/admin/login");
        }
    }, [id, empId, navigate]);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">

                <div className="container-fluid">
                    <a className="navbar-brand" href={`/admin/${empId}/customers`}>Customer Data Management</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    </button>
                </div>

                <div className="container-fluid">
                    <a className="navbar-brand" href={`/admin/${empId}/loans`}>Loan Card Management</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    </button>
                </div>

                <div className="container-fluid">
                    <a className="navbar-brand" href={`/admin/${empId}/items`}>Item Master Data</a>
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
                <div className="container-fluid"><a className="navbar-brand">Welcome Admin {empId}</a></div>
            </nav>

            <br />

            <Outlet />
        </div>
    )
}