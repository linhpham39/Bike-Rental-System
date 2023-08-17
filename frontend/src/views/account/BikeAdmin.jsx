import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './BikeAdmin.css';

const BikeAdmin = () => {
  const [bikes, setBikes] = useState([]);
  const [filteredBikes, setFilteredBikes] = useState([]);
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [dock, setDock] = useState('');
  const [detail, setDetail] = useState('');
  const [imageUrls, setImageUrls] = useState('');
  const [price, setPrice] = useState(0);
  const [isAvailable, setIsAvailable] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  useEffect(() => {
    fetchBikes();
  }, []);

  useEffect(() => {
    filterBikes();
  }, [searchTerm, bikes]);

  const fetchBikes = async () => {
    try {
      const response = await axios.get('http://localhost:8000/bikes');
      setBikes(response.data);
    } catch (error) {
      console.error('Error fetching bikes:', error);
    }
  };

  const handleAddBike = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        'http://localhost:8000/bikes',
        {
          name,
          brand,
          model,
          dock,
          detail,
          imageUrls: imageUrls.split(',').map((imageUrl) => imageUrl.trim()),
          price,
          isAvailable,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success('Bike added successfully!');
        clearForm();
        fetchBikes();
      } else {
        console.error('Failed to add bike');
        toast.error('Failed to add bike');
      }
    } catch (error) {
      console.error('Error adding bike:', error);
      toast.error('Error adding bike');
    }
  };

  const handleDeleteBike = async (bikeId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete(`http://localhost:8000/bikes/${bikeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 204) {
        toast.success('Bike deleted successfully!');
        fetchBikes();
      } else {
        console.error('Failed to delete bike');
        toast.error('Failed to delete bike');
      }
    } catch (error) {
      console.error('Error deleting bike:', error);
      toast.error('Error deleting bike');
    }
  };

  const filterBikes = () => {
    const filteredBikes = bikes.filter((bike) =>
      bike.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBikes(filteredBikes);
  };

  const handleSearch = () => {
    // Implement search logic here
    const filteredBikes = bikes.filter((bike) =>
      bike.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBikes(filteredBikes);
  };

  const clearForm = () => {
    setName('');
    setBrand('');
    setModel('');
    setDock('');
    setDetail('');
    setImageUrls('');
    setPrice(0);
    setIsAvailable(true);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBikes.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bike-admin-container">
      <div className="column" style={{height: '750px' }}>
        <h2>Add Bike</h2>
        <form onSubmit={handleAddBike}>
          <label htmlFor="name"><b>Name</b></label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="brand"><b>Brand</b></label>
          <input
            type="text"
            id="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
          <label htmlFor="model"><b>Model</b></label>
          <input
            type="text"
            id="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          />
          <label htmlFor="dock"><b>Dock </b></label>
          <input
            type="text"
            id="dock"
            value={dock}
            onChange={(e) => setDock(e.target.value)}
            required
          />
          <label htmlFor="detail"><b>Detail</b></label>
          <textarea
            id="detail"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            required
          ></textarea>
          <label htmlFor="imageUrls"><b>Image URLs (comma-separated)</b></label>
          <input
            type="text"
            id="imageUrls"
            value={imageUrls}
            onChange={(e) => setImageUrls(e.target.value)}
            required
          />
          <label htmlFor="price"><b>Price</b></label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            required
          />
          <div className="radio-buttons">
            <label><b>Is Available</b></label>
            <div className="radio-button">
              &emsp;&ensp;&emsp;&ensp;
              <input
                type="radio"
                name="isAvailable"
                value="yes"
                checked={isAvailable === true}
                onChange={() => setIsAvailable(true)}
              />
              <label htmlFor="isAvailableYes">Yes</label>
            </div>
            &emsp;&ensp;&emsp;&ensp;&emsp;&ensp;&emsp;&ensp;
            <div className="radio-button">
              <input
                type="radio"
                name="isAvailable"
                value="no"
                checked={isAvailable === false}
                onChange={() => setIsAvailable(false)}
              />
              <label htmlFor="isAvailableNo">No</label>
            </div>
          </div>
          <div className="submit-button-container">
            <button type="submit" className="submit-button">Add bike</button>
          </div>
        </form>
      </div>
      <div className="column" style={{ width: '850px', height: '800px' }}>
        <div className="row">
          <div className="columna">
            <h2>Bike List</h2>
          </div>
          <div className="columna">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button onClick={handleSearch}>Search</button>
            </div>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Dock</th>
              <th>Price</th>
              <th>Is Available</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((bike) => (
              <tr key={bike._id}>
                <td>{bike.name}</td>
                <td>{bike.dock}</td>
                <td>{bike.price}</td>
                <td>{bike.isAvailable ? 'Yes' : 'No'}</td>
                <td>
                  <button onClick={() => handleDeleteBike(bike._id)} className="delete-button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <ul className="pagination1">
            {Array.from({ length: Math.ceil(filteredBikes.length / itemsPerPage) }).map(
              (item, index) => (
                <li key={index} style={{ backgroundColor: 'f0f0f0', paddingBottom: '10px' }}>
                  <button onClick={() => paginate(index + 1)}>{index + 1}</button>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default BikeAdmin;
