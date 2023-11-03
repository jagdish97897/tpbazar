import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import './asignrole.css';

function AsignRole() {
  const [data, setData] = useState({
    id: '',
    roleid: '',
  });

  const [errors, setErrors] = useState({
    id: '',
    roleid: '',
  });

  const [item, setItem] = useState([]);


  const navigate = useNavigate();

  const handleSubmit = (event) => {
    axios
      .post('http://localhost:5000/api/admin/roleassign/addroleAssign', data)
      .then((res) => {
        navigate('/asignrole');
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/admin/roleassign/getroleAssign')
      .then((res) => {
        if (res.status === 200) {
          setItem(res.data);
        } else {
          alert('Error');
        }
      })
      .catch((err) => console.log(err));
  }, []);



  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div className="Role">
          <Form onSubmit={handleSubmit}>
            <h4>Add New</h4>
            <br />
            <Form.Label>
              <h6>Id</h6>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Id"
              onChange={e => setData({ ...data, id: e.target.value })}
            />
            <div className="text-danger">{errors.id}</div>
            <br />
            <Form.Label>
              <h6>Roleid</h6>
            </Form.Label>
            <Form.Control
              type="text"  
              placeholder="Enter Roleid"
              onChange={(e) => setData({ ...data, roleid: e.target.value })}
            />
            <div className="text-danger">{errors.roleid}</div>
            <Button className="btnrole" variant="info" type="submit">
              Save
            </Button>
            <br />
          </Form>
        </div>

        <div className="table4">
          <h4>Roleasign List</h4>
        
          <Table striped bordered hover>
            <thead>
              <tr>
                <th> Id</th>
                <th>Roleid</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {item.map((product, index) => (
                <tr key={index}>
                  <td>{product.id}</td>
                  <td>{product.roleid}</td>
                  <td>
                    <Link
                      to={`/editasignrole/` + product.id}
                      className="btn btn-primary"
                    >
                      Update
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
    
        </div>
      </div>
    </div>
  );
}

export default AsignRole;