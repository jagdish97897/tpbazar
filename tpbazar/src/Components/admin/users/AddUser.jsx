



import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Country, State, City } from 'country-state-city';
import './adduser.css';

function AddUser() {
    const [data, setData] = useState({
		id: '',
		name: '',
		email: '',
		password: '', 
		mobile: '',
		photo: '',
		aadhaar: '',
		doj: '',
		qualification: '',
		dob: '',
		address: '',
		country: '',
		state: '',
		city: '',
		pin: '',
		
	})
	const [countries, setCountries] = useState([]);
	const [states, setStates] = useState([]);
	const [cities, setCities] = useState([]);
  
	useEffect(() => {
	  const loadCountries = async () => {
		try {
		  const countryList = await Country.getAllCountries();
		  setCountries(countryList);
		} catch (err) {
		  console.log(err);
		}
	  };
  
	  loadCountries();
	}, []);
  
	const handleCountryChange = (selectedCountryCode) => {
	  const selectedCountry = countries.find((country) => country.isoCode === selectedCountryCode);
	  if (selectedCountry) {
		const countryCode = selectedCountry.isoCode;
		const loadStates = async () => {
		  try {
			const stateList = await State.getStatesOfCountry(countryCode);
			setStates(stateList);
		  } catch (err) {
			console.log(err);
		  }
		};
		loadStates();
	  } else {
		setStates([]);
	  }
	};
  
	const handleStateChange = (selectedStateCode) => {
	  const selectedState = states.find((state) => state.isoCode === selectedStateCode);
	  if (selectedState) {
		const stateCode = selectedState.isoCode;
		const loadCities = async () => {
		  try {
			const cityList = City.getCitiesOfState(data.country, stateCode);
			setCities(cityList);
		  } catch (err) {
			console.log(err);
		  }
		};
		loadCities();
	  } else {
		setCities([]);
	  }
	};
  
	const navigate = useNavigate();
  
	const handleSubmit = (event) => {
	  event.preventDefault();
  
	  const formdata = new FormData();
	  formdata.append("id", data.id);
	  formdata.append("name", data.name);
	  formdata.append("email", data.email);
	  formdata.append("aadhaar", data.aadhaar);
	  formdata.append("qualification", data.qualification);
	  formdata.append("address", data.address);
	  formdata.append("mobile", data.mobile);
	  formdata.append("photo", data.photo);
	  formdata.append("dob", data.dob);
	  formdata.append("doj", data.doj);
	  formdata.append("country", data.country); // Add country to form data
	  formdata.append("state", data.state);
	  formdata.append("city", data.city);
	  formdata.append("pin", data.pin);
	  formdata.append("status", data.status);
	  formdata.append("password", data.password);
  
	  axios
		.post('http://localhost:5000/api/admin/adduser', formdata)
		.then((res) => {
		  navigate('/users');
		})
		.catch((err) => console.log(err));
	};
  return (
<>
<div  className='d-flex flex-column align-items-center pt-4  '>
  <h2>Add Employee</h2>

  <form className="row g-6 w-50 bordered-form " onSubmit={handleSubmit}>

    <div className="col-4">
      <label htmlFor="inputid" className="form-label">Enter ID</label>
      <input type="text" className="form-control" id="inputuid" placeholder='Enter ID' autoComplete='off'
        onChange={e => setData({ ...data, id: e.target.value })} />
    </div>
    <div className="col-4">
      <label htmlFor="inputName" className="form-label">Enter Name</label>
      <input type="text" className="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
        onChange={e => setData({ ...data, name: e.target.value })} />
    </div>
    <div className="col-4">
      <label htmlFor="inputEmail4" className="form-label">Enter Email</label>
      <input type="email" className="form-control" id="inputEmail4" placeholder='Enter Email' autoComplete='off'
        onChange={e => setData({ ...data, email: e.target.value })} />
    </div>
    <div className="col-4">
      <label htmlFor="inputPassword4" className="form-label">Enter Password</label>
      <input type="password" className="form-control" id="inputPassword" placeholder="Enter Password" autoComplete="current-password"
        onChange={e => setData({ ...data, password: e.target.value })} />
    </div>
    <div className="col-4">
      <label htmlFor="inputMobile" className="form-label">Enter Mobile Number</label>
      <input type="text" className="form-control" id="inputMobile" placeholder="Enter Mobile" autoComplete='off'
        onChange={e => setData({ ...data, mobile: e.target.value })} />
    </div>
    <div className="col-4">
      <label htmlFor="inputGroupFile01" className="form-label">Select Photo</label>
      <input type="file" className="form-control" id="inputGroupFile01" placeholder="Enter Photo" autoComplete='off'
        onChange={e => setData({ ...data, photo: e.target.files[0] })} />
    </div>
    <div className="col-4">
      <label htmlFor="inputAadhaar" className="form-label">Enter Aadhaar Number</label>
      <input type="text" className="form-control" id="inputAadhaar" placeholder="Enter Aadhaar" autoComplete='off'
        onChange={e => setData({ ...data, aadhaar: e.target.value })} />
    </div>
    <div className="col-4">
      <label htmlFor="inputDob" className="form-label">Enter Date of Birth</label>
      <input type="date" className="form-control" id="inputDob" placeholder="Enter Date" autoComplete='off'
        onChange={e => setData({ ...data, dob: e.target.value })} />
    </div>
    <div className="col-4">
      <label htmlFor="inputQualification" className="form-label">Enter Qualification</label>
      <input type="text" className="form-control" id="inputQualification" placeholder="Qualification" autoComplete='off'
        onChange={e => setData({ ...data, qualification: e.target.value })} />
    </div>

    <div className="col-4">
      <label htmlFor="inputDoj" className="form-label">Date of Joining</label>
      <input type="date" className="form-control" id="inputDoj" placeholder="Enter Date" autoComplete='off'
        onChange={e => setData({ ...data, doj: e.target.value })} />
    </div>
    <div className="col-4">
      <label htmlFor="inputAddress" className="form-label">Enter Address</label>
      <input type="text" className="form-control" id="inputAddress" placeholder="Enter Address" autoComplete='off'
        onChange={e => setData({ ...data, address: e.target.value })} />
    </div>

    <div className="col-4">
      <label htmlFor="inputCountry" className="form-label">Country</label>
      <select
        className="form-select"
        id="inputCountry"
        value={data.country}
        onChange={(e) => {
          setData({ ...data, country: e.target.value, state: '', city: '' });
          handleCountryChange(e.target.value);
        }}
      >
        <option value="">Select country</option>
        {countries.map((country, index) => (
          <option key={index} value={country.isoCode}>
            {country.name}
          </option>
        ))}
      </select>
    </div>

    <div className="col-4">
      <label htmlFor="inputState" className="form-label">State</label>
      <select
        className="form-select"
        id="inputState"
        value={data.state}
        onChange={(e) => {
          setData({ ...data, state: e.target.value, city: '' });
          handleStateChange(e.target.value);
        }}
      >
        <option value="">Select state</option>
        {states.map((state, index) => (
          <option key={index} value={state.isoCode}>
            {state.name}
          </option>
        ))}
      </select>
    </div>

    <div className="col-4">
      <label htmlFor="inputCity" className="form-label">
        City
      </label>
      <select
        className="form-select"
        id="inputCity"
        value={data.city}
        onChange={(e) => setData({ ...data, city: e.target.value })}
      >
        <option value="">Select city</option>
        {cities
          .map((city, index) => (
            <option key={index} value={city.name}>
              {city.name}
            </option>
          ))
          .reverse()} {/* Reverse the order of the options */}
      </select>
    </div>

    <div className="col-4">
      <label htmlFor="inputPin" className="form-label">Enter Pin Code</label>
      <input type="text" className="form-control" id="inputPin" placeholder="Enter Pin" autoComplete='off'
        onChange={e => setData({ ...data, pin: e.target.value })} />
    </div>

    <div className="col-12 d-flex justify-content-center">
      <button type="submit" className="btn btn-primary">Submit</button>
    </div>

  </form>
</div>

</>
  )
}
export default AddUser



// import axios from 'axios';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './adduser.css';

// function AddUser() {
//     const [data, setData] = useState({
// 		id: '',
// 		name: '',
// 		email: '',
// 		password: '', 
// 		mobile: '',
// 		photo: '',
// 		aadhaar: '',
// 		doj: '',
// 		qualification: '',
// 		dob: '',
// 		address: '',
// 		country: '',
// 		state: '',
// 		city: '',
// 		pin: '',
		
// 	})
// 	const navigate = useNavigate()
// 	const handleSubmit = (event) => {
// 		event.preventDefault();
// 		const formdata = new FormData();
// 		formdata.append("id", data.id);
// 		formdata.append("name", data.name);
// 		formdata.append("email", data.email);
// 		formdata.append("password", data.password);
// 		formdata.append("mobile", data.mobile);
// 		formdata.append("photo", data.photo);
// 		formdata.append("aadhaar", data.aadhaar);
// 		formdata.append("doj", data.doj);
// 		formdata.append("qualification", data.qualification);
// 		formdata.append("dob", data.dob);
// 		formdata.append("address", data.address);
// 		formdata.append("country", data.country);
// 		formdata.append("state", data.state);
// 		formdata.append("city", data.city);
// 		formdata.append("pin", data.pin);
// 		axios.post('http://localhost:5000/api/admin/adduser', formdata)
// 			.then(res => {
// 				navigate('/users')
// 			})
// 			.catch(err => console.log(err));
// 	}
//   return (
// <>
// <div className='d-flex flex-column align-items-center pt-4'>
// 			<h2>Add Employee</h2>
			
// 			<form className="row g-6 w-50 bordered-form " onSubmit={handleSubmit}>
			
// 				<div className="col-4">
// 					<label for="inputid" className="form-label ">Enter id</label>
// 					<input type="text" className="form-control" id="inputuid" placeholder='Enter id' autoComplete='off'
// 							onChange={e => setData({ ...data, id: e.target.value })} />
// 				</div>
// 				<div className="col-4">
// 					<label for="inputName" className="form-label">Enter Name</label>
// 					<input type="text" className="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
// 						onChange={e => setData({ ...data, name: e.target.value })} />
// 				</div>
// 				<div className="col-4">
// 					<label for="inputEmail4" className="form-label">Enter Email</label>
// 					<input type="email" className="form-control" id="inputEmail4" placeholder='Enter Email' autoComplete='off'
// 						onChange={e => setData({ ...data, email: e.target.value })} />
// 				</div>
// 				<div className="col-4">
// 					<label for="inputPassword4" className="form-label">Enter Password</label>
// 					<input type="password" className="form-control" id="inputPassword" placeholder="Enter Password" autocomplete="current-password"

// 						onChange={e => setData({ ...data, password: e.target.value })} />
// 				</div>
// 				<div className="col-4">
// 					<label for="inputMobile" className="form-label">Enter Mobile Number</label>
// 					<input type="text" className="form-control" id="inputMobile" placeholder="Enter Mobile" autoComplete='off'
// 						onChange={e => setData({ ...data, mobile: e.target.value })} />
// 				</div>
// 				<div className="col-4">
// 					<label for="inputGroupFile01" className="form-label">Select Photo</label>
// 					<input type="file" className="form-control" id="inputGroupFile01" placeholder="Enter Photo" autoComplete='off'
// 						onChange={e => setData({ ...data, photo: e.target.files[0] })} />
// 				</div>
// 				<div className="col-4">
// 					<label for="inputAadhaar" className="form-label">Enetr Aadhaar Number</label>
// 					<input type="text" className="form-control" id="inputAadhaar" placeholder="Enter Aadhaar" autoComplete='off'
// 						onChange={e => setData({ ...data, aadhaar: e.target.value })} />
// 				</div> 
// 				<div className="col-4">
// 					<label for="inputDob" className="form-label">Enter Date of Birth</label>
// 					<input type="date" className="form-control" id="inputDob" placeholder="Enter Date" autoComplete='off'
// 						onChange={e => setData({ ...data, dob: e.target.value })} />
// 				</div>
// 				<div className="col-4">
// 					<label for="inputQualification" className="form-label">Enter Qualification</label>
// 					<input type="text" className="form-control" id="inputQualification" placeholder="Qualification" autoComplete='off'
// 						onChange={e => setData({ ...data, qualification: e.target.value })} />
// 				</div>
				
// 				<div className="col-4">
// 					<label for="inputDoj" className="form-label">Date of Joining</label>
// 					<input type="date" className="form-control" id="inputDoj" placeholder="Enter Date" autoComplete='off'
// 						onChange={e => setData({ ...data, doj: e.target.value })} />
// 				</div>
// 				<div className="col-4">
// 					<label for="inputAddress" className="form-label">Enter Address</label>
// 					<input type="text" className="form-control" id="inputAddress" placeholder="Enter Address" autoComplete='off'
// 						onChange={e => setData({ ...data, address: e.target.value })} />
// 				</div>
// 				<div className="col-4">
// 					  <label htmlFor="inputCountry" className="form-label">Enter Country</label>
// 					  <input
// 						  type="text"
// 						  className="form-control"
// 						  id="inputCountry"
// 						  placeholder="Enter Country"
// 						  autoComplete="off"
// 						  onChange={e => setData({ ...data, country: e.target.value })}
// 					  />
// 				  </div>
// 				<div className="col-4">
// 					<label for="inputState" className="form-label">Enter State</label>
// 					<input type="text" className="form-control" id="inputState" placeholder="Enter State" autoComplete='off'
// 						onChange={e => setData({ ...data, state: e.target.value })} />
// 				</div>
// 				<div className="col-4">
// 					<label for="inputCity" className="form-label">Enter City</label>
// 					<input type="text" className="form-control" id="inputCity" placeholder="Enter City" autoComplete='off'
// 						onChange={e => setData({ ...data, city: e.target.value })} />
// 				</div>
// 				<div className="col-4">
// 					<label for="inputPin" className="form-label">Enter Pin Code</label>
// 					<input type="text" className="form-control" id="inputPin" placeholder="Enter Pin" autoComplete='off'
// 						onChange={e => setData({ ...data, pin: e.target.value })} />
// 				</div>
				
// 				<div className="col-4">
// 					<button type="submit" className="btn btn-primary ">Submit</button>
// 				</div>
// 			</form>
// 		</div>
// </>
//   )
// }
// export default AddUser






// import axios from 'axios';
// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import './user.css'


// function AddUser() {
//     const [data, setData] = useState({
// 		id: '',
// 		name: '',
// 		email: '',
// 		password: '', 
// 		mobile: '',
// 		photo: '',
// 		aadhaar: '',
// 		doj: '',
// 		qualification: '',
// 		dob: '',
// 		address: '',
// 		state: '',
// 		city: '',
// 		pin: '',
// 		status: ''
// 	})
// 	const navigate = useNavigate()
// 	const handleSubmit = (event) => {
// 		event.preventDefault();
// 		const formdata = new FormData();
// 		formdata.append("id", data.id);
// 		formdata.append("name", data.name);
// 		formdata.append("email", data.email);
// 		formdata.append("password", data.password);
// 		formdata.append("mobile", data.mobile);
// 		formdata.append("photo", data.photo);
// 		formdata.append("aadhaar", data.aadhaar);
// 		formdata.append("doj", data.doj);
// 		formdata.append("qualification", data.qualification);
// 		formdata.append("dob", data.dob);
// 		formdata.append("address", data.address);
// 		formdata.append("state", data.state);
// 		formdata.append("city", data.city);
// 		formdata.append("pin", data.pin);
// 		formdata.append("status", data.status);
// 		axios.post('http://localhost:5000/api/admin/adduser', formdata)
// 			.then(res => {
// 				navigate('/users')
// 			})
// 			.catch(err => console.log(err));
// 	}
// 	const handleChange = (e) => {
// 		const { name, value } = e.target;
// 		setData({ ...data, [name]: value });
// 	  };
//   return (
// <>
// <div className='d-flex flex-column align-items-center pt-4'>
// 			<h2>Add Employee</h2>
// 			<form className="row g-3 w-50" onSubmit={handleSubmit}>
// 				<div className="col-4">
// 					<label for="inputid" className="form-label ">Enter Id</label>
// 					<input type="text" className="form-control" id="inputuid" placeholder='Enter id' autoComplete='off'
// 							onChange={e => setData({ ...data, id: e.target.value })} />
// 				</div>
// 				<div className="col-4">
// 					<label for="inputName" className="form-label">Enter Name</label>
// 					<input type="text" className="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
// 						onChange={e => setData({ ...data, name: e.target.value })} />
// 				</div>
// 				<div className="col-4">
// 					<label for="inputEmail4" className="form-label">Enter Email</label>
// 					<input type="email" className="form-control" id="inputEmail4" placeholder='Enter Email' autoComplete='off'
// 						onChange={e => setData({ ...data, email: e.target.value })} />
// 				</div>
// 				<div className="col-4">
// 					<label for="inputPassword4" className="form-label"> Enter Password</label>
// 					<input type="password" className="form-control" id="inputPassword" placeholder="Enter Password" autocomplete="current-password"

// 						onChange={e => setData({ ...data, password: e.target.value })} />
// 				</div>
// 				<div className="col-4">
// 					<label for="inputMobile" className="form-label">Enter Mobile Number</label>
// 					<input type="text" className="form-control" id="inputMobile" placeholder="Enter Mobile" autoComplete='off'
// 						onChange={e => setData({ ...data, mobile: e.target.value })} />
// 				</div>
// 				<div className="col-4">
// 					<label for="inputGroupFile01" className="form-label">Select Photo</label>
// 					<input type="file" className="form-control" id="inputGroupFile01" placeholder="Enter Photo" autoComplete='off'
// 						onChange={e => setData({ ...data, photo: e.target.files[0] })} />
// 				</div>
// 				<div className="col-4">
// 					<label for="inputAadhaar" className="form-label">Enter Aadhaar Number</label>
// 					<input type="text" className="form-control" id="inputAadhaar" placeholder="Enter Aadhaar" autoComplete='off'
// 						onChange={e => setData({ ...data, aadhaar: e.target.value })} />
// 				</div> 
				
// 				<div className="col-4">
// 					<label for="inputDob" className="form-label">Enter Date of Birth</label>
// 					<input type="date" className="form-control" id="inputDob" placeholder="Enter Date" autoComplete='off'
// 						onChange={e => setData({ ...data, dob: e.target.value })} />
// 				</div>
// 				<div className="col-4">
// 					<label for="inputQualification" className="form-label">Enter Qualification</label>
// 					<input type="text" className="form-control" id="inputQualification" placeholder="Qualification" autoComplete='off'
// 						onChange={e => setData({ ...data, qualification: e.target.value })} />
// 				</div>
// 				<div className="col-4">
// 					<label for="inputDoj" className="form-label">Enter Date of Joining</label>
// 					<input type="date" className="form-control" id="inputDoj" placeholder="Enter Date" autoComplete='off'
// 						onChange={e => setData({ ...data, doj: e.target.value })} />
// 				</div>
				
// 				<div className="col-4">
// 					<label for="inputAddress" className="form-label">Enter Address</label>
// 					<input type="text" className="form-control" id="inputAddress" placeholder="Enter Address" autoComplete='off'
// 						onChange={e => setData({ ...data, address: e.target.value })} />
// 				</div>
// 				<div className="col-4">
// 					<label for="inputState" className="form-label">Enter State</label>
// 					<input type="text" className="form-control" id="inputState" placeholder="Enter State" autoComplete='off'
// 						onChange={e => setData({ ...data, state: e.target.value })} />
// 				</div>
// 				<div className="col-4">
// 					<label for="inputCity" className="form-label">Enter City</label>
// 					<input type="text" className="form-control" id="inputCity" placeholder="Enter City" autoComplete='off'
// 						onChange={e => setData({ ...data, city: e.target.value })} />
// 				</div>
// 				<div className="col-4">
// 					<label for="inputPin" className="form-label">Enter Pin Code</label>
// 					<input type="text" className="form-control" id="inputPin" placeholder="Enter Pin" autoComplete='off'
// 						onChange={e => setData({ ...data, pin: e.target.value })} />
// 				</div>
// 				<div className="col-4">
// 				<label>Select Status:</label>
//         <select
//           name="status"
//           value={data.status}
//           onChange={handleChange}
//         >
//           <option value="active">Active</option>
//           <option value="deactive">Deactive</option>
//         </select>
// 				</div>
// 				<div className="col-4">
// 					<button type="submit" className="btn btn-primary">Create</button>
// 				</div>
// 			</form>
// 		</div>
// </>
//   )
// }

// export default AddUser
