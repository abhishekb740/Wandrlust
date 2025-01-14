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
    if (props.feed.comments) {
      setComments(props.feed.comments);
    }
  }, [props.feed.comments]);

  const handleCommentSubmit = async () => {
    if (!comment.trim()) {
      return; // Don't submit empty comments
    }

    try {
      const res = await fetch(`http://localhost:3000/comment/${props.feed._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          text: comment, 
          userId 
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Comment error:", errorData);
        throw new Error(errorData.message || "Failed to submit comment");
      }

      const newComment = await res.json();
      setComments(prevComments => [...prevComments, newComment]);
      setComment(""); // Clear the comment input
    } catch (error) {
      console.error("Error submitting comment:", error);
      // You might want to show a toast or error message to the user
    }
  };

  console.log(props.feed.comments);

  const url = `http://localhost:3000/${props.feed.image}`;

  const likePost = async (postId) => {
    try {
      const res = await fetch(`http://localhost:3000/like/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Like error:", errorData);
        return;
      }

      const data = await res.json();
      props.updateLikeStatus(postId, true);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const disLikePost = async (postId) => {
    try {
      const res = await fetch(`http://localhost:3000/dislike/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Dislike error:", errorData);
        return;
      }

      const data = await res.json();
      props.updateLikeStatus(postId, false);
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  const author = props.feed.author || {};
  const profileImageUrl = author.profileImage
    ? `http://localhost:3000/profileImages/${author.profileImage}`
    : ProfileImage;

  console.log('Profile Image URL:', profileImageUrl);

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
              src={profileImageUrl}
              alt="Profile"
              height={50}
              width={50}
              onError={(e) => { e.target.src = ProfileImage; }}
            />
            <p className="font-bold text-xl">{author.name || 'Unknown User'}</p>
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
          src={`http://localhost:3000/images/${props.feed.image}`}
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
                            ? `http://localhost:3000/profileImages/${comment.author.profileImage}`
                            : ProfileImage
                        }
                        height={30}
                        width={30}
                        alt="Profile"
                        onError={(e) => { e.target.src = ProfileImage; }}
                      />
                      <div>
                        <div>
                          <span>
                            {comment.author?.username || 'Unknown User'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      {new Date(comment.date).toLocaleString("en-US", {
                        timeZone: "Asia/Kolkata",
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                      })}
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
