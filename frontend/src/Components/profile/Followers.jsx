import {useEffect} from "react";
import {apiClient} from "../../util/apiCalls.js";

export default function Followers(){

    let followers

    useEffect(() => {
        async function getFollowers(){
            followers = await apiClient(`/`)
        }
        getFollowers()
    }, []);

    return (
        <>
            <p>Count of followers: {followers}</p>
        </>
    )
}