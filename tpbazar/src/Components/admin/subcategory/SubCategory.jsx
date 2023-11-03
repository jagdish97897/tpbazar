

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import './subcategory.css';

function SubCategory() {
  const [data, setData] = useState({
    pcategoryid: '',
    subcategoryid: '',
    subcategoryname: '',
    photo: null, // Initialize with null for file input
    added: '',
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    pcategoryid: '',
    subcategoryid: '',
    subcategoryname: '',
    photo: '',
    added: '',
  });

  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 4;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('pcategoryid', data.pcategoryid);
      formData.append('subcategoryid', data.subcategoryid);
      formData.append('subcategoryname', data.subcategoryname);
      formData.append('photo', data.photo);
      formData.append('added', data.added);

      await axios.post('http://localhost:5000/api/admin/subcategory/addsubcategory', formData);
      navigate('/');
    } catch (error) {
      // Handle error here (show a user-friendly error message)
      console.error(error);
    }
  };

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/admin/subcategory/viewsabcategory')
      .then((res) => {
        if (res.status === 200) {
          setItems(res.data);
        } else {
          alert('Error');
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    // Fetch product categories
    axios
      .get('http://localhost:5000/api/admin/category/viewcategory')
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => console.log(err));
  }, []);

  const [products, setProducts] = useState([]); // Store the list of products

  const filteredItems = items.filter((item) =>
    item.subcategoryname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredItems.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, filteredItems.length);
  const itemsToDisplay = filteredItems.slice(startIndex, endIndex);

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div className="Subcategory">
          <Form onSubmit={handleSubmit}>
            <h4>Add New Sub Category</h4>
            <br />
            <Form.Label>
              <h6>Select Product Category</h6>
            </Form.Label>
            <Form.Control
              as="select"  // Use <Form.Control> as a select input
              onChange={(e) => setData({ ...data, pcategoryid: e.target.value })}
              value={data.pcategoryid}
            >
              <option value="">Select Product Category</option>
              {products.map((product) => (
                <option key={product.pcategoryid} value={product.pcategoryid}>
                  {product.categoryname}
                </option>
              ))}
            </Form.Control>
            <div className="text-danger">{errors.pcategoryid}</div>
            <br />

            <Form.Label>
              <h6>SubCategory Id</h6>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter SubCategory Id"
              onChange={(e) => setData({ ...data, subcategoryid: e.target.value })}
            />
            <div className="text-danger">{errors.subcategoryid}</div>
            <br />
            <Form.Label>
              <h6>SubCategory Name</h6>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter subcategoryname"
              onChange={(e) => setData({ ...data, subcategoryname: e.target.value })}
            />
            <div className="text-danger">{errors.subcategoryname}</div>
            <br />
            <Form.Label>
              <h6>Photo</h6>
            </Form.Label>
            <Form.Control
              type="file"
              placeholder="Enter photo"
              onChange={(e) => setData({ ...data, photo: e.target.files[0] })}
            />
            <div className="text-danger">{errors.photo}</div>
            <Button className="btnrole" variant="info" type="submit">
              Save
            </Button>
            <br />
          </Form>
        </div>


        <div className="tablesub ">
          <h4>SubCategory List</h4>
          <div className="search">
            <input
              type="text"
              placeholder="Search by SubCategory Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <br />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="text-center">Product Category Id</th>
                <th className="text-center">Sub Category Id</th>
                <th className="text-center">Sub Category Name</th>
                <th className="text-center">Photo</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {itemsToDisplay.map((item, index) => (
                <tr key={index}>
                  <td>{item.pcategoryid}</td>
                  <td>{item.subcategoryid}</td>
                  <td>{item.subcategoryname}</td>
                  <td>
                    <img
                      style={{ height: '50px', width: '50px' }}
                      src={item.photo}
                      alt={item.name}
                    />
                  </td>
                  <td>
                    <Link
                      to={`/editsubcategory/${item.subcategoryid}`}
                      className="btn btn-primary"
                    >
                      Update
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <nav aria-label="Page navigation">
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index + 1}
                  className={`page-item ${
                    currentPage === index + 1 ? 'active' : ''
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default SubCategory;





// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import Table from 'react-bootstrap/Table';
// import './subcategory.css';

// function SubCategory() {
//     const [value2, setValue2] = useState([]);
//   const [data, setData] = useState({
//     pcategoryid: '',
//     subcategoryid: '',
//     subcategoryname: '',
//     photo: null, // Initialize with null for file input
//     added: '',
//   });

//   const navigate = useNavigate();
//     const [errors, setErrors] = useState({
//     pcategoryid: '',
//     subcategoryid: '',
//     subcategoryname: '',
//     photo: '',
//     added: '',
//   });

//   const [items, setItems] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const perPage = 4;

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append('pcategoryid', data.pcategoryid);
//       formData.append('subcategoryid', data.subcategoryid);
//       formData.append('subcategoryname', data.subcategoryname);
//       formData.append('photo', data.photo);
//       formData.append('added', data.added);

//       await axios.post('http://localhost:5000/api/admin/subcategory/addsubcategory', formData);
//       navigate('/subcategory');
//     } catch (error) {
//       // Handle error here (show a user-friendly error message)
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     axios
//       .get('http://localhost:5000/api/admin/subcategory/viewsabcategory')
//       .then((res) => {
//         if (res.status === 200) {
//           setItems(res.data);
//         } else {
//           alert('Error');
//         }
//       })
//       .catch((err) => console.log(err));
//   }, []);



//       const getCategoryData = async () => {
//         try{
//          let response =  await axios.get("http://localhost:8081/api/admin/category/viewcategory")
//          setValue2(response.data)
//         }
//         catch(err){
//             console.log(err)
//         }
//     }

//   const filteredItems = items.filter((item) =>
//     item.subcategoryname.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredItems.length / perPage);
//   const startIndex = (currentPage - 1) * perPage;
//   const endIndex = Math.min(startIndex + perPage, filteredItems.length);
//   const itemsToDisplay = filteredItems.slice(startIndex, endIndex);

//   return (
//     <div>
//       <div style={{ display: 'flex' }}>
//         <div className="Subcategory">
//           <Form onSubmit={handleSubmit}>
//             <h4>Add New Sub Category</h4>
//             <br />
//             <Form.Label>
//               <h6>Enter Product Category Id</h6>
//             </Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter PCategory Id"
//               onChange={(e) => setData({ ...data, pcategoryid: e.target.value })}
//             />
//             <div className="text-danger">{errors.pcategoryid}</div>
//             <br />

//             {/* <Form.Select aria-label="Default select example"
//               onChange={(e) => setData({ ...data, pcategoryid: e.target.value })}>
//               <option value=""> Select Select Category</option>
//               {itemsToDisplay.map((item) => (
//                 <option key={item.pcategoryid} value={item.pcategoryid}>
//                   {item.category_name}
//                 </option>
//               ))}

//             </Form.Select> */}


//             <Form.Label>
//               <h6>SubCategory Id</h6>
//             </Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter SubCategory Id"
//               onChange={(e) => setData({ ...data, subcategoryid: e.target.value })}
//             />
//             <div className="text-danger">{errors.subcategoryid}</div>
//             <br />
//             <Form.Label>
//               <h6>SubCategory Name</h6>
//             </Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter subcategoryname"
//               onChange={(e) => setData({ ...data, subcategoryname: e.target.value })}
//             />
//             <div className="text-danger">{errors.subcategoryname}</div>
//             <br />
//             <Form.Label>
//               <h6>Photo</h6>
//             </Form.Label>
//             <Form.Control
//               type="file"
//               placeholder="Enter photo"
//               onChange={(e) => setData({ ...data, photo: e.target.files[0] })}
//             />
//             <div className="text-danger">{errors.photo}</div>
//             <Button className="btnsubcategory" variant="info" type="submit">
//               Save
//             </Button>
//             <br />
//           </Form>
//         </div>

//         <div className="tablesub ">
//           <h4>SubCategory List</h4>
//           <div className="search">
//           <input
//             type="text"
//             placeholder="Search by SubCategory Name"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//             </div>
        
//           <br/>
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th className="text-center">Product Category Id</th>
//                 <th className="text-center">Sub Category Id</th>
//                 <th className="text-center">Sub Category Name</th>
//                 <th className="text-center">Photo</th>
//                 <th className="text-center">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {itemsToDisplay.map((item, index) => (
//                 <tr key={index}>
//                   <td>{item.pcategoryid}</td>
//                   <td>{item.subcategoryid}</td>
//                   <td>{item.subcategoryname}</td>
//                   <td><img
//                       style={{ height: '50px', width: '50px' }}
//                       src={item.photo}
//                       alt={item.name}
//                     /></td>
//                   <td>
//                     <Link
//                       to={`/editsubcategory/${item.subcategoryid}`}
//                       className="btn btn-primary"
//                     >
//                       Update
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//           <nav aria-label="Page navigation">
//             <ul className="pagination">
//               {Array.from({ length: totalPages }, (_, index) => (
//                 <li
//                   key={index + 1}
//                   className={`page-item ${
//                     currentPage === index + 1 ? 'active' : ''
//                   }`}
//                 >
//                   <button
//                     className="page-link"
//                     onClick={() => handlePageChange(index + 1)}
//                   >
//                     {index + 1}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SubCategory;




// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { Modal, Button, Form } from 'react-bootstrap';
// import { Table } from "react-bootstrap";
// import { useNavigate, useParams } from "react-router-dom";


// function SubCategory() {
//     const [show, setShow] = useState(false);
//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);

//     const {PcategoryId} = useParams();
//     const [values, setValues] = useState([]);
//     const [value2, setValue2] = useState([]);
//     const [data, setData] = useState({
//         PcategoryId: "",
//         subcategory_id: "",
//         subcategory_name: "",
//         photo: ""
//     })

//     const config = {
//         headers : {
//             // 'content-type': 'applicaton/json' ,
//             'content-type':  'multipart/form-data',
//         },
//         withCredentials : true,
//         credentials : "include"	
//     }

//     const handleSubmit = async (event) => {
//      event.preventDefault();
//      await axios.post("http://localhost:8081/subcategory/createSubcategory", data, config)
//       .then(res => {
//         console.log(res)
//       })
//       .catch(err => console.log(err))
//     }
   
//     const getSubCategory = async () => {
//         await axios.get("http://localhost:8081/subcategory/getSubcategory")
//         .then(res => {
//            setValues(res.data)
//         })
//         .catch(
//             err => console.log(err)
//         )
//     }

//     const getCategoryData = async () => {
//         try{
//          let response =  await axios.get("http://localhost:8081/category/ViewCategory")
//          setValue2(response.data)
//         }
//         catch(err){
//             console.log(err)
//         }
//     }

//     const handleUpdateSubcategory = async (event) => {
//         event.preventDefault();
//         await axios.patch(`http://localhost:8081/subcategory/UpdateSubcategory/${PcategoryId}`)
//         .then(res => {
//             console.log(res)
//         })
//         .catch( err => {
//             console.log(err)
//         })
//     }

//     useEffect(() => {
//         getSubCategory()
//         getCategoryData()
//     }, [] )



//     return (
//         <>  <div className='container'>
//             <div className="d-flex gap-5 ">
//             {/* <div className="roleAdd col-15"> */}
//                 <form className="row border " style={{width:"600px", marginTop:"80px"}} onSubmit={handleSubmit}  >
//                 <h2 className="pb-5 text-center">Add Subcategory</h2>
//                     <div className="col-15">
//                         <label for="inputName" class="form-label">Category Name</label>
//                         <Form.Select aria-label="Default select example" 
//                         onChange={(e) => setData({ ...data, PcategoryId: e.target.value })}>
//                             <option value="">Select Category</option>
//                             {value2.map((item) => (
//                                 <option key={item.pCategoryId} value={item.PcategoryId}>
//                                     {item.category_name}
//                                 </option>
//                             ))}

//                         </Form.Select>
//                     </div>

//                     <div className="col-15">
//                         <label for="inputName" class="form-label">subcategory Id</label>
//                         <input type="text" class="form-control" id="inputName" placeholder='Sub Category ID' autoComplete='off'
//                             onChange={(e) => setData({ ...data, subcategory_id : e.target.value })} />
//                     </div>
//                     <div className="col-15">
//                         <label for="inputName" class="form-label"> Subcategory Name</label>
//                         <input type="text" class="form-control" id="inputName" placeholder='Category name' autoComplete='off'
//                             onChange={(e) => setData({ ...data, subcategory_name: e.target.value })} />
//                     </div>
//                     <div class="col-15 mb-3">
//                         <label class="form-label" for="inputGroupFile01">Select Image</label>
//                         <input type="file" class="form-control" id="inputGroupFile01"
//                             onChange={e => setData({ ...data, photo: e.target.files[0] })} />
//                     </div>
//                     <div class="col-15">
//                         <button type="submit" class="btn btn-primary" >Submit</button>
//                     </div>
//                 </form>
//             {/* </div> */}



//             <div className="mt-20 col-7">
//             <Table table-hover bordered  >
//               <thead>
//                 <tr className="table-dark">
//                     <th>S.no</th>
//                     <th>Category id</th>
//                     <th>SubCategory id</th>
//                     <th>Category Name</th>
//                     <th>Image</th>
//                     <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//              {values.map((roles, index) => {
//                 return(
//                 <tr key={index}>
//                     <td>{index +1} </td>
//                     <td>{roles.PcategoryId}</td>
//                     <td>{roles.subcategory_id }</td>
//                     <td>{roles.subcategory_name }</td>
//                     <td>
//                   {
//                     <img
//                     src={roles.photo}
//                     alt='image'
//                     style={{width:"60px", height:"60px", borderRadius:"50%"}}/>
//                   }
//                 </td>
//                     <td>
                    
//                     {/* EDIT ROLE MODAL BOX */}

//                     <Button variant="primary" onClick={handleShow}>
//                      edit
//                     </Button>
//                     <Modal show={show} onHide={handleClose} keyboard={false} className="modal-backdrop">
//                     <Modal.Header closeButton>
//                     <Modal.Title>Update Role Data</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                     <form className="row w-70 border" onSubmit={handleUpdateSubcategory}  >
//                     <h2 className="pb-5 text-center">Add Subcategory</h2>
//                     <div className="col-15">
//                         <label for="inputName" class="form-label">Category Name</label>
//                         <Form.Select aria-label="Default select example" onChange={e => setData({ ...data, pCategoryId: e.target.value })}>
//                             <option value="">Select Roles</option>
//                             {value2.map((item) => (
//                                 <option key={item.pCategoryId} value={item.pCategoryId}>
//                                     {item.category_name}
//                                 </option>
//                             ))}

//                         </Form.Select>
//                     </div>

//                     <div className="col-15">
//                         <label for="inputName" class="form-label">subcategory Id</label>
//                         <input type="text" class="form-control" id="inputName" placeholder=' Category ID' autoComplete='off'
//                             onChange={(e) => setData({ ...data, PcategoryId: e.target.value })} />
//                     </div>
//                     <div className="col-15">
//                         <label for="inputName" class="form-label"> Subcategory Name</label>
//                         <input type="text" class="form-control" id="inputName" placeholder='Category name' autoComplete='off'
//                             onChange={(e) => setData({ ...data, category_name: e.target.value })} />
//                     </div>
//                     <div class="col-15 mb-3">
//                         <label class="form-label" for="inputGroupFile01">Select Image</label>
//                         <input type="file" class="form-control" id="inputGroupFile01"
//                             onChange={e => setData({ ...data, photo: e.target.files[0] })} />
//                     </div>
//                     <div class="col-15">
//                         <button type="submit" class="btn btn-primary" >Submit</button>
//                     </div>
//                 </form>
//                     </Modal.Body>
//                 </Modal>
//                 </td>
//                 </tr>
//                 )
//              })  } 

//               </tbody>
//             </Table>
//         </div>

//         </div>
//         </div>

//         </>
//     )
// }

// export default SubCategory


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import Table from 'react-bootstrap/Table';
// import './subcategory.css';

// function SubCategory() {
//   const [data, setData] = useState({
//     pcategoryid: '',
//     subcategoryid: '',
//     subcategoryname: '',
//     photo: '',
//     added: '',
//   });
//   const navigate = useNavigate();

//   const [errors, setErrors] = useState({
//     pcategoryid: '',
//     subcategoryid: '',
//     subcategoryname: '',
//     photo: '',
//     added: '',
//   });

//   const [items, setItems] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const perPage = 4;

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

  
//    const handleSubmit = (event) => {
// 		event.preventDefault();
// 		const formdata = new FormData();
// 		formdata.append("pcategoryid", data.pcategoryid);
// 		formdata.append("subcategoryid", data.subcategoryid);
// 		formdata.append("subcategoryname", data.subcategoryname);
// 		formdata.append("photo", data.photo);
// 		formdata.append("added", data.added);
	
// 		axios.post('http://localhost:5000/api/admin/subcategory/addsubcategory', formdata)
// 			.then(res => {
// 				navigate('/subcategory')
// 			})
// 			.catch(err => console.log(err));
// 	};

//   useEffect(() => {
//     axios
//       .get('http://localhost:5000/api/admin/subcategory/viewsabcategory')
//       .then((res) => {
//         if (res.status === 200) {
//           setItems(res.data);
//         } else {
//           alert('Error');
//         }
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   const filteredItems = items.filter((item) =>
//     item.subcategoryname.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredItems.length / perPage);
//   const startIndex = (currentPage - 1) * perPage;
//   const endIndex = Math.min(startIndex + perPage, filteredItems.length);
//   const itemsToDisplay = filteredItems.slice(startIndex, endIndex);

//   return (
//     <div>
//       <div style={{ display: 'flex' }}>
//         <div className="Role">
//           <Form onSubmit={handleSubmit}>
//             <h4>Add New</h4>
//             <br />
//             <Form.Label>
//               <h6>PCategory Id</h6>
//             </Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter PCategory Id"
//               onChange={(e) => setData({ ...data, pcategoryid: e.target.value })}
//             />
//             <div className="text-danger">{errors.pcategoryid}</div>
//             <br />
//             <Form.Label>
//               <h6>SubCategory Id</h6>
//             </Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter SubCategory Id"
//               onChange={(e) => setData({ ...data, subcategoryid: e.target.value })}
//             />
//             <div className="text-danger">{errors.subcategoryid}</div>
//             <br />
//             <Form.Label>
//               <h6>SubCategory Name</h6>
//             </Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter subcategoryname"
//               onChange={(e) => setData({ ...data, subcategoryname: e.target.value })}
//             />
//             <div className="text-danger">{errors.subcategoryname}</div>
//             <br />
//             <Form.Label>
//               <h6>Photo</h6>
//             </Form.Label>
//             <Form.Control
//               type="file"
//               placeholder="Enter photo"
//               onChange={(e) => setData({ ...data, photo: e.target.files[0] })}
//             />
//             <div className="text-danger">{errors.photo}</div>
//             <Button className="btnrole" variant="info" type="submit">
//               Save
//             </Button>
//             <br />
//           </Form>
//         </div>

//         <div className="table4">
//           <h4>SubCategory List</h4>
//           <input
//             type="text"
//             placeholder="Search by SubCategory Name"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>PCategory Id</th>
//                 <th>SubCategory Id</th>
//                 <th>SubCategory Name</th>
//                 <th>Photo</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {itemsToDisplay.map((item, index) => (
//                 <tr key={index}>
//                   <td>{item.pcategoryid}</td>
//                   <td>{item.subcategoryid}</td>
//                   <td>{item.subcategoryname}</td>
//                   <td><img
//                       style={{ height: '50px', width: '50px' }}
//                       src={item.photo}
//                       alt={item.name}
//                     /></td>
//                   <td>
//                     <Link
//                       to={`/editsubcategory/${item.subcategoryid}`}
//                       className="btn btn-primary"
//                     >
//                       Update
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//           <nav aria-label="Page navigation">
//             <ul className="pagination">
//               {Array.from({ length: totalPages }, (_, index) => (
//                 <li
//                   key={index + 1}
//                   className={`page-item ${
//                     currentPage === index + 1 ? 'active' : ''
//                   }`}
//                 >
//                   <button
//                     className="page-link"
//                     onClick={() => handlePageChange(index + 1)}
//                   >
//                     {index + 1}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SubCategory;
