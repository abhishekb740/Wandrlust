import { Card, AreaChart } from '@tremor/react';
import AdminSidebar from "./sidebar";
import { Button, Link } from "@nextui-org/react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const postdata = [
    {
        date: 'Jan 22',
        'Posts': 20,
    },
    {
        date: 'Feb 22',
        'Posts': 27,
    },
    {
        date: 'Mar 22',
        'Posts': 40,
    },
    {
        date: 'Apr 22',
        'Posts': 55,
    },
    {
        date: 'May 22',
        'Posts': 66,
    },
    {
        date: 'Jun 22',
        'Posts': 40,
    },
    {
        date: 'Jul 22',
        'Posts': 60,
    },
    {
        date: 'Aug 22',
        'Posts': 65,
    },
    {
        date: 'Sep 22',
        'Posts': 45,
    },
    {
        date: 'Oct 22',
        'Posts': 90,
    },
    {
        date: 'Nov 22',
        'Posts': 10,
    },
    {
        date: 'Dec 22',
        'Posts': 100,
    },
];

const userdata = [
    {
        date: 'Jan 22',
        Users: 10,
    },
    {
        date: 'Feb 22',
        Users: 12,
    },
    {
        date: 'Mar 22',
        Users: 13,
    },
    {
        date: 'Apr 22',
        Users: 20,
    },
    {
        date: 'May 22',
        Users: 40,
    },
    {
        date: 'Jun 22',
        Users: 50,
    },
    {
        date: 'Jul 22',
        Users: 52,
    },
    {
        date: 'Aug 22',
        Users: 100,
    },
    {
        date: 'Sep 22',
        Users: 102,
    },
    {
        date: 'Oct 22',
        Users: 115,
    },
    {
        date: 'Nov 22',
        Users: 116,
    },
    {
        date: 'Dec 22',
        Users: 120,
    },
];

export default function Users() {
    return (
        <div className="flex gap-10 w-full">
            <AdminSidebar />
            <div className='w-full'>
                <Button isIconOnly as={Link} href="/dashboard/admin" color='danger' variant='flat'>
                    <ArrowBackIcon />
                </Button>
                <div className='flex mt-10 justify-center'>
                    <Card className="mx-auto max-w-md max-h-[100px]">
                        <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                            Total number of users
                        </h4>
                        <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            20
                        </p>
                    </Card>
                </div>
                <h3 className="mt-10 text-tremor-default text-tremor-content dark:text-dark-tremor-content">Total Number of Posts</h3>
                <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">50</p>
                <AreaChart
                    className="mt-4 h-72 pr-20"
                    data={postdata}
                    index="date"
                    yAxisWidth={65}
                    categories={['Posts']}
                    colors={['red']}
                />

                <h3 className="mt-10 text-tremor-default text-tremor-content dark:text-dark-tremor-content">Total Number of Posts</h3>
                <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">20</p>
                <AreaChart
                    className="mt-4 h-72 pr-20"
                    data={userdata}
                    index="date"
                    yAxisWidth={65}
                    categories={['Users']}
                    colors={['yellow']}
                />

            </div>
        </div>
    )
}