import AdminSidebar from "./sidebar";
import { Button, Link } from "@nextui-org/react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import UserComponent from "./user_component";
import { useEffect, useState } from "react";
import { ScrollShadow } from "@nextui-org/react";

export default function Users() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getAllUsers = async () => {
            const res = await fetch("http://localhost:5000/getAllUsers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = await res.json();
            console.log(data.users);
            setUsers(data.users);
        }
        getAllUsers();
    }, [])

    return (
        <div className="flex gap-10 w-full">
            <AdminSidebar />
            <div className='w-full'>
                <Button isIconOnly as={Link} href="/dashboard/admin" color='danger' variant='flat' className="mb-10">
                    <ArrowBackIcon />
                </Button>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>
                    {
                        users.map((user, index) => (
                            <UserComponent user={user} key={index} setUsers={setUsers} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}