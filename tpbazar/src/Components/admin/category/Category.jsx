import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import './category.css';

function Category() {
  const [data, setData] = useState({
    pcategoryid: '',
    categoryname: '',
  });

  const [errors, setErrors] = useState({
    pcategoryid: '',
    categoryname: '',
  });

  const [item, setItem] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    axios
      .post('http://localhost:5000/api/admin/category/addcategory', data)
      .then((res) => {
        navigate('/category');
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/admin/category/viewcategory')
      .then((res) => {
        if (res.status === 200) {
          setItem(res.data.products);
        } else {
          alert('Error');
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = item.slice(indexOfFirstItem, indexOfLastItem);

  // Filter items by category name
  const filteredItems = currentItems.filter((item) =>
    item.categoryname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(item.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => (
    <li
      key={number}
      className={number === currentPage ? 'active' : ''}
      onClick={() => setCurrentPage(number)}
    >
      {number}
    </li>
  ));

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div className="Category">
          <Form onSubmit={handleSubmit}>
            <h4>Add New</h4>
            <br />
            <Form.Label>
              <h6>Category Id</h6>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Category Id"
              onChange={e => setData({ ...data, pcategoryid: e.target.value })}
            />
            <div className="text-danger">{errors.pcategoryid}</div>
            <br />
            <Form.Label>
              <h6>Category Name</h6>
            </Form.Label>
            <Form.Control
              type="text"  
              placeholder="Enter Category Name"
              onChange={(e) => setData({ ...data, categoryname: e.target.value })}
            />
            <div className="text-danger">{errors.categoryname}</div>
            <Button className="btnrole" variant="info" type="submit">
              Save
            </Button>
            <br />
          </Form>
        </div>

        <div className="tablecat">
          <h4>Category List</h4>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Search by Category Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Form.Group>
          <br />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Category Id</th>
                <th>Category Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((product, index) => (
                <tr key={index}>
                  <td>{product.pcategoryid}</td>
                  <td>{product.categoryname}</td>
                  <td>
                    <Link
                      to={`/editcategory/` + product.pcategoryid}
                      className="btn btn-primary"
                    >
                      Update
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <ul className="pagination">{renderPageNumbers}</ul>
        </div>
      </div>
    </div>
  );
}

export default Category;





// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import Table from 'react-bootstrap/Table';
// import './category.css';
// function Category() {
//   const [data, setData] = useState({
//     pcategoryid: '',
//     categoryname: '',
//   });
// const [errors, setErrors] = useState({
//   pcategoryid: '',
//   categoryname: '',
//   });
//   const [item, setItem] = useState([]);

// const navigate = useNavigate();

// const handleSubmit = (event) => {
//                              ////if uncomment save button is not working            
//   axios.post('http://localhost:5000/api/admin/category/addcategory', data)
//   .then((res) => {
//     navigate('/category');
//   })
//   .catch((err) => console.log(err));
// }

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/admin/category/viewcategory')
//       .then((res) => {
//         if (res.status === 200) {

//           setItem(res.data.products);
//         } else {
//           alert('Error');
//         }
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   return (
//     <div>
//       <div style={{ display: 'flex' }}>
//         <div className="Role">
//           <Form onSubmit={handleSubmit}>
//             <h4>Add New</h4>
//             <br />
//             <Form.Label>
//               <h6>Category Id</h6>
//             </Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter Category Id"
//               onChange={e => setData({ ...data, pcategoryid: e.target.value })}
//             />
//             <div className="text-danger">{errors.pcategoryid}</div>
//             <br />
//             <Form.Label>
//               <h6>Category Name</h6>
//             </Form.Label>
//             <Form.Control
//               type="text"  
//               placeholder="Enter Category Name"
//               onChange={(e) => setData({ ...data, categoryname: e.target.value })}
//             />
//             <div className="text-danger">{errors.categoryname}</div>
//             <Button className="btnrole" variant="info" type="submit">
//               Save
//             </Button>
//             <br />
//           </Form>
//         </div>

//         <div className="table4">
//           <h4>Category List</h4>
//           <br />
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>Category Id</th>
//                 <th>Category Name</th>
//                 <th>Action</th>
//               </tr> 
//             </thead>
//             <tbody>
//               {item.map((product, index) => (
//                 <tr key={index}>
//                   <td>{product.pcategoryid}</td>
//                   <td>{product.categoryname}</td>
//                   <Link to={`/editcategory/`+ product.pcategoryid} className='btn btn-primary'>Update</Link>
               
//                 </tr> 
//               ))}   
//             </tbody>
//           </Table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Category;

























// import axios from 'axios';
// import React, { useState } from 'react';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import { useNavigate } from 'react-router-dom';

// function Category() {
//     const [data, setData] = useState({
//         pcategoryid: '',
//         categoryname: ''
//     });

//     const navigate = useNavigate();
  

//     const handleSubmit = (event) => {
//         event.preventDefault();

//         // Create an object with only pcategoryid and categoryname
//         const postData = {
//             pcategoryid: data.pcategoryid,
//             categoryname: data.categoryname
//         };

//         axios.post('http://localhost:5000/api/admin/category/addcategory', postData)
//             .then(res => {
//                 navigate('/');
//             })
//             .catch(err => console.log(err));
//     }

//     return (
//       <div>
//         <div style={{ display: 'flex' }}>
//           <div className="Role">
//             <Form onSubmit={handleSubmit}>
//               <h4>Add New</h4>
//               <br />
//               <Form.Label>
//                 <h6>Category Id</h6>
//               </Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter Category Id"
//                 onChange={e => setData({ ...data, pcategoryid: e.target.value })}
//               />
             
//               <br />
//               <Form.Label>
//                 <h6>Category Name</h6>
//               </Form.Label>
//               <Form.Control
//                 type="text"  
//                 placeholder="Enter Category Name"
//                 onChange={(e) => setData({ ...data, categoryname: e.target.value })}
//               />
              
//               <Button className="btnrole" variant="info" type="submit">
//                 Save
//               </Button>
//               <br />
//             </Form>
//           </div>
          
  
         
//         </div>
//       </div>
//     );
//   }
  

// export default Category;
