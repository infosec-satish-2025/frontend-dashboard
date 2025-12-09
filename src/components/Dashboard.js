import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServiceStatus();
  }, []);

  const fetchServiceStatus = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';
      const response = await axios.get(`${apiUrl}/api/services/status`);
      setServices(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching service status:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <h2>Service Status</h2>
      <div className="service-grid">
        {services.map(service => (
          <div key={service.id} className={`service-card ${service.status}`}>
            <h3>{service.name}</h3>
            <p>Status: {service.status}</p>
            <p>Uptime: {service.uptime}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
