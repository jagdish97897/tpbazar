import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddOffer() {
  const [data, setData] = useState({
    offerid: '',
    offername: '',
    percentage_discount: '',
    flat_discount: '',
    upto_discount: '',
    valid_from: '',
    valid_to: '',
    Subcategoryid: '',
    terms_and_condition: '',
    status: '',
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post('http://localhost:5000/api/admin/offer/createoffer', data)
      .then((res) => {
        console.log('Offer added successfully');
        navigate('/offer'); // Redirect to the offers page after successful submission
      })
      .catch((err) => {
        console.error('Error creating offer:', err);
      });
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Add Offers</h2>
      <form className="row g-3 w-50" onSubmit={handleSubmit}>
        <div className="col-6">
          <label htmlFor="inputOfferid" className="form-label">
            Offer ID
          </label>
          <input
            type="text"
            className="form-control"
            id="inputOfferid"
            placeholder="Enter Offer ID"
            autoComplete="off"
            value={data.offerid}
            onChange={(e) => setData({ ...data, offerid: e.target.value })}
          />
        </div>
        <div className="col-6">
          <label htmlFor="inputOffername" className="form-label">
            Offer Name
          </label>
          <input
            type="text"
            className="form-control"
            id="inputOffername"
            placeholder="Enter Offer Name"
            autoComplete="off"
            value={data.offername}
            onChange={(e) => setData({ ...data, offername: e.target.value })}
          />
        </div>
        <div className="col-6">
          <label htmlFor="inputPercentageDiscount" className="form-label">
            Percentage Discount
          </label>
          <input
            type="text"
            className="form-control"
            id="inputPercentageDiscount"
            placeholder="Enter Percentage Discount"
            autoComplete="off"
            value={data.percentage_discount}
            onChange={(e) =>
              setData({ ...data, percentage_discount: e.target.value })
            }
          />
        </div>
        <div className="col-6">
          <label htmlFor="inputFlatDiscount" className="form-label">
            Flat Discount
          </label>
          <input
            type="text"
            className="form-control"
            id="inputFlatDiscount"
            placeholder="Enter Flat Discount"
            autoComplete="off"
            value={data.flat_discount}
            onChange={(e) => setData({ ...data, flat_discount: e.target.value })}
          />
        </div>
        <div className="col-6">
          <label htmlFor="inputUptoDiscount" className="form-label">
            Upto Discount
          </label>
          <input
            type="text"
            className="form-control"
            id="inputUptoDiscount"
            placeholder="Enter Upto Discount"
            autoComplete="off"
            value={data.upto_discount}
            onChange={(e) => setData({ ...data, upto_discount: e.target.value })}
          />
        </div>
        <div className="col-6">
          <label htmlFor="inputValidFrom" className="form-label">
            Valid From
          </label>
          <input
            type="date"
            className="form-control"
            id="inputValidFrom"
            autoComplete="off"
            value={data.valid_from}
            onChange={(e) => setData({ ...data, valid_from: e.target.value })}
          />
        </div>
        <div className="col-6">
          <label htmlFor="inputValidTo" className="form-label">
            Valid To
          </label>
          <input
            type="date"
            className="form-control"
            id="inputValidTo"
            autoComplete="off"
            value={data.valid_to}
            onChange={(e) => setData({ ...data, valid_to: e.target.value })}
          />
        </div>
        <div className="col-6">
          <label htmlFor="inputSubcategoryid" className="form-label">
            Subcategory ID
          </label>
          <input
            type="text"
            className="form-control"
            id="inputSubcategoryid"
            placeholder="Enter Subcategory ID"
            autoComplete="off"
            value={data.Subcategoryid}
            onChange={(e) =>
              setData({ ...data, Subcategoryid: e.target.value })
            }
          />
        </div>
        <div className="col-6">
          <label htmlFor="inputTermsCondition" className="form-label">
            Terms and Condition
          </label>
          <textarea
            className="form-control"
            id="inputTermsCondition"
            rows="4"
            placeholder="Enter Terms and Condition"
            value={data.terms_and_condition}
            onChange={(e) =>
              setData({ ...data, terms_and_condition: e.target.value })
            }
          ></textarea>
        </div>
        <div className="col-6">
          <label htmlFor="inputStatus" className="form-label">
            Status
          </label>
          <input
            type="text"
            className="form-control"
            id="inputStatus"
            placeholder="Enter Status"
            autoComplete="off"
            value={data.status}
            onChange={(e) => setData({ ...data, status: e.target.value })}
          />
        </div>
        <div className="col-6">
          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddOffer;