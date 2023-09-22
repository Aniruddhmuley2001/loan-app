import React from 'react'
import { Outlet } from 'react-router-dom';

export default function UserDashboard() {
    const empId = sessionStorage.getItem("emp_id")
    return (
        <div>
            <h2>Welcome {empId}</h2>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    
                <div className="container-fluid">
                    <a className="navbar-brand" href={`/user/${empId}/viewLoans`}>View Loans</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    {/* <span className="navbar-toggler-icon"></span> */}
                    </button>
                </div>

                <div className="container-fluid">
                    <a className="navbar-brand" href={`/user/${empId}/viewItems`}>Items Purchased</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    {/* <span className="navbar-toggler-icon"></span> */}
                    </button>
                </div>

                <div className="container-fluid">
                    <a className="navbar-brand" href={`/user/${empId}/applyLoan`}>Apply Loan</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    {/* <span className="navbar-toggler-icon"></span> */}
                    </button>
                </div>

                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Logout</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                </div>

            </nav>

            <Outlet/>
        </div>
    )
}