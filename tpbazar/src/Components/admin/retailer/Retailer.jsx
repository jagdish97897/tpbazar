import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Toggle from 'react-toggle';
import { Link } from 'react-router-dom';

export default function Retailer() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/admin/viewshops')
      .then((result) => setData(result.data))
      .catch((err) => console.log(err));
  }, []);


  const handleStatusToggle = (item) => {
    const updatedData = data.map((retailer) => {
      if (retailer.Reg_no === item.Reg_no) {
        return {
          ...retailer,
          Status: retailer.Status === 'active' ? 'deactive' : 'active',
        };
      }
      return retailer;
    });

    setData(updatedData);

    axios
      .put(`http://localhost:5000/api/retailer/updatestatus/${item.Reg_no}`, {
        Status: item.Status === 'active' ? 'deactive' : 'active',
      })
      .then((response) => {
        console.log('User Status updated:', response.data);
      })
      .catch((error) => {
        console.error('Error updating user Status:', error);
        setData(
          data.map((retailer) => (retailer.Reg_no === item.Reg_no ? { ...retailer, Status: item.Status } : retailer))
        );
      });
  };

  return (
    <div className='px-5 py-3'>
       <div className='d-flex justify-content-center'>
          <h3>Retailer List</h3>
        </div>
        <div>
        <Link to="/addretailer" className='btn btn-success'>Add User</Link>
        </div>
      
      <table className='table table-bordered table-striped'>
        <thead>
          <tr>
            <th className="text-center">Reg_no</th>
            <th className="text-center">Shop Name</th>
            <th className="text-center">Owner Name</th>
            <th className="text-center">Mobile</th>
            <th className="text-center">Email</th>
            <th className="text-center">Address</th>
            <th className="text-center">City</th>
            <th className="text-center">State</th>
            <th className="text-center">Pin</th>
            <th className="text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.Reg_no}>
              <td>{item.Reg_no}</td>
              <td>{item.Shop_name}</td>
              <td>{item.Owner_name}</td>
              <td>{item.Mobile}</td>
              <td>{item.Email}</td>
              <td>{item.Address}</td>
              <td>{item.City}</td>
              <td>{item.State}</td>
              <td>{item.Pin}</td>
              <td>  <Toggle
                        id={`status-toggle-${item.Reg_no}`}
                        name="status"
                        defaultChecked={item.Status === 'active'}
                        onChange={() => handleStatusToggle(item)}
                      /></td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}





// import React, { useEffect, useState } from 'react';
// import { Button, Form } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import Toggle from 'react-toggle';
// import 'react-toggle/style.css';
// import Modal from 'react-bootstrap/Modal';
// import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

// function retailer() {
//   const [data, setData] = useState([]);
//   const [role, setRoleData] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [selectedRole, setSelectedRole] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showAssignModal, setShowAssignModal] = useState(false);
//   const [showRolesModal, setShowRolesModal] = useState(false);
//   const [userRoles, setUserRoles] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [currentPage, setCurrentPage] = useState(0);
//   const itemsPerPage = 5; // Number of items per page

//   const handleSearchOnClick = () => {
//     handleSearch(searchQuery);
//   };

//   const handleSearch = (searchQuery) => {
//     axios
//       .get(`http://localhost:5000/api/admin/searchuser?name=${searchQuery}`)
//       .then((response) => {
//         setData(response.data);
//       })
//       .catch((error) => {
//         console.error('Error searching for users:', error);
//       });
//   };

//   const handleOpenAssignModal = (user) => {
//     setSelectedUser(user);
//     setSelectedRole('');
//     setShowAssignModal(true);
//   };

//   const handleAssignRole = () => {
//     if (!selectedRole) {
//       console.error('Please select a role before assigning.');
    
//       return;
//     }

//     // Validate that the selected role exists in the role list
//     const roleExists = role.some((item) => item.roleid === selectedRole);

//     if (!roleExists) {
//       console.error('Selected role does not exist.');
//       // Display an error message to the user or handle it appropriately.
//     } else {
//       // Proceed with the role assignment for the selected user
//       axios
//         .post('http://localhost:5000/api/admin/roleassign/addroleAssign', {
//           id: selectedUser.id, // Assign the role to the selected user
//           roleid: selectedRole,
//         })
//         .then((response) => {
//           console.log('Role assigned successfully');
//           // Update the userRoles state with the newly assigned role
//           setUserRoles([
//             ...userRoles,
//             {
//               roleid: selectedRole,
//               rolename: role.find((item) => item.roleid === selectedRole).rolename,
//             },
//           ]);
//           setShowAssignModal(false);
//         })
//         .catch((error) => {
//           console.error('Error assigning role:', error);
//         });
//     }
//   };

//   const fetchUserRoles = (user) => {
//     // Fetch user roles for the specified user
//     axios
//       .get(`http://localhost:5000/api/user/roleassign/getroleAssign/${user.id}`)
//       .then((response) => {
//         setUserRoles(response.data);
//         setSelectedUser(user);
//         setShowRolesModal(true);
//       })
//       .catch((error) => {
//         console.error('Error fetching user roles:', error);
//       });
//   };


//   const revokeRole = (user, rolename) => {
//     axios
//       .delete(`http://localhost:5000/api/admin/roleassign/revokeroles/${user.id}/${rolename}`)
//       .then((response) => {
//         // Update the userRoles state to remove the revoked role
//         const updatedUserRoles = userRoles.filter((userRole) => userRole.rolename !== rolename);
//         setUserRoles(updatedUserRoles);
//         console.log('Role revoked successfully');
//       })
//       .catch((error) => {
//         console.error('Error revoking role:', error);
//       });
//   };

//   // Model update backend se only four data ko fetch kar rha hu
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     qualification: '',
//     address: '',
//   });

//   useEffect(() => {
//     // Fetch user data and populate the data state
//     axios
//       .get('http://localhost:5000/api/admin/viewusers')
//       .then((result) => setData(result.data))
//       .catch((err) => console.log(err));

//     // Fetch role data and populate the role state
//     axios
//       .get('http://localhost:5000/api/admin/role')
//       .then((result) => {
//         setRoleData(result.data);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   const handleStatusToggle = (item) => {
//     const updatedData = data.map((user) => {
//       if (user.id === item.id) {
//         return {
//           ...user,
//           status: user.status === 'active' ? 'deactive' : 'active',
//         };
//       }
//       return user;
//     });

//     setData(updatedData);

//     axios
//       .put(`http://localhost:5000/api/admin/updateuserstatus/${item.id}`, {
//         status: item.status === 'active' ? 'deactive' : 'active',
//       })
//       .then((response) => {
//         console.log('User status updated:', response.data);
//       })
//       .catch((error) => {
//         console.error('Error updating user status:', error);
//         setData(
//           data.map((user) => (user.id === item.id ? { ...user, status: item.status } : user))
//         );
//       });
//   };

//   const handleEditClick = (user) => {
//     setSelectedUser(user);
//     setShowEditModal(true);
//   };

//   const handleCloseEditModal = () => {
//     setShowEditModal(false);
//     setSelectedUser(null);
//   };

//   const handleUpdateUser = () => {
//     axios
//       .put(`http://localhost:5000/api/admin/updateuser/${selectedUser.id}`, {
//         name: selectedUser.name,
//         email: selectedUser.email,
//         qualification: selectedUser.qualification,
//         address: selectedUser.address,
//         // Add other fields as needed
//       })
//       .then((response) => {
//         const updatedData = data.map((user) =>
//           user.id === selectedUser.id ? { ...user, ...response.data } : user
//         );
//         setData(updatedData);
//         handleCloseEditModal();
//       })
//       .catch((error) => {
//         console.error('Error updating user:', error);
//       });
//   };

//   const totalPages = Math.ceil(data.length / itemsPerPage);

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   return (
//     <>
//       <div className='px-5 py-3'>
//         <div className='d-flex justify-content-center'>
//           <h3>User List</h3>
//         </div>
//         <div className="d-flex justify-content-between mb-3">
//           <Link to="/adduser" className='btn btn-success'>Add User</Link>
//           <div className="d-flex">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Search by Name"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <button className="btn btn-primary" onClick={handleSearchOnClick}>
//               Search
//             </button>
//           </div>
//         </div>

//         <div className='mt-3'>
//           <table className='table table-bordered table-striped'>
//             <thead>
//               <tr>
//                 <th className="text-center">Id No.</th>
//                 <th className="text-center">Name</th>
//                 <th className="text-center">Photo</th>
//                 <th className="text-center">Email</th>
//                 <th className="text-center">Address</th>
//                 <th className="text-center">Qualification</th>
//                 <th className="text-center">Status</th>
//                 <th className="text-center">Action</th>
//                 <th className="text-center">Role</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data
//                 .filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
//                 .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
//                 .map((item, index) => (
//                   <tr key={item.id}>
//                     <td>{item.id}</td>
//                     <td>{item.name}</td>
//                     <td>
//                       <img
//                         style={{ height: '50px', width: '50px' }}
//                         src={item.photo}
//                         alt={item.name}
//                       />
//                     </td>
//                     <td>{item.email}</td>
//                     <td>{item.address}</td>
//                     <td>{item.qualification}</td>
//                     <td>
//                       <Toggle
//                         id={`status-toggle-${item.id}`}
//                         name="status"
//                         defaultChecked={item.status === 'active'}
//                         onChange={() => handleStatusToggle(item)}
//                       />
//                     </td>
//                     <td>
//                       <Link onClick={() => handleEditClick(item)} className='btn btn-primary btn-sm me-1'>
//                         Update
//                       </Link>
//                     </td>
//                     <td>
//                       <Link className="btn btn-sm btn-success" onClick={() => handleOpenAssignModal(item)}>
//                         Assign Role
//                       </Link>
//                       <Button variant="primary" onClick={() => fetchUserRoles(item)}>
//                         View Roles
//                       </Button>
//                     </td>

//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         </div>
//         <div className="d-flex justify-content-center">
//         <Button
//         variant="primary"
//         onClick={() => handlePageChange(currentPage - 1)}
//         disabled={currentPage === 0}
//       >
//         <BsArrowLeft /> {/* Left arrow icon */}
//       </Button>
//       <span className="mx-3">
//         Page {currentPage + 1} of {totalPages}
//       </span>
//       <Button
//         variant="primary"
//         onClick={() => handlePageChange(currentPage + 1)}
//         disabled={currentPage === totalPages - 1}
//       >
//         <BsArrowRight /> {/* Right arrow icon */}
//       </Button>
//         </div>
//       </div>

//       {/* Edit User Modal */}
//       {selectedUser && (
//         <Modal show={showEditModal} onHide={handleCloseEditModal}>
//           <Modal.Header closeButton>
//             <Modal.Title>Edit User</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <form>
//               <div className="mb-3">
//                 <label htmlFor="name" className="form-label">Name</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="name"
//                   name="name"
//                   value={selectedUser.name}
//                   onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="email" className="form-label">Email</label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   id="email"
//                   name="email"
//                   value={selectedUser.email}
//                   onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="qualification" className="form-label">Qualification</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="qualification"
//                   name="qualification"
//                   value={selectedUser.qualification}
//                   onChange={(e) => setSelectedUser({ ...selectedUser, qualification: e.target.value })}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="address" className="form-label">Address</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="address"
//                   name="address"
//                   value={selectedUser.address}
//                   onChange={(e) => setSelectedUser({ ...selectedUser, address: e.target.value })}
//                 />
//               </div>
//               {/* Add other form fields for password, mobile, photo, etc. */}
//             </form>
//           </Modal.Body>
//           <Modal.Footer>
//             <button className="btn btn-secondary" onClick={handleCloseEditModal}>Close</button>
//             <button className="btn btn-primary" onClick={handleUpdateUser}>Update</button>
//           </Modal.Footer>
//         </Modal>
//       )}

//       <Modal show={showAssignModal} onHide={() => setShowAssignModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Assign Role to {selectedUser?.name}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>Selected User Id: {selectedUser?.id}</p>
//           <p>Selected User: {selectedUser?.name}</p>
//           <p>Selected Role: {selectedRole ? role.find(item => item.roleid === selectedRole)?.rolename : 'Select a Role'}</p>
//           <Form.Select
//             onChange={(e) => setSelectedRole(e.target.value)}
//             value={selectedRole}
//           >
//             <option value="">Select Role</option>
//             {role.map((item) => (
//               <option  value={item.roleid}>
//                 {item.rolename}
//               </option>
//             ))}
//           </Form.Select>
//         </Modal.Body>

//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowAssignModal(false)}>
//             Cancel
//           </Button>
//           <Button
//             variant="primary"
//             onClick={() => {
//               // Handle the role assignment
//               handleAssignRole(selectedUser, selectedRole);
//             }}
//           >
//             Assign Role
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Modal for Viewing User Roles */}
//       <Modal show={showRolesModal} onHide={() => setShowRolesModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>User Roles for {selectedUser?.name}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <h2>User Roles for User ID {selectedUser?.id}</h2>
//           <ul>
//             {userRoles.map((role, index) => (
//               <li key={index} className="d-flex justify-content-between align-items-center">
//                 <span>{role}</span>
//                 <Button
//                   variant="danger"
//                   onClick={() => revokeRole(selectedUser, role)}
//                 >
//                   Revoke Role
//                 </Button>
//               </li>
//             ))}
//           </ul>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowRolesModal(false)}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

// export default retailer;
