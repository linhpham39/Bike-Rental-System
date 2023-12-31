import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import OrderAdmin from './OrderAdmin';
import BikeAdmin from './BikeAdmin';
import CouponAdmin from './CouponAdmin';

import './AdminPage.css'; // Import file CSS đã tạo

function AdminPage() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [activeTab, setActiveTab] = useState('bike'); // Mặc định hiển thị BikeAdmin

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchCustomer = async () => {
      try {
        const response = await axios.get('http://localhost:8000/customers/token', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          const customerData = response.data;
          if (!customerData?.isAdmin) {
            navigate('/');
            return null;
          }
          setAdmin(customerData);
        } else {
          console.error('Failed to fetch customer information');
          navigate('/');
          return null;
        }
      } catch (error) {
        console.error('Error:', error);
        navigate('/');
        return null;
      }
    };
    fetchCustomer();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="admin-page"> {/* Thêm class 'admin-page' */}
      <nav>
        <ul>
          <li
            className={activeTab === 'bike' ? 'active' : ''}
            onClick={() => handleTabChange('bike')}
          >
            PRODUCT
          </li>
          <li
            className={activeTab === 'order' ? 'active' : ''}
            onClick={() => handleTabChange('order')}
          >
            ORDER
          </li>
          <li
            className={activeTab === 'coupon' ? 'active' : ''}
            onClick={() => handleTabChange('coupon')}
          >
            COUPON
          </li>
        </ul>
      </nav>
      <div>
        {activeTab === 'bike' && <BikeAdmin />}
        {activeTab === 'order' && <OrderAdmin />}
        {activeTab === 'coupon' && <CouponAdmin />}
      </div>
    </div>
  );
}

export default AdminPage;
