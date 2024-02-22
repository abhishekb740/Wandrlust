import React, { useState, useEffect } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
} from "mdb-react-ui-kit";
import Modal from "react-modal";
import { extractUserIdFromToken } from "../utils/extractUserIdFromToken";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

Modal.setAppElement("#root");

export default function Profile() {
  const [userDetails, setUserDetails] = useState({});
  const [editableAbout, setEditableAbout] = useState(false);
  const [aboutContent, setAboutContent] = useState({
    description: "",
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // New state to store the selected file

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = extractUserIdFromToken(token);
    const fetchUserDetails = async () => {
      const res = await fetch(`http://localhost:5000/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        toast(`Error fetching user details`, { type: "error" });
      }
      const data = await res.json();
      setUserDetails(data);
      if (data.about) {
        setAboutContent({ description: data.about });
      }
    };
    if (userId) {
      fetchUserDetails();
    }
  }, []);

  const handleAboutEdit = () => {
    setEditableAbout(true);
  };

  const handleAboutSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = extractUserIdFromToken(token);
      await axios.put(
        `http://localhost:5000/${userId}/about`,
        {
          about: aboutContent.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setEditableAbout(false);
      toast("About section updated successfully", { type: "success" });
    } catch (error) {
      console.error("Error updating about section:", error);
      toast("Error updating about section", { type: "error" });
    }
  };

  const handleAboutChange = (e) => {
    setAboutContent({ description: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Store the selected file in state
  };

  const handleProfilePhotoSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = extractUserIdFromToken(token);
      const formData = new FormData();
      formData.append("profileImage", selectedFile);
      formData.append("userId", userId);
      await axios.post(`http://localhost:5000/uploadProfilePhoto`, formData);
      toast("Profile photo updated successfully", { type: "success" });
      setModalIsOpen(false);
    } catch (error) {
      console.error("Error updating profile photo:", error);
      toast("Error updating profile photo", { type: "error" });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <MDBContainer className="py-5 px-11">
        <MDBRow className="justify-center items-center">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div
                className="rounded-t-lg text-white flex"
                style={{ backgroundColor: "#000", height: "200px" }}
              >
                <div
                  className="ms-4 mt-5 px-3 pt-12 flex-col"
                  style={{ width: "150px" }}
                >
                  <MDBCardImage
                    src={`http://localhost:5000/profileImages/${userDetails.profileImage}`} // Use userDetails.profilePhoto to display the profile photo
                    alt="Generic placeholder image"
                    className="mt-4 mb-5 img-thumbnail"
                    fluid
                    style={{ width: "150px", height: "auto", zIndex: "1" }}
                  />
                  <MDBBtn
                    outline
                    color="text"
                    className="h-9 px-6 ring-2 ring-black text-black w-full"
                    onClick={() => setModalIsOpen(true)}
                  >
                    Edit profile
                  </MDBBtn>
                </div>
                <div
                  className="ms-3 text-white flex-grow"
                  style={{ marginTop: "130px" }}
                >
                  <MDBTypography tag="h5" className=" text-xl">
                    {`${userDetails?.name}`}
                  </MDBTypography>
                  <MDBCardText className="mb-1 text-lg">
                    {`${userDetails?.email}`}
                  </MDBCardText>
                </div>
              </div>
              <MDBCardBody className="text-black p-4">
                <div className="mb-5">
                  <p className="lead font-normal mb-1">About</p>
                  {editableAbout ? (
                    <textarea
                      className="mt-2 px-4 py-2 w-full bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                      value={aboutContent.description}
                      onChange={handleAboutChange}
                    />
                  ) : (
                    <div
                      className="p-4 mt-2 cursor-pointer bg-gray-100 border border-gray-300 rounded-md"
                      style={{ backgroundColor: "#f8f9fa" }}
                      onClick={handleAboutEdit}
                    >
                      {aboutContent.description
                        .split("\n")
                        .map((line, index) => (
                          <MDBCardText key={index} className="italic mb-1">
                            {line}
                          </MDBCardText>
                        ))}
                    </div>
                  )}
                  {editableAbout && (
                    <MDBBtn
                      className="mt-2 px-4 py-2 bg-[#eb2168] text-white rounded-md hover:bg-[#d7004b] transition duration-300 ease-in-out transform focus:outline-none focus:ring focus:ring-[#e85c8d]"
                      onClick={handleAboutSave}
                    >
                      Save
                    </MDBBtn>
                  )}
                </div>
                <div className="flex justify-between items-center mb-4">
                  <MDBCardText className="lead font-normal mb-0">
                    Recent photos
                  </MDBCardText>
                  <MDBCardText className="mb-0">
                    <a className="text-muted">Show all</a>
                  </MDBCardText>
                </div>
                {/* Recent photos section */}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            padding: "20px",
          },
        }}
      >
        <h2 className="text-lg font-bold mb-4">Edit Profile</h2>
        {/* Add input for selecting a new profile photo */}
        <input type="file" name="profileImage" className="mb-4" onChange={handleFileChange} />
        <button
          className="bg-[#eb2168] hover:bg-[#d7004b] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleProfilePhotoSave}
        >
          Save
        </button>
      </Modal>
    </div>
  );
}
