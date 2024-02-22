import React from 'react'
import { extractUserIdFromToken } from '../utils/extractUserIdFromToken';
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";
import { Button, ButtonGroup } from "@nextui-org/react";
import { toast } from 'react-toastify';

const Agency = () => {
    const token = localStorage.getItem('token');
    const userId = extractUserIdFromToken(token);

    const [agencies, setAgencies] = useState([]);

    useEffect(() => {
        const getAllAgencies = async () => {
            const res = await fetch("http://localhost:5000/agency/getAllAgency", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = await res.json();
            setAgencies(data.data);
            console.log(data.data);
        }
        getAllAgencies();
    }, [])

    const handleEnroll = async (agencyId) => {
        console.log(agencyId);
        const res = await fetch(`http://localhost:5000/agency/enroll/${agencyId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
        })
        if (res.ok) {
            toast("Enrolled successfully", { type: "success" });
            setAgencies(agencies.map(agency => {
                if (agency._id === agencyId) {
                    return { ...agency, enrolledUsers: [...agency.enrolledUsers, userId] }
                }
                return agency;
            }))
        }
        else {
            toast("Error in enrolling", { type: "error" });
        }
    }

    const handleUnEnroll = async (agencyId) => {
        console.log(agencyId);
        const res = await fetch(`http://localhost:5000/agency/unenroll/${agencyId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
        })
        if (res.ok) {
            toast("Unenrolled successfully", { type: "success" });
            setAgencies(agencies.map(agency => {
                if (agency._id === agencyId) {
                    return { ...agency, enrolledUsers: agency.enrolledUsers.filter(user => user !== userId) }
                }
                return agency;
            }))
        }
        else {
            toast("Error in unenrolling", { type: "error" });
        }
    }

    return (
        <div className='flex flex-wrap justify-center'>
            {
                agencies.map((agency, index) => {
                    return (
                        <div key={index} className="max-w-[450px] mx-8 my-4">
                            <Card>
                                <CardHeader className="flex gap-3">
                                    <Image
                                        alt="nextui logo"
                                        height={50}
                                        radius="sm"
                                        src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                                        width={50}
                                    />
                                    <div className="flex flex-col">
                                        <p className="text-md">{agency.name}</p>
                                        <p className="text-small text-default-500">{agency.destination}</p>
                                    </div>
                                </CardHeader>
                                <Divider />
                                <CardBody>
                                    <p>{agency.description}</p>
                                </CardBody>
                                <Divider />
                                <CardFooter>
                                    {agency.enrolledUsers.includes(userId) ?
                                        <Link
                                            isExternal
                                            showAnchorIcon
                                        >
                                            <Button onClick={() => handleUnEnroll(agency._id)} style={{ backgroundColor: '#f94566', color: 'white' }}>
                                                UnEnroll Now
                                            </Button>
                                        </Link> :
                                        <Link
                                            isExternal
                                            showAnchorIcon
                                        >
                                            <Button onClick={() => handleEnroll(agency._id)} style={{ backgroundColor: '#f94566', color: 'white' }}>
                                                Enroll Now
                                            </Button>
                                        </Link>
                                    }
                                </CardFooter>
                            </Card>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Agency
