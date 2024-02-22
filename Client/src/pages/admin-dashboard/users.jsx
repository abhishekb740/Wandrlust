import AdminSidebar from "./sidebar";
import { Button, Link } from "@nextui-org/react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import UserComponent from "./user_component";

export default function Users() {
    return (
        <div className="flex gap-10 w-full">
            <AdminSidebar />
            <div className='w-full'>
                <Button isIconOnly as={Link} href="/dashboard/admin" color='danger' variant='flat' className="mb-10">
                    <ArrowBackIcon />
                </Button>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>
                    <UserComponent />
                    <UserComponent />
                </div>
            </div>
        </div>
    )
}