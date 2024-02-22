import { Card, AreaChart, BarChart, DonutChart, Legend } from '@tremor/react';
import AdminSidebar from "./sidebar";

const sales = [
    {
        name: 'Blocked Users',
        number: 2,
    },
    {
        name: 'Activer Users',
        number: 8,
    },
];

const posts = [
    {
        name: 'Deleted Posts',
        number: 3,
    },
    {
        name: 'Activer Posts',
        number: 8,
    },
];

// const dataFormatter = (number: number) =>
//     `$ ${Intl.NumberFormat('us').format(number).toString()}`;

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
        </div>
    )
}
