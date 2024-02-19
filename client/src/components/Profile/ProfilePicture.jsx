import {useState, useEffect} from "react";
const ProfilePicture = (props) => {
    //Fetching the profilePicture from backend
    let [picture, setPicture] = useState();
    useEffect(() => {
        fetch("/api/user/profile/pic/" + props.username, {
            method: "GET", 
            headers: {
                "authorization": "Bearer " + localStorage.getItem("auth_token")
            },
            mode: "cors"
        })
        .then(response => response.json())
        .then(json => setPicture(json))
    }, []);
    console.log(picture)
    
    return (
        <div>

        </div>
    )
}

export default ProfilePicture; 