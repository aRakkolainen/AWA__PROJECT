import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header";
import {useState, useEffect} from 'react';
import AddProfileBio from "./AddProfileBio";
import AddNewPicture from "./AddNewPicture";
import "./styles.css";
import EditEmail from "./EditEmail";

const EditProfile = function () {
    let username = localStorage.getItem("username");
    console.log(username);
    const [userData, setUserData] = useState({});
    //Fetching info about logged in user: 
    useEffect(() => {
        fetch("/api/user/profile/"+username, { method:"GET",
        headers: {
            "authorization": "Bearer " + localStorage.getItem("auth_token")
        }
    })
    .then(response => response.json())
    .then(json => setUserData(json.userData));
    }, [username])
    console.log(userData.registerDate);
    return (
        <>
        <Navigation></Navigation>
        <Header text="Edit your profile"></Header>
        <div className="container-m">
            <h2>Current info</h2>
            <h4>Email: {userData.email}</h4>
            <EditEmail email={userData.email}></EditEmail>
            <img src={userData.picture} alt={userData.picture}></img>
            <h4>Username: {userData.username}</h4>

            <h4>Register date: {userData.registerDate}</h4>
            <h4>Bio: {userData.bio}</h4>
        </div>
        <br></br>
        <AddProfileBio username={username}></AddProfileBio>
        <AddNewPicture username={username}></AddNewPicture>
        </>
    )
}

export default EditProfile;