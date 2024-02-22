import { Card, CardBody, Button } from "@nextui-org/react";
import { toast } from "react-toastify";

export default function UserComponent({ user, setUsers }) {

    const blockUser = async(userId) => {
        const res = await fetch("http://localhost:5000/admin/block-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
        })
        if(res.ok){
            setUsers((prevUsers) => prevUsers.map((u) => {
                if(u._id === userId){
                    return {...u, blocked: true}
                }
                return u;
            }));
            toast("User blocked successfully", { type: "success" }, { autoClose: 3000 })
        }
        else{
            toast("User blocked failed", { type: "error" }, { autoClose: 3000 })
        }
    }

    const unBlockUser = async(userId) => {
        const res = await fetch("http://localhost:5000/admin/unblock-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
        })
        if(res.ok){
            setUsers((prevUsers) => prevUsers.map((u) => {
                if(u._id === userId){
                    return {...u, blocked: false}
                }
                return u;
            }));
            toast("User unblocked successfully", { type: "success" }, { autoClose: 3000 })
        }
        else{
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
                {user.blocked ? <Button onClick={()=>unBlockUser(user._id)} variant="flat" color="danger">UnBlock</Button> : <Button onClick={()=>blockUser(user._id)} variant="flat" color="danger">Block</Button>}
            </CardBody>
        </Card>
    );
}