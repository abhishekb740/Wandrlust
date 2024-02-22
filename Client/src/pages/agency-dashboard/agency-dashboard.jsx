import AgencySidebar from "./sidebar";

export default function AgencyDashboard() {
    return (
        <div className="flex gap-10 w-full">
            <AgencySidebar />
            <div className='w-full'>
                <h2>Hello</h2>
            </div>
        </div>
    )
}