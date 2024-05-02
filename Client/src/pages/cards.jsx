import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { extractUserIdFromToken } from "../utils/extractUserIdFromToken";
import ProfileImage from "../assets/images/profile.png";
import Modal from "@mui/material/Modal";
import CommentIcon from "@mui/icons-material/Comment";
// import { ScrollShadow } from "@nextui-org/react";

export default function Cards(props) {
  const token = localStorage.getItem("token");
  const userId = extractUserIdFromToken(token);
  const createdAtIST = new Date(props.feed.createdAt).toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  console.log(props.feed);
  const [comments, setComments] = useState(props.feed.comments);

  useEffect(() => {
    console.log(props.feed.comments);
    setComments(props.feed.comments || []);
  }, [props.feed.comments]);

  const handleCommentSubmit = async () => {
    try {
      const res = await fetch(`https://wandrlust-server.fly.dev/comment/${props.feed._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: comment, userId }),
      });
      if (res.ok) {
        const newComment = await res.json();
        setComments([...comments, newComment]);
        setComment("");
      } else {
        console.error("Failed to submit comment");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  console.log(props.feed.comments);

  const url = `https://wandrlust-server.fly.dev/${props.feed.image}`;

  const likePost = async (postId) => {
    try {
      const res = await fetch(`https://wandrlust-server.fly.dev/like/${postId}`, {
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
      const res = await fetch(`https://wandrlust-server.fly.dev/dislike/${postId}`, {
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
  };

  return (
    <Card
      className="py-4"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "550px",
      }}
    >
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div className="flex items-center gap-2">
            <img
              src={
                props.feed.author?.profileImage
                  ? `https://wandrlust-server.fly.dev/profileImages/${props.feed.author.profileImage}`
                  : ProfileImage
              }
              height={50}
              width={50}
            ></img>
            <p className="font-bold text-xl">{props.feed.author.name}</p>
          </div>
          <small className="text-default-500">{createdAtIST}</small>
        </div>
        <h4 className="font-bold text-large">{props.feed.caption}</h4>
      </CardHeader>
      <CardBody
        className="overflow-visible py-2"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={`https://wandrlust-server.fly.dev/images/${props.feed.image}`}
          width={400}
          style={{ border: "3px solid black" }}
        />
      </CardBody>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
        className="px-8"
      >
        <h4 className="font-bold text-large">{props.feed.description}</h4>
        {props.feed.likes.includes(userId) ? (
          <div className="flex items-center gap-1 cursor-pointer">
            <div onClick={() => disLikePost(props.feed._id)}>
              {props.feed.likes.length}
              <FavoriteIcon color="red" sx={{ color: "red" }} />
            </div>
            <CommentIcon onClick={() => setShowComments(true)} />
          </div>
        ) : (
          <div className="flex items-center gap-1 cursor-pointer">
            <div onClick={() => likePost(props.feed._id)}>
              {props.feed.likes.length}
              <FavoriteIcon color="red" sx={{ color: "black" }} />
            </div>
            <div>
              <CommentIcon onClick={() => setShowComments(true)} />
            </div>
          </div>
        )}

        <Modal open={showComments} onClose={() => setShowComments(false)}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "white", padding: "1rem", borderRadius: "8px", display: "flex", flexDirection: "column", alignItems: "center", maxHeight: "55vh", overflow: "hidden" }}>
            <div style={{ overflowY: "auto", flex: 1, width: "100%", display: 'flex', flexDirection: 'column', gap: '1rem' }} className="flex-col">
              {comments.map((comment, index) => (
                <div key={index} style={{ border: '1px solid black', padding: '0.5rem' }}>
                  <div className="flex gap-4 pb-1 justify-between">
                    <div>
                      <img
                        src={
                          comment.author?.profileImage
                            ? `https://wandrlust-server.fly.dev/profileImages/${comment.author?.profileImage}`
                            : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                        }
                        height={30}
                        width={30}
                      />
                      <div>
                        <div>
                          <span>
                            {comment.author?.username}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      {comment.date?.toLocaleString(
                        "en-US", {
                        timeZone: "Asia/Kolkata",
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                      }
                      )}
                    </div>
                  </div>
                  <div>
                    {comment.text}
                  </div>
                </div>
              ))}
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              cols={50}
              placeholder="Write a comment..."
              style={{ marginTop: "1rem", resize: "none", width: "100%" }}
            />
            <button className="px-3 py-2 ml-2 mt-2 text-white rounded-lg bg-[#eb2168] hover:bg-[#d7004b]" onClick={handleCommentSubmit}>Submit</button>
          </div>
        </Modal>

      </div>
    </Card>
  );
}
