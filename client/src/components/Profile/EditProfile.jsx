import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header";
import {useState, useEffect} from 'react';
import AddProfileBio from "./AddProfileBio";
import AddNewPicture from "./AddNewPicture";
import "./styles.css";

const EditProfile = function () {
    let username = localStorage.getItem("username");
    console.log(username);
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
            <img src={userInfo.picture} alt={userInfo.picture}></img>
            <h4>Username: {userInfo.username}</h4>
            <h4>Register date: {userInfo.registerDate}</h4>
            <h4>Bio: {userInfo.bio}</h4>
        </div>
        <br></br>
        <AddProfileBio username={username}></AddProfileBio>
        <AddNewPicture username={username}></AddNewPicture>
        </>
    )
}

export default EditProfile;