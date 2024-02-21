import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header";
import {useState, useEffect} from 'react';
import AddProfileBio from "./AddProfileBio";
import AddNewPicture from "./AddNewPicture";
import UserProfile from "./UserProfile";
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
    return (
        <>
        <Navigation></Navigation>
        <div className="container-m" id="profile">
            <UserProfile user={userData}></UserProfile>
            <Header type="h1" text="Edit your profile"></Header>
            <EditEmail email={userData.email}></EditEmail>
            <AddProfileBio username={username}></AddProfileBio>
        </div>
        </>
    )
}

export default EditProfile;