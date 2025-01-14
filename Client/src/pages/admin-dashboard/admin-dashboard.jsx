import { Card, AreaChart, BarChart, DonutChart, Legend } from '@tremor/react';
import AdminSidebar from "./sidebar";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';

const sales = [
    {
        name: 'Blocked Users',
        number: 0,
    },
    {
        name: 'Activer Users',
        number: 0,
    },
];

const posts = [
    {
        name: 'Deleted Posts',
        number: 0,
    },
    {
        name: 'Activer Posts',
        number: 0,
    },
];

// const dataFormatter = (number: number) =>
//     `$ ${Intl.NumberFormat('us').format(number).toString()}`;

export default function AdminDashboard() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        totalUsers: 0,
        totalBlockedUsers: 0,
        totalPosts: 0,
        totalDeletedPosts: 0,
        totalAgencies: 0,
    });

    useEffect(() => {
        const getDashboardData = async () => {
            setLoading(true);
            const res = await fetch("http://localhost:3000/admin/dashboard", {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data = await res.json();
            console.log(data.totalUsers);
            if (res.ok) {
                setData(data);
                sales[0].number = data.totalBlockedUsers;
                sales[1].number = data.totalUsers - data.totalBlockedUsers;
                posts[0].number = data.totalDeletedPosts;
                posts[1].number = data.totalPosts - data.totalDeletedPosts;
            }
            else {
                toast("Failed to fetch data", { type: "error" }, { autoClose: 3000 })
            }
            setLoading(false);
        }
        getDashboardData();
    }, [])
    return (
        <div className="flex gap-10 w-full">
            <AdminSidebar />
            {loading ? <div className='flex justify-center w-full'><CircularProgress /></div> :
                <div className='w-full'>
                    <div className='text-center p-5'>
                        <span className='text-4xl'>
                            Admin Dashboard
                        </span>
                        <div className='mt-5 text-base'>Check out User and Posts to block spam users and delete malicious posts!</div>
                    </div>
                    <div className='flex mt-10'>
                        <Card className="mx-auto max-w-md max-h-[100px]">
                            <h4 className="text-tremor-default flex justify-between text-tremor-content dark:text-dark-tremor-content">
                                <span>Users</span>
                                <span>Blocked Users</span>
                            </h4>
                            <p className="text-tremor-metric flex justify-between font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                <span>{data.totalUsers}</span>
                                <span>{data.totalBlockedUsers}</span>
                            </p>
                        </Card>
                        <Card className="mx-auto max-w-md max-h-[100px]">
                            <h4 className="text-tremor-default flex justify-between text-tremor-content dark:text-dark-tremor-content">
                                <span>Posts</span>
                                <span>Deleted Posts</span>
                            </h4>
                            <p className="text-tremor-metric flex justify-between font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                <span>{data.totalPosts}</span>
                                <span>{data.totalDeletedPosts}</span>
                            </p>
                        </Card>
                    </div>

                    <div className='mt-20 px-44 flex justify-around'>
                        <div>
                            <DonutChart
                                data={sales}
                                category="number"
                                index="name"
                                colors={['blue', 'yellow']}
                                className="w-40"
                            />
                            <Legend
                                categories={['Blocked Users', 'Active Users']}
                                className="w-40 pt-5"
                            />
                        </div>
                        <div>
                            <DonutChart
                                data={posts}
                                category="number"
                                index="name"
                                colors={['yellow', 'red']}
                                className="w-40"
                            />
                            <Legend
                                categories={['Deleted Posts', 'Active Posts']}
                                className="w-40 pt-5"
                            />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
