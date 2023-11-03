import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Role from './Components/admin/role/Role';
import AsignRole from './Components/admin/roleasign/AsignRole';
import Nav from './Components/admin/nav/Nav';
import Sidebar from './Components/admin/sidebar/Sidebar';
import Dashboard from './Components/admin/dashboard/Dashboard';
import Users from './Components/admin/users/Users';
import AddUser from './Components/admin/users/AddUser';
import Category from './Components/admin/category/Category';
import SubCategory from './Components/admin/subcategory/SubCategory';

import AddOffer from './Components/admin/offers/AddOffer';
import Offers from './Components/admin/offers/Offers';
import EditCategory from './Components/admin/category/EditCategory';
import EditSubCategory from './Components/admin/subcategory/EditSubCategory';
import EditRole from './Components/admin/role/EditRole';
import Retailer from './Components/admin/retailer/Retailer';

function App() {
  return (
    <>
     
      <BrowserRouter>
      <Nav />
        <Routes>  
          <Route path='/' element={<Sidebar />}>
          <Route path='/' element={<Dashboard />}></Route>
          <Route path='/users' element={<Users />}></Route> 
          <Route path='/adduser' element={<AddUser/>}></Route> 
          <Route path='/role' element={<Role />}></Route> 
          <Route path='/editrole' element={<EditRole />}></Route> 
          <Route path='/asignrole' element={<AsignRole />}></Route> 
          <Route path='/category' element={<Category />}></Route>
          <Route path='/editcategory/:pcategoryid' element={<EditCategory />}></Route>
          <Route path='/retailer' element={<Retailer />}></Route>
          <Route path='/addoffer' element={<AddOffer />}></Route>
          <Route path='/offer' element={<Offers />}></Route>
          <Route path='/subcategory' element={<SubCategory />}></Route> 
          <Route path='/editsubcategory/:subcategoryid' element={<EditSubCategory />}></Route> 
          </Route> 

        </Routes>
      </BrowserRouter>
    </>
  )
  
}

export default App
