import { Card, CardBody, Button } from "@nextui-org/react";
import { toast } from "react-toastify";
import { useState } from "react";
import Modal from "@mui/material/Modal";

export default function UserComponent({ user, setUsers }) {
    const [showModal, setShowModal] = useState(false);
    const blockUser = async (userId) => {
        const res = await fetch("http://localhost:5000/admin/block-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
        })
        if (res.ok) {
            setUsers((prevUsers) => prevUsers.map((u) => {
                if (u._id === userId) {
                    return { ...u, blocked: true }
                }
                return u;
            }));
            toast("User blocked successfully", { type: "success" }, { autoClose: 3000 })
        }
        else {
            toast("User blocked failed", { type: "error" }, { autoClose: 3000 })
        }
    }
    console.log(user);

    const unBlockUser = async (userId) => {
        const res = await fetch("http://localhost:5000/admin/unblock-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
        })
        if (res.ok) {
            setUsers((prevUsers) => prevUsers.map((u) => {
                if (u._id === userId) {
                    return { ...u, blocked: false }
                }
                return u;
            }));
            toast("User unblocked successfully", { type: "success" }, { autoClose: 3000 })
        }
        else {
            toast("User unblocked failed", { type: "error" }, { autoClose: 3000 })
        }
    }

    return (
        <Card className="w-3/4 h-20">
            <CardBody className="flex-row justify-between items-center px-10">
                <div>
                    <span>
                        {user.name}
                    </span>
                </div>
                <div className="flex gap-4">
                    <Button onClick={() => setShowModal(true)} variant="flat" color="danger">View Details</Button>
                    {user.blocked ? <Button onClick={() => unBlockUser(user._id)} variant="flat" color="danger">UnBlock</Button> : <Button onClick={() => blockUser(user._id)} variant="flat" color="danger">Block</Button>}
                </div>
            </CardBody>
            <Modal open={showModal} onClose={() => setShowModal(false)}>
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "white", padding: "1rem", borderRadius: "8px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div className="flex justify-between">
                            <div className="flex gap-4">
                                <img
                                    src={
                                        user.profileImage
                                            ? `http://localhost:5000/profileImages/${user.profileImage}`
                                            : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                                    }
                                    height={50}
                                    width={50}
                                />
                                <div>
                                    <div>
                                        <span>
                                            {user.username}
                                        </span>
                                    </div>
                                    <div>
                                        <span>
                                            {user.email}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div>
                                    Followers: {user.followers.length}
                                </div>
                                <div>
                                    Following: {user.following.length}
                                </div>
                                <div>
                                    {/* Posts: {user.posts.length} */}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                Gender: {user.gender}
                            </div>
                            <div>
                                Age: {user.age}
                            </div>
                            <div>
                                Mobile Number {user.phone}
                            </div>
                        </div>
                        <div>
                            <textarea
                                value={user.about}
                                rows={2}
                                cols={100}
                                style={{ marginBottom: "1rem" }}
                                disabled
                            />
                        </div>
                    </div>
                    <button className="px-3 py-2 ml-2 text-white rounded-lg bg-[#eb2168] hover:bg-[#d7004b]" onClick={() => setShowModal(false)}>Close</button>
                </div>
            </Modal>
        </Card >
    );
}