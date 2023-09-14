import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

export default function UserDashboard() {
    const empId = sessionStorage.getItem("emp_id")
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    
            <div className="container-fluid">
                <a className="navbar-brand">{empId}</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                </button>
            </div>

            {/* <div className="container-fluid">
            <p>{sessionStorage.getItem("emp_id")}</p>
            </div> */}
                
            <div className="container-fluid">
                <a className="navbar-brand" href={`./viewLoans`}>View Loan</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                {/* <span className="navbar-toggler-icon"></span> */}
                </button>
            </div>

            <div className="container-fluid">
                <a className="navbar-brand" href={`./viewItems`}>Items Purchased</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                {/* <span className="navbar-toggler-icon"></span> */}
                </button>
            </div>

            <div className="container-fluid">
                <a className="navbar-brand" href={`./applyLoan`}>Apply Loan</a>
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
    </div>
  )
}