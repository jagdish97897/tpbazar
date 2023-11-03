import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import moment from 'moment'
import './offer.css';

function Offers() {
  const [offers, setOffers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(4);

  useEffect(() => {
    const apiUrl = 'http://localhost:5000/api/admin/offer/viewoffer';

    axios.get(apiUrl)
      .then((response) => {
        setOffers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleStatusToggle = (offerId) => {
    // Simulated status toggle for demonstration purposes
    const updatedOffers = offers.map((offer) => {
      if (offer.offerid === offerId) {
        return {
          ...offer,
          status: offer.status === 'Active' ? 'Inactive' : 'Active',
        };
      }
      return offer;
    });

    setOffers(updatedOffers);
  };

  const filteredOffers = offers.filter((offer) =>
    offer.offername.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredOffers.length / perPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, filteredOffers.length);
  const offersToDisplay = filteredOffers.slice(startIndex, endIndex);

  return (
    <div>
      <div className='offer'>
        <br/>
        <h2>Offer List</h2>
      </div>

      <div className='searchbox'>
        <input
          type="text"
          placeholder="Search by offer name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <br />

      <Tabs
        defaultActiveKey="home"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="View">
          <table>
            <thead>
              <tr>
                <th>Offer Name</th>
                <th>Percentage Discount</th>
                <th>Flat Discount</th>
                <th>Upto Discount</th>
                <th>Valid From</th>
                <th>Valid To</th>
                <th>Subcategory ID</th>
                <th>Terms and Condition</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {offersToDisplay.map((offer) => (
                <tr key={offer.offerid}>
                  <td>{offer.offername}</td>
                  <td>{offer.percentage_discount}</td>
                  <td>{offer.flat_discount}</td>
                  <td>{offer.upto_discount}</td>
                  <td>{moment(offer.valid_from).format('DD-MM-YYYY')}</td>
                  <td>{moment(offer.valid_to).format('DD-MM-YYYY')}</td>
                  <td>{offer.Subcategoryid}</td>
                  <td>{offer.terms_and_condition}</td>
                  <td>
                    <button
                      className={`toggle-button ${offer.status === "Active" ? 'active' : 'inactive'}`}
                      onClick={() => handleStatusToggle(offer.offerid)}
                    >
                      {offer.status}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <nav aria-label='Page navigation'>
            <ul className='pagination'>
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index + 1}
                  className={`page-item ${
                    currentPage === index + 1 ? 'active' : ''
                  }`}
                >
                  <button
                    className='page-link'
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </Tab>
        <Tab eventKey="profile" title="ADD">
          <Link to='/addOffer' className='btn btn-success'>
            Add Offers
          </Link>
        </Tab>
        <Tab eventKey="contact" title="Contact" disabled>
          Tab content for Contact
        </Tab>
      </Tabs>
    </div>
  );
}

export default Offers;