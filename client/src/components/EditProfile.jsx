import Navigation from "./Navigation";
import Header from "./Header";
import {useState, useEffect} from 'react';
import AddProfileBio from "./AddProfileBio";

const Profile = function (user) {
    let username = localStorage.getItem("username");
    const [userInfo, setUserData] = useState({});
    //Fetching info about logged in user: 
    useEffect(() => {
        fetch("/api/user/profile/"+username, { method:"GET",
        headers: {
            "authorization": "Bearer " + localStorage.getItem("auth_token")
        }
    })
    .then(response => response.json())
    .then(json => setUserData(json));
    }, [])
    return (
        <>
        <Navigation></Navigation>
        <Header text="Edit your profile"></Header>
        <div className="container-m">
            <h2>Current info</h2>
            <h4>Username: {userInfo.username}</h4>
            <h4>Register date: {userInfo.registerDate}</h4>
            <h4>Bio: {userInfo.bio}</h4>
        </div>
        <br></br>
        <AddProfileBio username={username}></AddProfileBio>
        </>
    )
}

export default Profile;