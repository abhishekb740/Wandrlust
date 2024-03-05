import React, { useState } from "react";
import axios from "axios";
import "./AgencyUpload.css";
import { useNavigate } from "react-router-dom";
//https://www.google.com/search?q=vaibhav+pandey+iit+rank&tbm=isch&ved=2ahUKEwiZuci2-NyEAxUh8DgGHfGXCIQQ2-cCegQIABAA&oq=vaibhav+pandey+&gs_lp=EgNpbWciD3ZhaWJoYXYgcGFuZGV5ICoCCAAyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgQQABgeMgYQABgFGB4yBhAAGAUYHkjLV1CvEFinOXAEeACQAQOYAc0EoAHmL6oBCzMuMS42LjguMi4xuAEByAEA-AEBigILZ3dzLXdpei1pbWeoAgrCAgQQIxgnwgINEAAYgAQYigUYQxixA8ICChAAGIAEGIoFGEPCAgcQIxjqAhgnwgIIEAAYgAQYsQPCAg4QABiABBiKBRixAxiDAcICCxAAGIAEGLEDGIMBwgIHEAAYgAQYGIgGAQ&sclient=img&ei=jPfmZZnDOKHg4-EP8a-ioAg&bih=938&biw=1707#imgrc=zkmb1Shzv-bDCM
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
    console.log(formData);
    try {
      const response = await fetch(
        "http://localhost:5000/agency/agenciesUpload",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      console.log(response.data);
      navigate("/agency");
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
          <button style={{ backgroundColor: "#f94566" }} type="submit">
            Add Agency
          </button>
        </form>
      </div>
    </div>
  );
};

export default AgencyUpload;
