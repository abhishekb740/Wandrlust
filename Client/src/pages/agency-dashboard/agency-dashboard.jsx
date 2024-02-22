import { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";
import { Button, ButtonGroup } from "@nextui-org/react";

const Agency = () => {


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
            console.log(data.data);
            setAgencies(data.data);
        }
        getAllAgencies();
    }, [])

    const handleEnroll = () => {

    }

    return (
        <div className='flex flex-wrap justify-center'>
            {
                agencies.slice(0, 4).map((agency, index) => {
                    return (
                        <div key={index} className="max-w-[450px] mx-8 my-4">
                            <Card className='mt-10'>
                                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                    <p className="text-tiny uppercase font-bold">{agency.name}</p>
                                    <small className="text-default-500">INR 12,000</small>
                                    <h4 className="font-bold text-large">{agency.destination}</h4>
                                </CardHeader>
                                <CardBody className="overflow-visible py-2">
                                    <Image
                                        alt="Card background"
                                        className="object-cover rounded-xl"
                                        src={index == 0 ? "https://www.worldatlas.com/r/w768/upload/cb/33/9c/shutterstock-1926056444.jpg" : index == 1 ? "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Evening_view%2C_City_Palace%2C_Udaipur.jpg/1200px-Evening_view%2C_City_Palace%2C_Udaipur.jpg" : index == 2 ? "https://img.veenaworld.com/wp-content/uploads/2023/01/Things-To-Do-in-Srinagar.jpg" : "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Dubai_Skylines_at_night_%28Pexels_3787839%29.jpg/640px-Dubai_Skylines_at_night_%28Pexels_3787839%29.jpg"}
                                        width={270}
                                    />
                                </CardBody>
                            </Card>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Agency
