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
import { ScrollShadow } from "@nextui-org/react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

Modal.setAppElement("#root");

export default function Profile() {
    const [userDetails, setUserDetails] = useState({});
    const [editableAbout, setEditableAbout] = useState(false);
    const [aboutContent, setAboutContent] = useState({
        description: "",
    });
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userId = extractUserIdFromToken(token);
        const fetchUserDetails = async () => {
            try {
                const res = await fetch(`http://localhost:3000/${userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!res.ok) {
                    throw new Error("Error fetching user details");
                }
                const data = await res.json();
                console.log(data);
                setUserDetails(data);
                if (data.about) {
                    setAboutContent({ description: data.about });
                }
            } catch (error) {
                console.error("Error:", error);
                toast("Error fetching user details", { type: "error" });
            }
        };
        const fetchUserPosts = async () => {
            try {
                const res = await fetch(`http://localhost:3000/getPhotos/${userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!res.ok) {
                    throw new Error("Error fetching user posts");
                }
                const data = await res.json();
                setUserPosts(data);
            } catch (error) {
                console.error("Error:", error);
                toast("Error fetching user posts", { type: "error" });
            }
        };
        if (userId) {
            fetchUserDetails();
            fetchUserPosts(); // Fetch user's posts
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
                `http://localhost:3000/${userId}/about`,
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
        setSelectedFile(e.target.files[0]);
    };

    const handleProfilePhotoSave = async () => {
        try {
            const token = localStorage.getItem("token");
            const userId = extractUserIdFromToken(token);
            const formData = new FormData();
            formData.append("profileImage", selectedFile);
            formData.append("userId", userId);
            await axios.post(`http://localhost:3000/uploadProfilePhoto`, formData);
            toast("Profile photo updated successfully", { type: "success" });
            setModalIsOpen(false);
        } catch (error) {
            console.error("Error updating profile photo:", error);
            toast("Error updating profile photo", { type: "error" });
        }
    };

    const handleDeletePost = async (postId) => {
        try {
            // Make a DELETE request to your backend API to delete the post
            const response = await axios.delete(
                `http://localhost:3000/deletePost/${postId}`
            );

            // If deletion is successful, update the userPosts state to remove the deleted post
            setUserPosts(userPosts.filter((post) => post._id !== postId));

            // Show a success toast message
            toast.success(response.data.message);
        } catch (error) {
            // If there's an error, show an error toast message
            toast.error("Error deleting post");
        }
    };


    const handleClose = () => {
        setEditableAbout(false);
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <MDBContainer className="py-5 px-11">
                <MDBRow className="justify-center items-center">
                    <MDBCol lg="9" xl="7">
                        <MDBCard>
                            <div
                                className="rounded-t-lg text-white flex items-center" // Adjusted style
                                style={{ backgroundColor: "#000" }}
                            >
                                <div
                                    className="ms-4 mt-5 flex items-center" // Adjusted style
                                    style={{ width: "150px" }}
                                >
                                    <MDBCardImage
                                        src={`http://localhost:3000/profileImages/${userDetails.profileImage}`}
                                        alt="Profile"
                                        className=" mt-20 mb-5 img-thumbnail rounded-full pr-1" // Adjusted style
                                        style={{ width: "150px", height: "150px", zIndex: "1" }} // Adjusted style
                                    />
                                    <div
                                        className="text-center ml-4 flex items-center cursor-pointer w-full"
                                        onClick={() => setModalIsOpen(true)}
                                    >
                                        <button
                                            className="h-10 w-44 px-6 ring-2 ring-white bg-[#eb2168] hover:bg-[#d7004b] text-white w-70 mt-40 z-10"
                                        >
                                            Edit profile
                                        </button>
                                    </div>
                                </div>
                                <div
                                    className="ms-3 text-white flex-grow"
                                    style={{ marginTop: "130px" }}
                                >
                                    <MDBTypography tag="h5" className="text-xl">
                                        {`${userDetails?.name}`}
                                    </MDBTypography>
                                    <MDBCardText className="mb-10 text-lg ">
                                        {`${userDetails?.email}`}
                                    </MDBCardText>
                                    <div className="flex justify-end text-center py-1 mt-3 mr-3 mb-1">
                                        <div>
                                            <MDBCardText className="mb-1 text-lg text-white">
                                                {userPosts.length}{" "}
                                                {userPosts.length !== 1 ? "Posts" : "Post"}
                                            </MDBCardText>
                                        </div>
                                        <div className="px-3">
                                            <MDBCardText className="mb-1 text-lg text-white">
                                                {userDetails.followers?.length}{" "}
                                                {userDetails.followers?.length !== 1
                                                    ? "Followers"
                                                    : "Follower"}
                                            </MDBCardText>
                                        </div>
                                        <div>
                                            <MDBCardText className="mb-1 text-lg text-white">
                                                {userDetails.following?.length}{" "}
                                                {userDetails.following?.length !== 1
                                                    ? "Following"
                                                    : "Following"}
                                            </MDBCardText>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <MDBCardBody className="text-black p-4">
                                <div className="mb-5">
                                    <p className="lead font-bold mb-1">About</p>
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
                                    <div className="flex gap-4">
                                        {editableAbout && (
                                            <button
                                                className="mt-2 px-4 py-2 bg-[#eb2168] text-white rounded-md hover:bg-[#d7004b] transition duration-300 ease-in-out transform focus:outline-none focus:ring focus:ring-[#e85c8d]"
                                                onClick={handleAboutSave}
                                            >
                                                Save
                                            </button>
                                        )}
                                        {editableAbout && (
                                            <button
                                                className="mt-2 px-4 py-2 bg-[#eb2168] text-white rounded-md hover:bg-[#d7004b] transition duration-300 ease-in-out transform focus:outline-none focus:ring focus:ring-[#e85c8d]"
                                                onClick={handleClose}
                                            >
                                                Cancel
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mb-4">
                                    <MDBCardText className="lead font-bold mb-0">
                                        Your Posts
                                    </MDBCardText>
                                </div>
                                <div className="flex-wrap flex justify-start gap-16">
                                    {/* <ScrollShadow hideScrollBar className="w-[500px] h-[500px]"> */}
                                    {userPosts.length === 0 ? (
                                        <div className="text-center">
                                            <p className="text-lg font-semibold mb-2 text-[#eb2168]">
                                                Why not travelling, start travelling and sharing with
                                                Wandrlust!
                                            </p>
                                        </div>
                                    ) : (
                                        userPosts.map((post) => (
                                            <div
                                                key={post._id}
                                                className="max-w-sm border-3 border-black rounded-lg relative overflow-hidden m-4"
                                            >
                                                <img
                                                    src={`http://localhost:3000/images/${post.image}`}
                                                    alt="Post"
                                                    className="w-full"
                                                />
                                                <div className="flex items-end justify-between p-4">
                                                    <div className="flex-col">
                                                        <p className="font-bold text-xl mb-2">
                                                            {post.caption}
                                                        </p>
                                                        <p className="text-[#eb2168] text-base">
                                                            {post.likes.length}{" "}
                                                            {post.likes.length === 1 ? "Like" : "Likes"}
                                                        </p>
                                                    </div>
                                                    <button
                                                        className="m-2 bg-red-500 text-white py-1 px-3 rounded-md"
                                                        onClick={() => handleDeletePost(post._id)} // Assuming there's a function handleDeletePost to handle post deletion
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                    {/* </ScrollShadow> */}
                                </div>
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
                <input
                    type="file"
                    name="profileImage"
                    className="mb-4"
                    onChange={handleFileChange}
                />
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
