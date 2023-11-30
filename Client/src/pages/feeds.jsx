import { useEffect } from "react";
import Cards from "./cards";
import { Link } from "react-router-dom";
import { Button, ButtonGroup } from "@nextui-org/react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import ProfileImage from "../assets/images/profile.png"

const Feeds = () => {

    return (
        <div style={{ display: 'flex', width: "100%", paddingTop: '1rem' }}>
            <div style={{ width: '30%', display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '2rem', position: 'fixed' }}>
                <Card className="py-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '90%' }}>
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <div style={{ display: 'flex', gap: '1rem' }} >
                            <img src={ProfileImage} width="50px" height="50px" ></img>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', width: '100%', }}>
                                <p className="text-tiny uppercase font-bold" style={{ fontSize: '20px' }} >Abhishek Bhagat</p>
                                <small className="text-default-500">Email</small>
                            </div>
                        </div>
                    </CardHeader>
                </Card>
                <Link style={{width: '70%'}} to="/post" >
                    <Button style={{ backgroundColor: '#f94566', color: 'white', width: '100%', height: '4rem', fontSize: '25px', fontWeight: 'bold' }} startContent={<CloudUploadIcon />} variant="shadow" >
                        Create Post
                    </Button>
                </Link>
            </div>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center', gap: '2rem' }} >
                    <Cards />
                    <Cards />
                    <Cards />
                </div>
            </div>
            <div style={{ width: '30%', position: 'fixed', right: '0' }}  >
                Right Side
            </div>
        </div>
    )
}

export default Feeds;