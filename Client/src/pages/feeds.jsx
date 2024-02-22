import React, { useEffect, useState } from "react";
import Cards from "./cards"; // Update import
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Card, CardHeader } from "@nextui-org/react";
import ProfileImage from "../assets/images/profile.png";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { extractUserIdFromToken } from "../utils/extractUserIdFromToken";
import { toast } from "react-toastify";
import CircularProgress from '@mui/material/CircularProgress';

const Feeds = () => {
    const [feeds, setFeeds] = useState([]);
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem("token");
    const userId = extractUserIdFromToken(token);
    const [userDetails, setUserDetails] = useState({});
    const [loadingFeeds, setLoadingFeeds] = useState(false);
    const [loadingUsers, setLoadingUsers] = useState(false);

    useEffect(() => {
        const fetchUserDetails = async () => {
            const res = await fetch(`http://localhost:5000/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                toast(`Error fetching user details`, { type: 'error' });
            }
            const data = await res.json();
            setUserDetails(data);
        };
        if (userId) {
            fetchUserDetails();
        }
        const getFeeds = async () => {
            setLoadingFeeds(true);
            try {
                const res = await fetch("http://localhost:5000/getPhotos", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await res.json();
                setFeeds(data);
            } catch (error) {
                console.error("Error fetching feeds:", error);
            }
            setLoadingFeeds(false);
        };
        const getUsers = async () => {
            setLoadingUsers(true);
            try {
                const res = await fetch("http://localhost:5000/getAllUsers", {
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
            const res = await fetch(`http://localhost:5000/follow/${userIdToFollow}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ followingId: userId }),
            });
            if (res.ok) {
                setUsers(prevUsers => {
                    return prevUsers.map(user => {
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
            const res = await fetch(`http://localhost:5000/unfollow/${userIdToUnfollow}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ followingId: userId }),
            });
            if (res.ok) {
                setUsers(prevUsers => {
                    return prevUsers.map(user => {
                        if (user._id === userIdToUnfollow) {
                            const updatedFollowers = user.followers.filter(follower => follower !== userId);
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
        setFeeds(prevFeeds => {
            return prevFeeds.map(feed => {
                if (feed._id === postId) {
                    return { ...feed, likes: liked ? [...feed.likes, userId] : feed.likes.filter(id => id !== userId) };
                }
                return feed;
            });
        });
    };

    return (
        <div style={{ display: "flex", width: "100%", paddingTop: "1rem" }}>
            <div style={{ width: "25%", display: "flex", alignItems: "center", flexDirection: "column", gap: "2rem", position: "fixed" }}>
                <Card className="py-4" style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "90%" }}>
                    <Link to="/profile">
                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                            <div style={{ display: "flex", gap: "1rem" }}>
                                <img src={ProfileImage} width="50px" height="50px" alt="profile" />
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", width: "100%" }}>
                                    <p className="text-tiny uppercase font-bold" style={{ fontSize: "20px" }}>{userDetails.name}</p>
                                    <small className="text-default-500">{userDetails.email}</small>
                                </div>
                            </div>
                        </CardHeader>
                    </Link>
                </Card>
                {/* Create Post */}
                <Link style={{ width: "70%" }} to="/post">
                    <Button style={{ backgroundColor: "#f94566", color: "white", width: "100%", height: "4rem", fontSize: "25px", fontWeight: "bold" }} startContent={<CloudUploadIcon />} variant="shadow">
                        Create Post
                    </Button>
                </Link>
            </div>

            {/* Feeds */}
            <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", width: "100%", justifyContent: "center", alignItems: "center", gap: "2rem" }}>
                    {loadingFeeds && <CircularProgress color="secondary" sx={{ color: '#f94566' }} />}
                    {feeds.map((feed, index) => (
                        <Cards key={index} feed={feed} updateLikeStatus={updateLikeStatus} />
                    ))}
                </div>
            </div>

            <div style={{ width: "28%", position: "fixed", right: "0" }}>
                <Card className="py-4" style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "95%", gap: "1rem" }}>
                    <TextField id="outlined-basic" label="Search User" variant="outlined" style={{ width: "95%" }} InputProps={{ endAdornment: <SearchIcon /> }} />
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start" style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                        {loadingUsers &&
                            <div className="flex justify-center w-full">
                                <CircularProgress color="secondary" sx={{ color: '#f94566' }} />
                            </div>
                        }
                        {users.map((user, index) => (
                            user._id !== userId && (
                                <div key={index} style={{ display: "flex", justifyContent: "space-between", width: "100%", }}>
                                    <div style={{ display: "flex", gap: "1rem" }}>
                                        <img src={ProfileImage} alt="profile" width="40px" height="25px" />
                                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", width: "100%" }}>
                                            <p className="text-tiny" style={{ fontSize: "18px" }}>{user.name}</p>
                                            <small className="text-default-500">{user.email}</small>
                                        </div>
                                    </div>
                                    {user.followers.includes(userId) ? (
                                        <Button style={{ backgroundColor: "#f94566", color: "white", fontWeight: "bold" }} variant="shadow" onClick={() => handleUnfollow(user._id)}>Unfollow</Button>
                                    ) : (
                                        <Button style={{ backgroundColor: "#f94566", color: "white", fontWeight: "bold" }} variant="shadow" onClick={() => handleFollow(user._id)}>Follow</Button>
                                    )}
                                </div>
                            )
                        ))}
                    </CardHeader>
                </Card>
            </div>
        </div>
    );
};

export default Feeds;
