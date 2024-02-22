import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { extractUserIdFromToken } from "../../utils/extractUserIdFromToken";
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from "react-toastify";

export default function Cards(props) {
    const token = localStorage.getItem("token");
    const userId = extractUserIdFromToken(token);
    const createdAtIST = new Date(props.feed.createdAt).toLocaleString("en-US", {
        timeZone: 'Asia/Kolkata',
        weekday: "long", year: "numeric", month: "long", day: "numeric",
        hour: "numeric", minute: "numeric", second: "numeric"
    });
    const deletePost = async (postId) => {
        console.log("Delete post");
        console.log(postId);
        const res = await fetch(`http://localhost:5000/admin/delete-post`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ postId })
        })
        if (res.ok) {
            props.setFeeds((prevFeeds) => prevFeeds.filter((f) => f._id !== postId));
            toast("Post deleted successfully", { type: "success" }, { autoClose: 3000 })
        }
        else {
            toast("Post deletion failed", { type: "error" }, { autoClose: 3000 })
        }
    }

    const url = `http://localhost:5000/${props.feed.image}`;

    return (
        <Card className="py-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '550px' }}>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <div className="flex items-center gap-2">
                        <img src={`http://localhost:5000/profileImages/${props.feed.author.profileImage}`} className="rounded-[50%]" height={50} width={50} ></img>
                        <p className="font-bold text-xl">{props.feed.author.name}</p>
                    </div>
                    <small className="text-default-500">{createdAtIST}</small>
                </div>
                <h4 className="font-bold text-large">{props.feed.caption}</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={`http://localhost:5000/images/${props.feed.image}`}
                    width={400}
                    style={{ border: '3px solid black' }}
                />
            </CardBody>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }} className="px-8" >
                <h4 className="font-bold text-large">{props.feed.description}</h4>
                <div className="flex items-center gap-1 cursor-pointer">
                    <DeleteIcon onClick={() => deletePost(props.feed._id)} sx={{ color: 'black' }} />
                </div>

            </div>
        </Card>
    );
}
