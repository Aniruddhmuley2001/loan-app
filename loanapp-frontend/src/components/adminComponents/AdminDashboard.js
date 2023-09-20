import React from 'react'
import { Outlet } from 'react-router-dom';

export default function AdminDashboard() {
    const empId = sessionStorage.getItem("emp_id")
  return (
    <div>
        <h2>Welcome admin {empId}</h2>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                
            <div className="container-fluid">
                <a className="navbar-brand" href={`/admin/${empId}/customers`}>Customer Data Management</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                {/* <span className="navbar-toggler-icon"></span> */}
                </button>
            </div>

            <div className="container-fluid">
                <a className="navbar-brand" href={`/admin/${empId}/loans`}>Loan Card Management</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                {/* <span className="navbar-toggler-icon"></span> */}
                </button>
            </div>

            <div className="container-fluid">
                <a className="navbar-brand" href={`/admin/${empId}/items`}>Item Master Data</a>
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