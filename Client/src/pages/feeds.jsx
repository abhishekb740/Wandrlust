// import { useEffect } from "react";
import Cards from "./cards";
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Card, CardHeader } from "@nextui-org/react";
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import IconButton from '@mui/material/IconButton';
import ProfileImage from "../assets/images/profile.png"
import { Input } from "@nextui-org/react";
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from "react";
import { extractUserIdFromToken } from "../utils/extractUserIdFromToken";

const Feeds = () => {
    const [feeds, setFeeds] = useState([]);
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem("token")
    const userId = extractUserIdFromToken(token);
    useEffect(() => {
        const getFeeds = async () => {
            const res = await fetch("http://localhost:5000/getPhotos", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            setFeeds(data);
            console.log(data);
        }
        const getUsers = async () => {
            console.log("Working1?");
            const res = await fetch("http://localhost:5000/getAllUsers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId })
            });
            const data = await res.json();
            console.log(data);
            setUsers(data.users);
        }
        getFeeds();
        getUsers();
    }, [userId])

    const handleFollow = async (userIdToFollow) => {
        console.log(userIdToFollow);
        const res = await fetch(`http://localhost:5000/follow/${userIdToFollow}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const data = await res.json();
        console.log(data);
    }

    return (
        <div style={{ display: 'flex', width: "100%", paddingTop: '1rem' }}>
            <div style={{ width: '25%', display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '2rem', position: 'fixed' }}>
                <Card className="py-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '90%' }}>
                    <Link to="/profile" >
                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                            <div style={{ display: 'flex', gap: '1rem' }} >
                                <img src={ProfileImage} width="50px" height="50px" ></img>
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', width: '100%', }}>
                                    <p className="text-tiny uppercase font-bold" style={{ fontSize: '20px' }} >Abhishek Bhagat</p>
                                    <small className="text-default-500">Email</small>
                                </div>
                            </div>
                        </CardHeader>
                    </Link>
                </Card>
                <Link style={{ width: '70%' }} to="/post" >
                    <Button style={{ backgroundColor: '#f94566', color: 'white', width: '100%', height: '4rem', fontSize: '25px', fontWeight: 'bold' }} startContent={<CloudUploadIcon />} variant="shadow" >
                        Create Post
                    </Button>
                </Link>
            </div>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center', gap: '2rem' }} >

                    {feeds.map((feed, index) => (
                        <Cards key={index} feed={feed} />
                    ))}
                </div>
            </div>
            <div style={{ width: '25%', position: 'fixed', right: '0' }}  >
                <Card className="py-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '95%', gap: '1rem' }}>
                    <TextField id="outlined-basic" label="Search User" variant="outlined" style={{ width: '95%' }} InputProps={{
                        endAdornment: <SearchIcon />,
                    }} />
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start" style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }} >
                        {users.map((user, index) => (
                            user._id !== userId &&
                            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }} >
                                <div style={{ display: 'flex', gap: '1rem' }} >
                                    <img src={ProfileImage} alt="profile" width="40px" height="25px" />
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', width: '100%', }} >
                                        <p className="text-tiny" style={{ fontSize: '18px' }} >{user.name}</p>
                                        <small className="text-default-500">{user.email}</small>
                                    </div>
                                </div>
                                <Button style={{ backgroundColor: '#f94566', color: 'white', fontWeight: 'bold' }} variant="shadow" onClick={() => handleFollow(user._id)}>Follow</Button>
                            </div>
                        ))}
                    </CardHeader>
                </Card>
            </div>
        </div>
    )
}

export default Feeds;