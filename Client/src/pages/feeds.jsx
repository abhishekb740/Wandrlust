import { useEffect } from "react";
import Cards from "./cards";

const Feeds = () => {
    useEffect(() => {
        console.log("Feeds??");
    })

    return (
        <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{display: 'flex', flexDirection: 'column', width: '40%', justifyContent: 'center', alignItems: 'center', gap: '2rem'}} >
                <Cards />
                <Cards />
            </div>
        </div>
    )
}

export default Feeds;