import React, { useEffect, useState } from "react";
import Cards from "./cards"; // Update import
import { Link } from "react-router-dom";
import { Card, Button, Input, CardHeader } from "@nextui-org/react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ProfileImage from "../assets/images/profile.png";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { extractUserIdFromToken } from "../utils/extractUserIdFromToken";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { caption, description } from "../store/slices/PostSlice";
import axios from 'axios';
import Modal from "@mui/material/Modal";

let formData;
const Feeds = () => {
    const dispatch = useDispatch();
    const [feeds, setFeeds] = useState([]);
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem("token");
    const userId = extractUserIdFromToken(token);
    const [userDetails, setUserDetails] = useState({});
    const [loadingFeeds, setLoadingFeeds] = useState(false);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [file, setFile] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [createPost, setCreatePost] = useState(false);
    const captionValue = useSelector(state => state.posts.caption);
    const descriptionValue = useSelector(state => state.posts.description);
    const navigate = useNavigate();

    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(selectedFile);
            setFile(selectedFile);
        }
    };

    const captionChangeHandler = (e) => {
        dispatch(caption(e.target.value))
    }

    const descriptionChangehandler = (e) => {
        dispatch(description(e.target.value))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        console.log(token);
        const userId = extractUserIdFromToken(token)
        console.log(userId);
        formData = new FormData();
        formData.append("myImage", file, "image.png");
        formData.append("caption", captionValue);
        formData.append("description", descriptionValue);
        formData.append("userId", userId);
        console.log(formData);
        const res = await axios.post("https://wandrlust-server.fly.dev/uploadPhoto", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log(res);
        setCreatePost(false);
        window.location.href = "/feeds"

    }

    useEffect(() => {
        const fetchUserDetails = async () => {
            const res = await fetch(`https://wandrlust-server.fly.dev/${userId}`, {
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
            console.log(data);
            setUserDetails(data);
        };
        if (userId) {
            fetchUserDetails();
        }
        const getFeeds = async () => {
            setLoadingFeeds(true);
            try {
                const res = await fetch("https://wandrlust-server.fly.dev/getPhotos", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await res.json();
                console.log(data);
                setFeeds(data.data);
            } catch (error) {
                console.error("Error fetching feeds:", error);
            }
            setLoadingFeeds(false);
        };
        const getUsers = async () => {
            setLoadingUsers(true);
            try {
                const res = await fetch("https://wandrlust-server.fly.dev/getAllUsers", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ userId }),
                });
                const data = await res.json();
                setUsers(data.users);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
            setLoadingUsers(false);
        };

        getFeeds();
        getUsers();
    }, [userId, token]);

    const handleFollow = async (userIdToFollow) => {
        try {
            const res = await fetch(
                `https://wandrlust-server.fly.dev/follow/${userIdToFollow}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ followingId: userId }),
                }
            );
            if (res.ok) {
                setUsers((prevUsers) => {
                    return prevUsers.map((user) => {
                        if (user._id === userIdToFollow) {
                            return { ...user, followers: [...user.followers, userId] };
                        }
                        console.log(user);
                        return user;
                    });
                });
            }
        } catch (error) {
            console.error("Error following user:", error);
        }
    };

    const handleUnfollow = async (userIdToUnfollow) => {
        try {
            const res = await fetch(
                `https://wandrlust-server.fly.dev/unfollow/${userIdToUnfollow}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ followingId: userId }),
                }
            );
            if (res.ok) {
                setUsers((prevUsers) => {
                    return prevUsers.map((user) => {
                        if (user._id === userIdToUnfollow) {
                            const updatedFollowers = user.followers.filter(
                                (follower) => follower !== userId
                            );
                            return { ...user, followers: updatedFollowers };
                        }
                        return user;
                    });
                });
            }
        } catch (error) {
            console.error("Error unfollowing user:", error);
        }
    };

    const updateLikeStatus = (postId, liked) => {
        setFeeds((prevFeeds) => {
            return prevFeeds.map((feed) => {
                if (feed._id === postId) {
                    return {
                        ...feed,
                        likes: liked
                            ? [...feed.likes, userId]
                            : feed.likes.filter((id) => id !== userId),
                    };
                }
                return feed;
            });
        });
    };

    return (
        <div style={{ display: "flex", width: "100%", paddingTop: "1rem" }}>
            <div
                style={{
                    width: "25%",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "2rem",
                    position: "fixed",
                }}
            >
                <Card
                    className="py-4"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "90%",
                    }}
                >
                    <Link to="/profile">
                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                            <div style={{ display: "flex", gap: "1rem" }}>
                                <img
                                    src={`https://wandrlust-server.fly.dev/profileImages/${userDetails.profileImage}`}
                                    width="50px"
                                    height="50px"
                                    alt="profile"
                                />
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-evenly",
                                        width: "100%",
                                    }}
                                >
                                    <p
                                        className="text-tiny uppercase font-bold"
                                        style={{ fontSize: "20px" }}
                                    >
                                        {userDetails.name}
                                    </p>
                                    <small className="text-default-500">
                                        {userDetails.email}
                                    </small>
                                </div>
                            </div>
                        </CardHeader>
                    </Link>
                </Card>
                {/* Create Post */}
                <Button
                    onClick={() => setCreatePost(true)}
                    style={{
                        backgroundColor: "#f94566",
                        color: "white",
                        width: "100%",
                        height: "4rem",
                        fontSize: "25px",
                        fontWeight: "bold",
                    }}
                    startContent={<CloudUploadIcon />}
                    variant="shadow"
                >
                    Create Post
                </Button>
            </div>

            {/* Feeds */}
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "2rem",
                    }}
                >
                    {loadingFeeds && (
                        <CircularProgress color="secondary" sx={{ color: "#f94566" }} />
                    )}
                    {feeds.map((feed, index) => (
                        <Cards
                            key={index}
                            feed={feed}
                            updateLikeStatus={updateLikeStatus}
                        />
                    ))}
                </div>
            </div>

            <div style={{ width: "28%", position: "fixed", right: "0" }}>
                <Card
                    className="py-4"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "95%",
                        gap: "1rem",
                    }}
                >
                    <TextField
                        id="outlined-basic"
                        label="Search User"
                        variant="outlined"
                        style={{ width: "95%" }}
                        InputProps={{ endAdornment: <SearchIcon /> }}
                    />
                    <CardHeader
                        className="pb-0 pt-2 px-4 flex-col items-start"
                        style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}
                    >
                        {loadingUsers && (
                            <div className="flex justify-center w-full">
                                <CircularProgress color="secondary" sx={{ color: "#f94566" }} />
                            </div>
                        )}
                        {users.map(
                            (user, index) =>
                                user._id !== userId &&
                                !user.blocked && (
                                    <div
                                        key={index}
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            width: "100%",
                                        }}
                                    >
                                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                            <img
                                                src={
                                                    user.profileImage
                                                        ? `https://wandrlust-server.fly.dev/profileImages/${user.profileImage}`
                                                        : ProfileImage
                                                }
                                                alt="profile"
                                                width="40px"
                                                height="25px"
                                            />
                                            <div
                                                style={{ flex: 1 }}
                                            >
                                                <p className="text-tiny" style={{ fontSize: "18px" }}>
                                                    {user.name}
                                                </p>
                                                <small className="text-default-500">{user.email}</small>
                                            </div>
                                        </div>
                                        {user.followers.includes(userId) ? (
                                            <Button
                                                style={{
                                                    backgroundColor: "#f94566",
                                                    color: "white",
                                                    fontWeight: "bold",
                                                    width: "100px",
                                                    height: "40px",
                                                }}
                                                variant="shadow"
                                                onClick={() => handleUnfollow(user._id)}
                                            >
                                                Unfollow
                                            </Button>
                                        ) : (
                                            <Button
                                                style={{
                                                    backgroundColor: "#f94566",
                                                    color: "white",
                                                    fontWeight: "bold",
                                                    width: "100px",
                                                    height: "40px",
                                                }}
                                                variant="shadow"
                                                onClick={() => handleFollow(user._id)}
                                            >
                                                Follow
                                            </Button>
                                        )}
                                    </div>
                                )
                        )}
                    </CardHeader>
                </Card>
            </div>
            <Modal open={createPost} onClose={() => setCreatePost(false)}>
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "white",
                        padding: "1rem",
                        borderRadius: "8px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Card className="py-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '800px', gap: '2rem' }}>
                                <div className="pb-0 pt-2 px-4 flex-col items-start" style={{ display: 'flex', alignItems: 'center' }}>
                                    <div>
                                        <h1 style={{ color: 'gray', fontSize: '40px', fontWeight: 'bold' }}>What's in your mind?</h1>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-around' }} >
                                    <div style={{ width: '50%', border: '3px solid black' }} >
                                        {selectedImage && (
                                            <img
                                                src={selectedImage}
                                                alt="Selected"
                                                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                            />
                                        )}
                                    </div>
                                    <div style={{ width: '40%', display: 'flex', flexDirection: 'column', gap: '2rem' }} >
                                        <input onChange={captionChangeHandler} placeholder="Caption" type="text" label="Caption" />
                                        <input onChange={descriptionChangehandler} placeholder="Description" type="text" label="Description" />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                    <div>
                                        <div>
                                            Choose an Image to Post:
                                        </div>
                                        <input style={{ border: '1px solid black' }} type="file" name="myImage" onChange={handleImageChange} />
                                    </div>
                                </div>
                                <div>
                                    <Button
                                        style={{ backgroundColor: '#f94566', color: 'white', width: '100%', height: '3rem', fontSize: '25px', fontWeight: 'bold' }}
                                        startContent={<CloudUploadIcon />}
                                        variant="shadow"
                                        onClick={handleSubmit}
                                    >
                                        Create Post
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Feeds;
