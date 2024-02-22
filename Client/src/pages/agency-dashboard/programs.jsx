import AgencySidebar from "./sidebar";

export default function Programs() {
    return (
        <div className="flex gap-10 w-full">
            <AgencySidebar />
            <div className='w-full'>
                <h1>Programs</h1>
            </div>
        </div>
    )
}