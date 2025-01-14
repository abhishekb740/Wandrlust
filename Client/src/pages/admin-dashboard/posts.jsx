import { Card, AreaChart } from '@tremor/react';
import AdminSidebar from "./sidebar";
import { Button, Link } from "@nextui-org/react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CircularProgress from '@mui/material/CircularProgress';
import Cards from "./AdminCard";

export default function Posts() {

    const [loadingFeeds, setLoadingFeeds] = useState(false);
    const [feeds, setFeeds] = useState([]);
    useEffect(() => {
        const getAllPosts = async () => {
            setLoadingFeeds(true);
            const res = await fetch("http://localhost:3000/getPhotos", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = await res.json();
            console.log(data);
            setLoadingFeeds(false);
            if (res.ok) {
                setFeeds(data.data);
            }
            else {
                toast("Failed to get posts", { type: "error" }, { autoClose: 3000 })
            }
        }
        getAllPosts();
    }, [])

    return (
        <div className="flex gap-10 w-full">
            <AdminSidebar />
            <div className='w-full'>
                <Button isIconOnly as={Link} href="/dashboard/admin" color='danger' variant='flat'>
                    <ArrowBackIcon />
                </Button>
                <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ display: "flex", flexDirection: "column", width: "100%", justifyContent: "center", alignItems: "center", gap: "2rem" }}>
                        {loadingFeeds && <CircularProgress color="secondary" sx={{ color: '#f94566' }} />}
                        {feeds.map((feed, index) => (
                            <Cards key={index} feed={feed} setFeeds={setFeeds}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}