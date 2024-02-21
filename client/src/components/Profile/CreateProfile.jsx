import Header from "../Header/Header";
import {useState, useEffect} from 'react';
import AddProfileBio from "./AddProfileBio";
import AddNewPicture from "./AddNewPicture";
import "./styles.css";
import { ToastContainer } from "react-toastify";

const CreateProfile = () => {
    let username = localStorage.getItem("username");
    return(
        <div className="container-s" id="create-profile">
            <Header text="Create your profile"></Header>
            <AddProfileBio username={username}></AddProfileBio>
            {/*<AddNewPicture username={username}></AddNewPicture>*/}
        </div>
    )
}

export default CreateProfile; 