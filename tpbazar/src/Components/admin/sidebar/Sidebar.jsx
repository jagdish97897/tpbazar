import React, { useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link, Outlet, useNavigate } from 'react-router-dom'

import './sidebar.css'
function Sidebar() {

  const sidebarStyles = {
    backgroundColor: '#44494F', 
    
  };
  return (
<>
<div>
  <br/>
  <br/>
        <div className="container-fluid  position" >
          <div className="row flex-nowrap" >
            <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0" style={sidebarStyles}>
              <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                  <br/>
                  <li>
                    <Link to="/" data-bs-toggle="collapse" className="nav-link text-white px-0 align-middle">
                      <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Dashboard</span> </Link>
                  </li>
                  <li>
                    <Link to="/users" className="nav-link px-0 align-middle text-white">
                      <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Users</span> </Link>
                  </li>
                  <li>
                    <Link to="/role" className="nav-link px-0 align-middle text-white">
                      <i className="fs-4 bi-person"></i> <span className="ms-1 d-none d-sm-inline">Role</span> </Link>
                  </li>

                  {/* <li>
                    <Link to="/asignrole" className="nav-link px-0 align-middle text-white">
                      <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">AsignRole</span> </Link>
                  </li> */}
                  <li>
                    <Link to="/category" className="nav-link px-0 align-middle text-white">
                      <i className="fs-4 bi bi-tag"></i> <span className="ms-1 d-none d-sm-inline">Category</span> </Link>
                  </li>

                  <li>
                    <Link to="/subcategory" className="nav-link px-0 align-middle text-white">
                      <i className="fs-4 bi bi-tags"></i> <span className="ms-1 d-none d-sm-inline">Sub Category</span> </Link>
                  </li>
                  <li>
                    <Link to="/retailer" className="nav-link px-0 align-middle text-white">
                      <i className="fs-4 bi-shop"></i> <span className="ms-1 d-none d-sm-inline">Retailer</span> </Link>
                  </li>
                  {/* <li>
                    <Link to="/" className="nav-link px-0 align-middle text-white">
                      <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Customer</span> </Link>
                  </li> */}
                  <li>
                    <Link to="/offer" className="nav-link px-0 align-middle text-white">
                      <i className="fs-4 bi-cart"></i> <span className="ms-1 d-none d-sm-inline">Offers</span> </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col p-0 m-0 custom2-bg">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
</>
  )
}

export default Sidebar
