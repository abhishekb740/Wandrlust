import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { extractUserIdFromToken } from "../utils/extractUserIdFromToken";

export default function Cards(props) {
    const token = localStorage.getItem("token");
    const userId = extractUserIdFromToken(token);
    const createdAtIST = new Date(props.feed.createdAt).toLocaleString("en-US", {
        timeZone: 'Asia/Kolkata',
        weekday: "long", year: "numeric", month: "long", day: "numeric",
        hour: "numeric", minute: "numeric", second: "numeric"
    });

    const url = `http://localhost:5000/${props.feed.image}`;

    const likePost = async (postId) => {
        try {
            const res = await fetch(`http://localhost:5000/like/${postId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId }),
            });
            if (res.ok) {
                props.updateLikeStatus(postId, true);
            }
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };

    const disLikePost = async (postId) => {
        try {
            const res = await fetch(`http://localhost:5000/dislike/${postId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId }),
            });
            if (res.ok) {
                props.updateLikeStatus(postId, false);
            }
        } catch (error) {
            console.error("Error unliking post:", error);
        }
    }

    return (
        <Card className="py-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '550px' }}>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <p className="font-bold text-xl">{props.feed.author.name}</p>
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
                {props.feed.likes.includes(userId) ? (
                    <div onClick={() => disLikePost(props.feed._id)} className="flex items-center gap-1 cursor-pointer">
                        <div>{props.feed.likes.length}</div>
                        <FavoriteIcon color="red" sx={{ color: 'red' }} />
                    </div>
                ) : (
                    <div onClick={() => likePost(props.feed._id)} className="flex items-center gap-1 cursor-pointer">
                        <div>{props.feed.likes.length}</div>
                        <FavoriteIcon color="red" sx={{ color: 'black'}} />
                    </div>
                )}

            </div>
        </Card>
    );
}
