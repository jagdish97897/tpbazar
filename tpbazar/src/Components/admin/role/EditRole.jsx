import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
function EditRole() {
    const [data, setData] = useState({
        rolename: '',
    })
    const navigate = useNavigate()
    const { roleid } = useParams();
    ////for update data
    useEffect(() => {
        axios.get('http://localhost:5000/api/admin/role' + roleid)
            .then(res => {
                setData({
                    ...data, rolename: res.data.Result[0].rolename,
                })
            })
            .catch(err => console.log(err));
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:5000/api/admin/roles/updaterole/:roleid' + roleid, data)
            .then(res => {
                if (res.data.status === "success") {
                    navigate('/role')
                }
            })
            .catch(err => console.log(err));
    }
    return (
<>
<div className='d-flex flex-column align-items-center pt-4'>
            <h2>Update Role</h2>
            <form class="row g-3 w-50" onSubmit={handleSubmit}>
                <div class="col-12">
                    <label for="InputRoleid" class="form-label">Role ID</label>
                    <input type="text" class="form-control" id="InputRoleid" placeholder='Enter ID' autoComplete='off'
                        onChange={e => setData({ ...data, roleid: e.target.value })} value={data.roleid} />
                </div>
                <div class="col-12">
                    <label for="inputName" class="form-label">Role Name</label>
                    <input type="text" class="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
                        onChange={e => setData({ ...data, rolename: e.target.value })} value={data.rolename} />
                </div> 
                <div class="col-12"> 
                
                    <button type="submit" class="btn btn-primary">Save</button>
                </div>
            </form>
        </div>
</>
    )
}
export default EditRole