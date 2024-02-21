import { Card, AreaChart, BarChart, DonutChart, Legend } from '@tremor/react';
import AdminSidebar from "./sidebar";

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

const sales = [
    {
        name: 'New York',
        sales: 980,
    },
    {
        name: 'London',
        sales: 456,
    },
    {
        name: 'Hong Kong',
        sales: 390,
    },
    {
        name: 'San Francisco',
        sales: 240,
    },
    {
        name: 'Singapore',
        sales: 190,
    },
]

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

const chartdata = [
    {
        name: 'Amphibians',
        'Number of threatened species': 2488,
    },
    {
        name: 'Birds',
        'Number of threatened species': 1445,
    },
    {
        name: 'Crustaceans',
        'Number of threatened species': 743,
    },
    {
        name: 'Ferns',
        'Number of threatened species': 281,
    },
    {
        name: 'Arachnids',
        'Number of threatened species': 251,
    },
    {
        name: 'Corals',
        'Number of threatened species': 232,
    },
    {
        name: 'Algae',
        'Number of threatened species': 98,
    },
];


export default function AdminDashboard() {
    return (
        <div className="flex gap-10 w-full">
            <AdminSidebar />
            <div className='w-full'>
                <div className='flex mt-10'>
                    <Card className="mx-auto max-w-md max-h-[100px]">
                        <h4 className="text-tremor-default flex justify-between text-tremor-content dark:text-dark-tremor-content">
                            <span>Users</span>
                            <span>Blocked Users</span>
                        </h4>
                        <p className="text-tremor-metric flex justify-between font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            <span>20</span>
                            <span>2</span>
                        </p>
                    </Card>
                    <Card className="mx-auto max-w-md max-h-[100px]">
                        <h4 className="text-tremor-default flex justify-between text-tremor-content dark:text-dark-tremor-content">
                            <span>Posts</span>
                            <span>Deleted Posts</span>
                        </h4>
                        <p className="text-tremor-metric flex justify-between font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            <span>50</span>
                            <span>15</span>
                        </p>
                    </Card>
                </div>

                <h3 className="mt-10 text-tremor-default text-tremor-content dark:text-dark-tremor-content">Total number of posts over time</h3>
                <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">50</p>
                <AreaChart
                    className="mt-4 h-72 pr-20"
                    data={postdata}
                    index="date"
                    yAxisWidth={65}
                    categories={['Posts']}
                    colors={['red']}
                />

                <h3 className="mt-10 text-tremor-default text-tremor-content dark:text-dark-tremor-content">Total number of users over time</h3>
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
