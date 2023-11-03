



import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import './role.css';

function Role() {
  const [data, setData] = useState({
    roleid: '', 
    rolename: '', 
  });

  const [errors, setErrors] = useState({
    roleid: '',
    rolename: '',
  });


  const { roleid } = useParams();
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleUpdateRole = () => {
    // Make an API call to update the role data
    axios
      .put(`http://localhost:5000/api/admin/roles/updaterole/${roleid}`, data)
      .then((res) => {
        if (res.data.status === 'success') {
          handleCloseModal(); // Close the modal on success
          navigate('/role'); // Navigate to the desired page
        }
      })
      .catch((err) => console.log(err));
  };
  

  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    axios
      .post('http://localhost:5000/api/admin/roles/newrole', data)
      .then((res) => {
        console.log(res)
        navigate('/role');
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/admin/role')
      .then((res) => {
        if (res.status === 200) {
          console.log(res)
          setItems(res.data);
        } else {
          alert('Error');
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  // Filter items by category name
  const filteredItems = currentItems.filter((item) =>
    item.rolename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
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
        <div className="Role1">
          <Form onSubmit={handleSubmit}>
            <h4>Add New Role</h4>
            <br />
            <Form.Label>
              <h6>Enter The Role Id</h6>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Role Id"
              onChange={(e) => setData({ ...data, roleid: e.target.value })}
            />
            <div className="text-danger">{errors.roleid}</div>
            <br />
            <Form.Label>
              <h6>Asign The Role Name</h6>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Role Name"
              onChange={(e) => setData({ ...data, rolename: e.target.value })}
            />
            <div className="text-danger">{errors.rolename}</div>
            <Button className="btnrole" variant="info" type="submit">
              Save
            </Button>
            <br />
          </Form>
        </div>

        <div className="tablerole">
          <h4>Role List</h4>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Search by Role Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Form.Group>
          <br />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="text-center">Role Id</th>
                <th className="text-center">Role Name</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.roleid}</td>
                  <td>{item.rolename}</td>
                  <td>
                    <Button variant="primary" onClick={handleShowModal}>
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <ul className="pagination">{renderPageNumbers}</ul>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Role id</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                autoComplete="off"
                value={data.roleid}
                onChange={(e) => setData({ ...data, roleid: e.target.value })}
              />
               <Form.Label>Role name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                autoComplete="off"
                value={data.rolename}
                onChange={(e) => setData({ ...data, rolename: e.target.value })}
              />

            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateRole}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Role;




// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import axios from 'axios';

// function EditRole() {
//   const [data, setData] = useState({
//     rolename: '',
//   });

//   const navigate = useNavigate();
//   const { roleid } = useParams();

//   // State to control the modal visibility
//   const [showModal, setShowModal] = useState(false);

//   const handleShowModal = () => {
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   const handleUpdateRole = () => {
//     // Make an API call to update the role data
//     axios
//       .put(`http://localhost:5000/api/admin/roles/updaterole/${roleid}`, data)
//       .then((res) => {
//         if (res.data.status === 'success') {
//           handleCloseModal(); // Close the modal on success
//           navigate('/role'); // Navigate to the desired page
//         }
//       })
//       .catch((err) => console.log(err));
//   };

//   useEffect(() => {
//     // Fetch the role data using roleid and populate the form fields
//     axios
//       .get(`http://localhost:5000/api/admin/role/${roleid}`)
//       .then((res) => {
//         setData({
//           ...data,
//           rolename: res.data.Result[0].rolename,
//         });
//       })
//       .catch((err) => console.log(err));
//   }, [roleid]);

//   return (
//     <>
//       <div className="d-flex flex-column align-items-center pt-4">
//         <h2>Edit Role</h2>
//         <Button variant="primary" onClick={handleShowModal}>
//           Edit
//         </Button>
//       </div>

//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Role</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group>
//               <Form.Label>Role Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter Name"
//                 autoComplete="off"
//                 value={data.rolename}
//                 onChange={(e) => setData({ ...data, rolename: e.target.value })}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleUpdateRole}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

// export default EditRole;