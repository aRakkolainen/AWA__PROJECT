import Header from "../Header/Header";
import {useState, useEffect} from 'react';
import AddProfileBio from "./AddProfileBio";
import AddNewPicture from "./AddNewPicture";
import { Container } from "react-bootstrap";
import "./styles.css";
import { ToastContainer } from "react-toastify";

const CreateProfile = () => {
    let username = localStorage.getItem("username");
    return(
        <Container className="create-profile">
            <Header type="h2" text="Create your profile"></Header>
            <AddProfileBio username={username}></AddProfileBio>
            <AddNewPicture username={username}></AddNewPicture>
        </Container>
    )
}

export default CreateProfile; 