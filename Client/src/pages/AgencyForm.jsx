import React, { useState } from "react";
import axios from "axios";
import "./AgencyUpload.css";  
import {useNavigate} from "react-router-dom"

const AgencyUpload = () => {
  const [formData, setFormData] = useState({
    name: "",
    destination: "",
    description: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      
      const response = await fetch("http://localhost:5000/agency/agenciesUpload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(response.data);
      navigate("/agency")
    } catch (error) {
      console.error("Error adding agency:", error);
    }
  };

  return (
    <div className="agency-upload-container">
      <div className="agency-upload-box">
        <h2>Add New Agency</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="destination">Destination:</label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
          />

          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <button type="submit">Add Agency</button>
        </form>
      </div>
    </div>
  );
};

export default AgencyUpload;
