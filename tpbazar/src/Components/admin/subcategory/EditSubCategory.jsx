
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
function EditSubCategory() {
    const [data, setData] = useState({
        subcategoryname: '',
    })
    const navigate = useNavigate()
    const { subcategoryid } = useParams();
    ////for update data
    useEffect(() => {
        axios.get('http://localhost:5000/api/admin/subcategory/viewsabcategory' + subcategoryid)
            .then(res => {
                setData({
                    ...data, subcategoryname: res.data.Result[0].subcategoryname,
                })
            })
            .catch(err => console.log(err));
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:5000/api/admin/subcategory/updatesubcategory/:subcategoryid' + subcategoryid, data)
            .then(res => {
                if (res.data.status === "success") {
                    navigate('/subcategory')
                }
            })
            .catch(err => console.log(err));
    }
    return (
<>
<div className='d-flex flex-column align-items-center pt-4'>
            <h2>Update SubCategory</h2>
            <form class="row g-3 w-50" onSubmit={handleSubmit}>
                <div class="col-12">
                    <label for="Inputsubcategoryid" class="form-label">SubCategory ID</label>
                    <input type="text" class="form-control" id="Inputsubcategoryid" placeholder='Enter subcategory ID' autoComplete='off'
                        onChange={e => setData({ ...data, subcategoryid: e.target.value })} value={data.subcategoryid} />
                </div>
                <div class="col-12">
                    <label for="Inputsubcategoryname" class="form-label">SubCategory Name</label>
                    <input type="text" class="form-control" id="Inputsubcategoryname" placeholder='Enter subcategory Name' autoComplete='off'
                        onChange={e => setData({ ...data, subcategoryname: e.target.value })} value={data.subcategoryname} />
                </div>
                <div class="col-12">
                    <label for="Inputphoto" class="form-label">Photo</label>
                    <input type="file" class="form-control" id="Inputphoto" placeholder='Enter photo' autoComplete='off'
                        onChange={e => setData({ ...data, photo: e.target.files[0] })} value={data.photo} />
                </div>
               
                <div class="col-12"> 
                
                    <button type="submit" class="btn btn-primary">Save</button>
                </div>
            </form>
        </div>
</>
    )
}
export default EditSubCategory

// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

// function EditSubCategory() {
//   const [data, setData] = useState({
//     subcategoryid: '',
//     subcategoryname: '',
//     photo: '',
//   });

//   const navigate = useNavigate();
//   const { Subcategoryid } = useParams();

//   // For updating data
//   useEffect(() => {
//     axios
//       .get('http://localhost:5000/api/admin/subcategory/viewsubcategory' + Subcategoryid)
//       .then((res) => {
//         setData({
//           ...data,
//           Subcategoryid: res.data.Result[0].subcategoryid,
//           Subcategoryname: res.data.Result[0].subcategoryname,
//           photo: res.data.Result[0].photo,
//         });
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   const handleSubmit = (event) => {
//     event.preventDefault();


//     axios.put('http://localhost:5000/api/admin/subcategory/updatesubcategory' + Subcategoryid, data)
//       .then((res) => {
//         if (res.data.status === "success") {
//           navigate('/subcategory');
//         }
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <div>
//       <div className='d-flex flex-column align-items-center pt-4'>
//         <h2>Update Subcategory</h2>
//         <form className="row g-3 w-50" onSubmit={handleSubmit}>
//           <div className="col-12">
//             <label htmlFor="InputPcategoryid" className="form-label">
//               Pcategory ID
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="InputPcategoryid"
//               placeholder="Enter Pcategory ID"
//               autoComplete="off"
//               onChange={(e) =>
//                 setData({ ...data, Pcategoryid: e.target.value })
//               }
//               value={data.Pcategoryid}
//             />
//           </div>
//           <div className="col-12">
//             <label htmlFor="InputSubcategoryid" className="form-label">
//               Subcategory ID
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="InputSubcategoryid"
//               placeholder="Enter Subcategory ID"
//               autoComplete="off"
//               onChange={(e) =>
//                 setData({ ...data, Subcategoryid: e.target.value })
//               }
//               value={data.Subcategoryid}
//             />
//           </div>
//           <div className="col-12">
//             <label htmlFor="InputSubcategoryname" className="form-label">
//               Subcategory Name
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="InputSubcategoryname"
//               placeholder="Enter Name"
//               autoComplete="off"
//               onChange={(e) =>
//                 setData({ ...data, Subcategoryname: e.target.value })
//               }
//               value={data.Subcategoryname}
//             />
//           </div>
//           <div className="col-12">
//             <label htmlFor="InputPhoto" className="form-label">
//               Photo
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="InputPhoto"
//               placeholder="Enter Photo URL"
//               autoComplete="off"
//               onChange={(e) => setData({ ...data, photo: e.target.value })}
//               value={data.photo}
//             />
//           </div>

//           <div className="col-12">
//             <button type="submit" className="btn btn-primary">
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//     </div> 
//   );
// }

// export default EditSubCategory;