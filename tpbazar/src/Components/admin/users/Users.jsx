

import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import Modal from 'react-bootstrap/Modal';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

function Users() {
  const [data, setData] = useState([]);
  const [role, setRoleData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showRolesModal, setShowRolesModal] = useState(false);
  const [userRoles, setUserRoles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5; // Number of items per page

  const handleSearchOnClick = () => {
    handleSearch(searchQuery);
  };

  const handleSearch = (searchQuery) => {
    axios
      .get(`http://localhost:5000/api/admin/searchuser?name=${searchQuery}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error searching for users:', error);
      });
  };

  const handleOpenAssignModal = (user) => {
    setSelectedUser(user);
    setSelectedRole('');
    setShowAssignModal(true);
  };

  const handleAssignRole = () => {
    if (!selectedRole) {
      console.error('Please select a role before assigning.');
    
      return;
    }

    // Validate that the selected role exists in the role list
    const roleExists = role.some((item) => item.roleid === selectedRole);

    if (!roleExists) {
      console.error('Selected role does not exist.');
      // Display an error message to the user or handle it appropriately.
    } else {
      // Proceed with the role assignment for the selected user
      axios
        .post('http://localhost:5000/api/admin/roleassign/addroleAssign', {
          id: selectedUser.id, // Assign the role to the selected user
          roleid: selectedRole,
        })
        .then((response) => {
          console.log('Role assigned successfully');
          // Update the userRoles state with the newly assigned role
          setUserRoles([
            ...userRoles,
            {
              roleid: selectedRole,
              rolename: role.find((item) => item.roleid === selectedRole).rolename,
            },
          ]);
          setShowAssignModal(false);
        })
        .catch((error) => {
          console.error('Error assigning role:', error);
        });
    }
  };

  const fetchUserRoles = (user) => {
    // Fetch user roles for the specified user
    axios
      .get(`http://localhost:5000/api/user/roleassign/getroleAssign/${user.id}`)
      .then((response) => {
        setUserRoles(response.data);
        setSelectedUser(user);
        setShowRolesModal(true);
      })
      .catch((error) => {
        console.error('Error fetching user roles:', error);
      });
  };


  const revokeRole = (user, rolename) => {
    axios
      .delete(`http://localhost:5000/api/admin/roleassign/revokeroles/${user.id}/${rolename}`)
      .then((response) => {
        // Update the userRoles state to remove the revoked role
        const updatedUserRoles = userRoles.filter((userRole) => userRole.rolename !== rolename);
        setUserRoles(updatedUserRoles);
        console.log('Role revoked successfully');
      })
      .catch((error) => {
        console.error('Error revoking role:', error);
      });
  };

  // Model update backend se only four data ko fetch kar rha hu
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    qualification: '',
    address: '',
  });

  useEffect(() => {
    // Fetch user data and populate the data state
    axios
      .get('http://localhost:5000/api/admin/viewusers')
      .then((result) => setData(result.data))
      .catch((err) => console.log(err));

    // Fetch role data and populate the role state
    axios
      .get('http://localhost:5000/api/admin/role')
      .then((result) => {
        setRoleData(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleStatusToggle = (item) => {
    const updatedData = data.map((user) => {
      if (user.id === item.id) {
        return {
          ...user,
          status: user.status === 'active' ? 'deactive' : 'active',
        };
      }
      return user;
    });

    setData(updatedData);

    axios
      .put(`http://localhost:5000/api/admin/updateuserstatus/${item.id}`, {
        status: item.status === 'active' ? 'deactive' : 'active',
      })
      .then((response) => {
        console.log('User status updated:', response.data);
      })
      .catch((error) => {
        console.error('Error updating user status:', error);
        setData(
          data.map((user) => (user.id === item.id ? { ...user, status: item.status } : user))
        );
      });
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const handleUpdateUser = () => {
    axios
      .put(`http://localhost:5000/api/admin/updateuser/${selectedUser.id}`, {
        name: selectedUser.name,
        email: selectedUser.email,
        qualification: selectedUser.qualification,
        address: selectedUser.address,
        // Add other fields as needed
      })
      .then((response) => {
        const updatedData = data.map((user) =>
          user.id === selectedUser.id ? { ...user, ...response.data } : user
        );
        setData(updatedData);
        handleCloseEditModal();
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className='px-5 py-3'>
        <div className='d-flex justify-content-center'>
          <h3>User List</h3>
        </div>
        <div className="d-flex justify-content-between mb-3">
          <Link to="/adduser" className='btn btn-success'>Add User</Link>
          <div className="d-flex">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleSearchOnClick}>
              Search
            </button>
          </div>
        </div>

        <div className='mt-3'>
          <table className='table table-bordered table-striped'>
            <thead>
              <tr>
                <th className="text-center">Id No.</th>
                <th className="text-center">Name</th>
                <th className="text-center">Photo</th>
                <th className="text-center">Email</th>
                <th className="text-center">Address</th>
                <th className="text-center">Qualification</th>
                <th className="text-center">Status</th>
                <th className="text-center">Action</th>
                <th className="text-center">Role</th>
              </tr>
            </thead>
            <tbody>
              {data
                .filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
                .map((item, index) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>
                      <img
                        style={{ height: '50px', width: '50px' }}
                        src={item.photo}
                        alt={item.name}
                      />
                    </td>
                    <td>{item.email}</td>
                    <td>{item.address}</td>
                    <td>{item.qualification}</td>
                    <td>
                      <Toggle
                        id={`status-toggle-${item.id}`}
                        name="status"
                        defaultChecked={item.status === 'active'}
                        onChange={() => handleStatusToggle(item)}
                      />
                    </td>
                    <td>
                      <Link onClick={() => handleEditClick(item)} className='btn btn-primary btn-sm me-1'>
                        Update
                      </Link>
                    </td>
                    <td>
                      <Link className="btn btn-sm btn-success" onClick={() => handleOpenAssignModal(item)}>
                        Assign Role
                      </Link>
                      <Button variant="primary" onClick={() => fetchUserRoles(item)} style={{ marginLeft: '10px' }}>
                        View Roles
                      </Button>
                    </td>

                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-center">
        <Button
        variant="primary"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 0}
      >
        <BsArrowLeft /> {/* Left arrow icon */}
      </Button>
      <span className="mx-3">
        Page {currentPage + 1} of {totalPages}
      </span>
      <Button
        variant="primary"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
      >
        <BsArrowRight /> {/* Right arrow icon */}
      </Button>
        </div>
      </div>

      {/* Edit User Modal */}
      {selectedUser && (
        <Modal show={showEditModal} onHide={handleCloseEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="qualification" className="form-label">Qualification</label>
                <input
                  type="text"
                  className="form-control"
                  id="qualification"
                  name="qualification"
                  value={selectedUser.qualification}
                  onChange={(e) => setSelectedUser({ ...selectedUser, qualification: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={selectedUser.address}
                  onChange={(e) => setSelectedUser({ ...selectedUser, address: e.target.value })}
                />
              </div>
              {/* Add other form fields for password, mobile, photo, etc. */}
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-secondary" onClick={handleCloseEditModal}>Close</button>
            <button className="btn btn-primary" onClick={handleUpdateUser}>Update</button>
          </Modal.Footer>
        </Modal>
      )}

      <Modal show={showAssignModal} onHide={() => setShowAssignModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Role to {selectedUser?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Selected User Id: {selectedUser?.id}</p>
          <p>Selected User: {selectedUser?.name}</p>
          <p>Selected Role: {selectedRole ? role.find(item => item.roleid === selectedRole)?.rolename : 'Select a Role'}</p>
          <Form.Select
            onChange={(e) => setSelectedRole(e.target.value)}
            value={selectedRole}
          >
            <option value="">Select Role</option>
            {role.map((item) => (
              <option  value={item.roleid}>
                {item.rolename}
              </option>
            ))}
          </Form.Select>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAssignModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              // Handle the role assignment
              handleAssignRole(selectedUser, selectedRole);
            }}
          >
            Assign Role
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Viewing User Roles */}
      <Modal show={showRolesModal} onHide={() => setShowRolesModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>User Roles for {selectedUser?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>User Roles for User ID {selectedUser?.id}</h2>
          <ul>
            {userRoles.map((role, index) => (
              <li key={index} className="d-flex justify-content-between align-items-center">
                <span>{role}</span>
                <Button
                  variant="danger"
                  onClick={() => revokeRole(selectedUser, role)}
                >
                  Revoke Role
                </Button>
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRolesModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Users;





// import React, { useEffect, useState } from 'react';
// import { Button, Form } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import Toggle from 'react-toggle';
// import 'react-toggle/style.css';
// import Modal from 'react-bootstrap/Modal';
// import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

// function Users() {
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
//       // Display an error message to the user or handle it appropriately.
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

//   // Define a function to revoke a role using user ID and role name
//   const revokeRole = (user, rolename) => {
//     // Make an API request to revoke the role
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
//                   onClick={() => revokeRole(selectedUser, role.rolename)}
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

// export default Users;





// import React, { useEffect, useState } from 'react';
// import { Button,Form } from 'react-bootstrap';

// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import Toggle from 'react-toggle';
// import 'react-toggle/style.css';
// import Modal from 'react-bootstrap/Modal'; // Add this import


// function Users() {
//   const [data, setData] = useState([]);
//   const [role, setRoleData] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [selectedRole, setSelectedRole] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);//update 
//   const [showAssignModal, setShowAssignModal] = useState(false);//role assign 

//   const [showRolesModal, setShowRolesModal] = useState(false);
//   const [userRoles, setUserRoles] = useState([]);
  

//   const handleOpenAssignModal = (user) => {
//     setSelectedUser(user);
//     setSelectedRole(''); // Reset the selected role when opening the modal
//     setShowAssignModal(true);
//   };
//   const handleAssignRole = () => {
//     if (!selectedRole) {
//       console.error('Please select a role before assigning.');
//       // Display an error message to the user or handle it appropriately.
//       return;
//     }
  
//     // Validate that the selected role exists in the role list
//     const roleExists = role.some((item) => item.roleid === selectedRole);
  
//     if (!roleExists) {
//       console.error('Selected role does not exist.');
//       // Display an error message to the user or handle it appropriately.
//     } else {
//       // Proceed with the role assignment for the selected user
//       axios.post('http://localhost:5000/api/admin/roleassign/addroleAssign', {
//         id: selectedUser.id, // Assign the role to the selected user
//         roleid: selectedRole,
//       })
//         .then(response => {
//           console.log('Role assigned successfully');
//           // Update the userRoles state with the newly assigned role
//           setUserRoles([...userRoles, { roleid: selectedRole, rolename: role.find(item => item.roleid === selectedRole).rolename }]);
//           setShowAssignModal(false);
//         })
//         .catch(error => {
//           console.error('Error assigning role:', error);
//         });
//     }
//   };
  

//   const fetchUserRoles = (user) => {
//     // Fetch user roles for the specified user
//     axios.get(`http://localhost:5000/api/user/roleassign/getroleAssign/${user.id}`)
//       .then(response => {
//         setUserRoles(response.data);
//         setSelectedUser(user);
//         setShowRolesModal(true);
//       })
//       .catch(error => {
//         console.error('Error fetching user roles:', error);
//       });
//   };

//  // Define a function to revoke a role using user ID and role name
//  const revokeRole = (user, rolename) => {
//   // Make an API request to revoke the role
//   axios.delete(`http://localhost:5000/api/admin/roleassign/revokeroles/${user.id}/${rolename}`)
//     .then(response => {
//       // Update the userRoles state to remove the revoked role
//       const updatedUserRoles = userRoles.filter(userRole => userRole.rolename !== rolename);
//       setUserRoles(updatedUserRoles);
//       console.log('Role revoked successfully');
//     })
//     .catch(error => {
//       console.error('Error revoking role:', error);
//     });
// };



//   //model update backend se only four data ko fetch kar rha hu
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     qualification: '',
//     address: '',
  
//   });


//   useEffect(() => {
//     // Fetch user data and populate the data state
//     axios.get('http://localhost:5000/api/admin/viewusers')
//       .then(result => setData(result.data))
//       .catch(err => console.log(err));

//        // Fetch role data and populate the role state
//     axios.get('http://localhost:5000/api/admin/role')
//     .then(result => {
//       setRoleData(result.data);
//     })
//     .catch(err => console.log(err));
//   }, []);
 

//   const handleStatusToggle = (item) => {
//     // Toggle the status locally for immediate UI feedback
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

//     // Send a PUT request to update the status in the backend
//     axios.put(`http://localhost:5000/api/admin/updateuserstatus/${item.id}`, {
//       status: item.status === 'active' ? 'deactive' : 'active',
//     })
//       .then((response) => {
//         console.log('User status updated:', response.data);
//       })
//       .catch((error) => {
//         console.error('Error updating user status:', error);
//         // Revert the status change if the API request fails
//         setData(data.map((user) => (user.id === item.id ? { ...user, status: item.status } : user)));
//       });
//   };

//   const handleEditClick = (user) => {
//     setSelectedUser(user);
//     setFormData({
//       name: user.name,
//       email: user.email,
//       qualification: user.qualification,
//       address: user.address,
//       // Set other form fields here based on your data structure
//     });
//     setShowEditModal(true);
//   };



//   const handleCloseEditModal = () => {
//     setShowEditModal(false);
//     setSelectedUser(null);
//     setFormData({
//       name: '',
//       email: '',
//       qualification: '',
//       address:'',
//       // Reset other form fields as needed
//     });
//   };


// const handleUpdateUser = () => {
//   // Make an API request to update the user with the formData
//   axios
//     .put(`http://localhost:5000/api/admin/updateuser/${selectedUser.id}`, formData)
//     .then((response) => {
//       console.log('User updated successfully:', response.data);
//       // Update the user data on the frontend (you can update your state or refetch the data)
//       // For example, if you are updating the data in your state:
//       const updatedData = data.map((user) =>
//         user.id === selectedUser.id ? { ...user, ...formData } : user
//       );
//       setData(updatedData);
//       // Close the edit modal
//       handleCloseEditModal();
//     })
//     .catch((error) => {
//       console.error('Error updating user:', error);
//       // Handle the error as needed
//     });
// };


//   return (
//     <>
//       <div className='px-5 py-3'>
//         <div className='d-flex justify-content-center'>
//           <h3>User List</h3>
//         </div>
//         <Link to="/adduser" className='btn btn-success'>Add User</Link>
//         <div className='mt-3'>
//           <table className='table'>
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
//               {data.map((item, index) => (
//                 <tr key={item.id}>
//                   <td>{item.id}</td>
//                   <td>{item.name}</td>
//                   <td>
//                     <img
//                       style={{ height: '50px', width: '50px' }}
//                       src={item.photo}
//                       alt={item.name}
//                     />
//                   </td>
//                   <td>{item.email}</td>
//                   <td>{item.address}</td>
//                   <td>{item.qualification}</td>
//                   <td>
//                     <Toggle
//                       id={`status-toggle-${item.id}`}
//                       name="status"
//                       defaultChecked={item.status === 'active'}
//                       onChange={() => handleStatusToggle(item)}
//                     />
//                   </td>
//                   <td>
//                     <Link
//                       onClick={() => handleEditClick(item)} // Open the edit modal
//                       className='btn btn-primary btn-sm me-1'
//                     >
//                       Update
//                     </Link>
                   
//                   </td>
//                   <td>
//                   <Link className="btn btn-sm btn-success" onClick={() => handleOpenAssignModal(item)}>
//                     Assign Role
//                   </Link>
//                   <Button
//                   variant="primary"
//                   onClick={() => fetchUserRoles(item)}
//                 >
//                   View Roles
//                 </Button>
//                   </td>

//                 </tr>
//               ))}
//             </tbody>
//           </table>
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
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="email" className="form-label">Email</label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 />
//               </div>


//               <div className="mb-3">
//     <label htmlFor="qualification" className="form-label">Qualification</label>
//     <input
//       type="text"
//       className="form-control"
//       id="qualification"
//       name="qualification"
//       value={formData.qualification}
//       onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
//     />
//   </div>
//   <div className="mb-3">
//     <label htmlFor="address" className="form-label">Address</label>
//     <input
//       type="text"
//       className="form-control"
//       id="address"
//       name="address"
//       value={formData.address}
//       onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//     />
//   </div>
              

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

//        {/* Modal for Viewing User Roles */}
// <Modal show={showRolesModal} onHide={() => setShowRolesModal(false)}>
//   <Modal.Header closeButton>
//     <Modal.Title>User Roles for {selectedUser?.name}</Modal.Title>
//   </Modal.Header>
//   <Modal.Body>
//     <h2>User Roles for User ID {selectedUser?.id}</h2>
//     <ul>
//       {userRoles.map((role, index) => (
//         <li key={index} className="d-flex justify-content-between align-items-center">
//           <span>{role}</span>
//           <Button
//             variant="danger"
//             onClick={() => revokeRole(selectedUser, role)}
//           >
//             Revoke Role
//           </Button>
//         </li>
//       ))}
//     </ul>
//   </Modal.Body>
//   <Modal.Footer>
//     <Button variant="secondary" onClick={() => setShowRolesModal(false)}>
//       Close
//     </Button>
//   </Modal.Footer>
// </Modal>
//     </>
//   );
// }

// export default Users;




// import React, { useEffect, useState } from 'react';
// import { Button,Form } from 'react-bootstrap';

// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import Toggle from 'react-toggle';
// import 'react-toggle/style.css';
// import Modal from 'react-bootstrap/Modal'; // Add this import


// function Users() {
//   const [data, setData] = useState([]);
//   const [role, setRoleData] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [selectedRole, setSelectedRole] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);//update 
//   const [showAssignModal, setShowAssignModal] = useState(false);//role assign 
  




// const handleOpenAssignModal = (user) => {
//   setSelectedUser(user);
//   setShowAssignModal(true);
// };

// const handleAssignRole = (user, roleid) => {
//   // Your logic for assigning a role here
//   console.log(`Assigning role ${roleid} to user ${user.id}`);
  
//   // Display an alert message
//   alert(`Role ${roleid} assigned to user ${user.id}`);

//   // After assigning, close the modal
//   setShowAssignModal(false);
// };




//   //model update backend se only four data ko fetch kar rha hu
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     qualification: '',
//     address: '',
  
//   });


//   useEffect(() => {
//     // Fetch data and set it in the 'data' state here
//     axios.get('http://localhost:5000/api/admin/viewusers')
//       .then(result => setData(result.data))
//       .catch(err => console.log(err));

//       axios.get('http://localhost:5000/api/admin/role')
//       .then(result => {
//         console.log(result.data); // Log the data received from the API
//         setRoleData(result.data); // Set the role data in your state
//       })
//       .catch(err => console.log(err));
//   }, []);
 

//   const handleStatusToggle = (item) => {
//     // Toggle the status locally for immediate UI feedback
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

//     // Send a PUT request to update the status in the backend
//     axios.put(`http://localhost:5000/api/admin/updateuserstatus/${item.id}`, {
//       status: item.status === 'active' ? 'deactive' : 'active',
//     })
//       .then((response) => {
//         console.log('User status updated:', response.data);
//       })
//       .catch((error) => {
//         console.error('Error updating user status:', error);
//         // Revert the status change if the API request fails
//         setData(data.map((user) => (user.id === item.id ? { ...user, status: item.status } : user)));
//       });
//   };

//   const handleEditClick = (user) => {
//     setSelectedUser(user);
//     setFormData({
//       name: user.name,
//       email: user.email,
//       qualification: user.qualification,
//       address: user.address,
//       // Set other form fields here based on your data structure
//     });
//     setShowEditModal(true);
//   };



//   const handleCloseEditModal = () => {
//     setShowEditModal(false);
//     setSelectedUser(null);
//     setFormData({
//       name: '',
//       email: '',
//       qualification: '',
//       address:'',
//       // Reset other form fields as needed
//     });
//   };


// const handleUpdateUser = () => {
//   // Make an API request to update the user with the formData
//   axios
//     .put(`http://localhost:5000/api/admin/updateuser/${selectedUser.id}`, formData)
//     .then((response) => {
//       console.log('User updated successfully:', response.data);
//       // Update the user data on the frontend (you can update your state or refetch the data)
//       // For example, if you are updating the data in your state:
//       const updatedData = data.map((user) =>
//         user.id === selectedUser.id ? { ...user, ...formData } : user
//       );
//       setData(updatedData);
//       // Close the edit modal
//       handleCloseEditModal();
//     })
//     .catch((error) => {
//       console.error('Error updating user:', error);
//       // Handle the error as needed
//     });
// };


//   return (
//     <>
//       <div className='px-5 py-3'>
//         <div className='d-flex justify-content-center'>
//           <h3>User List</h3>
//         </div>
//         <Link to="/adduser" className='btn btn-success'>Add User</Link>
//         <div className='mt-3'>
//           <table className='table'>
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
//               {data.map((item, index) => (
//                 <tr key={item.id}>
//                   <td>{item.id}</td>
//                   <td>{item.name}</td>
//                   <td>
//                     <img
//                       style={{ height: '50px', width: '50px' }}
//                       src={item.photo}
//                       alt={item.name}
//                     />
//                   </td>
//                   <td>{item.email}</td>
//                   <td>{item.address}</td>
//                   <td>{item.qualification}</td>
//                   <td>
//                     <Toggle
//                       id={`status-toggle-${item.id}`}
//                       name="status"
//                       defaultChecked={item.status === 'active'}
//                       onChange={() => handleStatusToggle(item)}
//                     />
//                   </td>
//                   <td>
//                     <Link
//                       onClick={() => handleEditClick(item)} // Open the edit modal
//                       className='btn btn-primary btn-sm me-1'
//                     >
//                       Update
//                     </Link>
                   
//                   </td>
//                   <td>
//                   <Link className="btn btn-sm btn-success" onClick={() => handleOpenAssignModal(item)}>
//                     Assign Role
//                   </Link>
//                     <button
//                        // Handle details click (you can implement this)
//                       className='btn btn-sm btn-danger'
//                     >
//                       Details
//                     </button>
//                   </td>

//                 </tr>
//               ))}
//             </tbody>
//           </table>
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
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="email" className="form-label">Email</label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 />
//               </div>


//               <div className="mb-3">
//     <label htmlFor="qualification" className="form-label">Qualification</label>
//     <input
//       type="text"
//       className="form-control"
//       id="qualification"
//       name="qualification"
//       value={formData.qualification}
//       onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
//     />
//   </div>
//   <div className="mb-3">
//     <label htmlFor="address" className="form-label">Address</label>
//     <input
//       type="text"
//       className="form-control"
//       id="address"
//       name="address"
//       value={formData.address}
//       onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//     />
//   </div>
              

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
//           <p>Selected Role: {selectedRole}</p>
//           <Form.Select
//             onChange={(e) => setSelectedRole(e.target.value)}
//             value={selectedRole}
//           >
//             <option value="">Select Role</option>
//             {role.map((item) => (
//               <option key={item.roleid} value={item.rolename}>
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
//     </>
//   );
// }

// export default Users;










































// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import Toggle from 'react-toggle';
// import 'react-toggle/style.css';
// import Modal from 'react-bootstrap/Modal'; // Add this import


// function Users() {
//   const [data, setData] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [selectedRole, setSelectedRole] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showEditModal1, setShowEditModal1] = useState(false);

//   //////dropdown role////

//  const[role,setRole]=useState([])
//  const getApiData=async()=>{
//   const res=await axios.get("http://localhost:5000/api/admin/role");
//   await setRole(res.data)
//  };
//  useEffect(()=>
//  {getApiData();
//      },[])



//   //model update backend se only four data ko fetch kar rha hu
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     qualification: '',
//     address: '',
  
//   });

//   const getData = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/admin/viewusers");
//       setData(res.data);
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   const handleStatusToggle = (item) => {
//     // Toggle the status locally for immediate UI feedback
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

//     // Send a PUT request to update the status in the backend
//     axios.put(`http://localhost:5000/api/admin/updateuserstatus/${item.id}`, {
//       status: item.status === 'active' ? 'deactive' : 'active',
//     })
//       .then((response) => {
//         console.log('User status updated:', response.data);
//       })
//       .catch((error) => {
//         console.error('Error updating user status:', error);
//         // Revert the status change if the API request fails
//         setData(data.map((user) => (user.id === item.id ? { ...user, status: item.status } : user)));
//       });
//   };

//   const handleEditClick = (user) => {
//     setSelectedUser(user);
//     setFormData({
//       name: user.name,
//       email: user.email,
//       qualification: user.qualification,
//       address: user.address,
//       // Set other form fields here based on your data structure
//     });
//     setShowEditModal(true);
//   };



//   const handleCloseEditModal = () => {
//     setShowEditModal(false);
//     setSelectedUser(null);
//     setFormData({
//       name: '',
//       email: '',
//       qualification: '',
//       address:'',
//       // Reset other form fields as needed
//     });
//   };


// const handleUpdateUser = () => {
//   // Make an API request to update the user with the formData
//   axios
//     .put(`http://localhost:5000/api/admin/updateuser/${selectedUser.id}`, formData)
//     .then((response) => {
//       console.log('User updated successfully:', response.data);
//       // Update the user data on the frontend (you can update your state or refetch the data)
//       // For example, if you are updating the data in your state:
//       const updatedData = data.map((user) =>
//         user.id === selectedUser.id ? { ...user, ...formData } : user
//       );
//       setData(updatedData);
//       // Close the edit modal
//       handleCloseEditModal();
//     })
//     .catch((error) => {
//       console.error('Error updating user:', error);
//       // Handle the error as needed
//     });
// };





// //role wale///
// const handleEditClick1 = (role) => {
//   setSelectedUser(role);
//   setRole({
//     id: role.id,
//     roleid: role.roleid,
 
//   });
//   setShowEditModal1(true);
// };

// const handleCloseEditModal1 = () => {
//   setShowEditModal1(false);
//   setSelectedRole(null);
//   setRole([]);
// };

//   return (
//     <>
//       <div className='px-5 py-3'>
//         <div className='d-flex justify-content-center'>
//           <h3>User List</h3>
//         </div>
//         <Link to="/adduser" className='btn btn-success'>Add User</Link>
//         <div className='mt-3'>
//           <table className='table'>
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
//               {data.map((item, index) => (
//                 <tr key={item.id}>
//                   <td>{item.id}</td>
//                   <td>{item.name}</td>
//                   <td>
//                     <img
//                       style={{ height: '50px', width: '50px' }}
//                       src={item.photo}
//                       alt={item.name}
//                     />
//                   </td>
//                   <td>{item.email}</td>
//                   <td>{item.address}</td>
//                   <td>{item.qualification}</td>
//                   <td>
//                     <Toggle
//                       id={`status-toggle-${item.id}`}
//                       name="status"
//                       defaultChecked={item.status === 'active'}
//                       onChange={() => handleStatusToggle(item)}
//                     />
//                   </td>
//                   <td>
//                     <Link
//                       onClick={() => handleEditClick(item)} // Open the edit modal
//                       className='btn btn-primary btn-sm me-1'
//                     >
//                       Update
//                     </Link>
                   
//                   </td>
//                   <td>
//                     <Link
//                       onClick={() => handleEditClick1(item)} // Open the edit modal
//                       className='btn btn-primary btn-sm me-3'
//                     >
//                       Assign  Role
//                     </Link>
//                     <button
//                        // Handle details click (you can implement this)
//                       className='btn btn-sm btn-danger'
//                     >
//                       Details
//                     </button>
//                   </td>

//                 </tr>
//               ))}
//             </tbody>
//           </table>
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
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="email" className="form-label">Email</label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 />
//               </div>


//               <div className="mb-3">
//     <label htmlFor="qualification" className="form-label">Qualification</label>
//     <input
//       type="text"
//       className="form-control"
//       id="qualification"
//       name="qualification"
//       value={formData.qualification}
//       onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
//     />
//   </div>
//   <div className="mb-3">
//     <label htmlFor="address" className="form-label">Address</label>
//     <input
//       type="text"
//       className="form-control"
//       id="address"
//       name="address"
//       value={formData.address}
//       onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//     />
//   </div>
              

//               {/* Add other form fields for password, mobile, photo, etc. */}
//             </form>
//           </Modal.Body>
//           <Modal.Footer>
//             <button className="btn btn-secondary" onClick={handleCloseEditModal}>Close</button>
//             <button className="btn btn-primary" onClick={handleUpdateUser}>Update</button>
//           </Modal.Footer>
//         </Modal>
//       )}
//       {/* Edit Role Modal */}
//       {selectedRole && (
//         <Modal show={showEditModal1} onHide={handleCloseEditModal1}>
//           <Modal.Header closeButton>
//             <Modal.Title>Edit Role</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <form>
//               <div className="mb-3">
//                 <label htmlFor="name" className="form-label">Enter User Id</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="id"
//                   name="id"
//                   value={formData.id}
//                   onChange={(e) => setRole({ ...formData, id: e.target.value })}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="email" className="form-label">Select Role Name</label>
//                {
//                 role.map((item,index)=>{
//                   return(
//                     <option value={item.roleid}>{item.roleid}{item.rolename}</option>
//                   )
//                 })
//                }
//               </div>

//             </form>
//           </Modal.Body>
//           <Modal.Footer>
//             <button className="btn btn-secondary" onClick={handleCloseEditModal}>Close</button>
//             <button className="btn btn-primary" onClick={handleUpdateUser}>Update</button>
//           </Modal.Footer>
//         </Modal>
//       )}
//     </>
//   );
// }

// export default Users;







// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import Toggle from 'react-toggle';
// import 'react-toggle/style.css';

// function Users() {
//   const [data, setData] = useState([]);

//   const getData = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/admin/viewusers");
//       setData(res.data);
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);



//   const handleStatusToggle = (item) => {
//     // Toggle the status locally for immediate UI feedback
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

//     // Send a PUT request to update the status in the backend
//     axios.put(`http://localhost:5000/api/admin/updateuserstatus/${item.id}`, {
//       status: item.status === 'active' ? 'deactive' : 'active',
//     })
//       .then((response) => {
//         console.log('User status updated:', response.data);
//       })
//       .catch((error) => {
//         console.error('Error updating user status:', error);
//         // Revert the status change if the API request fails
//         setData(data.map((user) => (user.id === item.id ? { ...user, status: item.status } : user)));
//       });
//   };

//   return (
//     <>
//       <div className='px-5 py-3'>
//         <div className='d-flex justify-content-center'>
//           <h3>User List</h3>
//         </div>
//         <Link to="/adduser" className='btn btn-success'>Add User</Link>
//         <div className='mt-3'>
//           <table className='table'>
//             <thead>
//               <tr>
//                 <th className="text-center">S No.</th>
//                 <th className="text-center">Name</th>
//                 <th className="text-center">Photo</th>
//                 <th className="text-center">Email</th>
//                 <th className="text-center">Address</th>
//                 <th className="text-center">Status</th>
//                 <th className="text-center">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((item, index) => (
//                 <tr key={item.id}>
//                   <td>{index + 1}</td>
//                   <td>{item.name}</td>
//                   <td>
//                     <img
//                       style={{ height: '50px', width: '50px' }}
//                       src={item.photo}
//                       alt={item.name}
//                     />
//                   </td>
//                   <td>{item.email}</td>
//                   <td>{item.address}</td>
//                   <td>
//                     <Toggle
//                       id={`status-toggle-${item.id}`}
//                       name="status"
//                       defaultChecked={item.status === 'active'}
//                       onChange={() => handleStatusToggle(item)}
//                     />
//                   </td>
//                   <td>
//                     <Link className='btn btn-primary btn-sm me-3'>Update</Link>
//                     <button className='btn btn-sm btn-danger'>Details</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Users;


// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import Toggle from 'react-toggle';
// import 'react-toggle/style.css';


// function Users() {
//   const [data, setData] = useState([]);

//   const getData = async () => {
//     const res = await axios.get("http://localhost:5000/api/admin/viewusers");
//     console.log(res)
//     setData(res.data);
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   const handleDelete = (uid) => {
//     axios.delete('http://localhost:5000/api/admin/deleteuser/' + uid)
//       .then(res => {
//         if (res.data.Status === "Success") {
//           window.location.reload(true);
//         } else {
//           alert("Error");
//         }
//       })
//       .catch(err => console.log(err));
//   };

//   const handleStatusToggle = (item) => {
//     const updatedData = data.map((user) => {
//       if (user.uid === item.uid) {
//         return {
//           ...user,
//           status: user.status === 'active' ? 'inactive' : 'active',
//         };
//       }
//       return user;
//     });

//     setData(updatedData);
//   };

//   return (
//     <>
//       <div className='px-5 py-3'>
//         <div className='d-flex justify-content-center'>
//           <h3>User List</h3>
//         </div>
//         <Link to="/adduser" className='btn btn-success'>Add User</Link>
//         <div className='mt-3'>
//           <table className='table'>
//             <thead>
//               <tr>
//                 <th className="text-center">S No.</th>
//                 <th className="text-center">Name</th>
//                 <th className="text-center">Photo</th>
//                 <th className="text-center">Email</th>
//                 <th className="text-center">Address</th>
//                 <th className="text-center">Status</th>
//                 <th className="text-center">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((item, index) => (
//                 <tr key={item.id}>
//                   <td>{index + 1}</td>
//                   <td>{item.name}</td>
//                   <td>
//                     <img
//                       style={{ height: '50px', width: '50px' }}
//                       src={item.photo}
//                       alt={item.name}
//                     />
//                   </td>
//                   <td>{item.email}</td>
//                   <td>{item.address}</td>
//                   <td>
//                     <Toggle
//                       id={`status-toggle-${item.id}`}
//                       name="status"
//                       defaultChecked={item.status === 'active'}
//                       onChange={() => handleStatusToggle(item)}
//                     />
//                   </td>
//                   <td>
//                     <Link to={`/api/admin/userupdate/${item.id}`} className='btn btn-primary btn-sm me-3'>Update</Link>
//                     <button onClick={() => handleDelete(item.id)} className='btn btn-sm btn-danger'>Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Users;
