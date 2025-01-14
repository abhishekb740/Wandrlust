import { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, Link, Image } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { AreaChart } from '@tremor/react';

const Agency = () => {
    const chartdata = [
        {
            Name: 'SK Travels',
            Enrolled: 10,
        },
        {
            Name: 'Agrawal Travels',
            Enrolled: 3,
        },
        {
            Name: 'UAE Discovery',
            Enrolled: 6,
        },
        {
            Name: 'DSM Travellers',
            Enrolled: 13,
        },
        {
            Name: 'Srinagar Adventure',
            Enrolled: 11,
        },
        {
            Name: 'UAE Discovery',
            Enrolled: 6,
        },
    ];


    const [agencies, setAgencies] = useState([]);

    useEffect(() => {
        const getAllAgencies = async () => {
            const res = await fetch("http://localhost:3000/agency/getAllAgency", {
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

    return (
        <>
            <div className='flex flex-wrap justify-center mb-20'>
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
                <Button color='warning' variant='solid' className='text-white' as={Link} href="/agencyform">
                    Create Agency
                </Button>
            </div>
            <AreaChart
                className="h-80 px-40"
                data={chartdata}
                index="Name"
                categories={['Enrolled']}
                colors={['red']}
                yAxisWidth={60}
                onValueChange={(v) => console.log(v)}
            />

        </>
    )
}

export default Agency
