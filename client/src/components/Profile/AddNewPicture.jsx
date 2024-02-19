//Accepting only images in input field: https://stackoverflow.com/questions/3828554/how-to-allow-input-type-file-to-accept-only-image-files
//Uploading images to the page: https://stackoverflow.com/questions/43692479/how-to-upload-an-image-in-react-js
import {useState, useEffect} from 'react'; 
import { ToastContainer, toast } from "react-toastify";
import Header from '../Header/Header';
import "./styles.css";
const AddNewPicture = (props) => {
    const [pic, setPicture] = useState()
    const handleChange = (e) => {
        let pic = e.target.files[0];
        console.log(pic);
        setPicture({image: URL.createObjectURL(pic)})
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(pic); 
        fetch("/api/user/profile/pic/" + props.username, {
            method: "POST", 
            headers: {
                "Content-type": "application/json",
                "authorization": "Bearer " + localStorage.getItem("auth_token")
            },
            body: JSON.stringify(pic), 
            mode: "cors"
        })
        .then(response => response.json())
        .then(data => {
            toast(data.message)
        })
    }
    return(
        <>
        <div className='container-m'>
            <Header type="h5" text="New Profile Picture: "></Header>
            <input name="pic" type="file" accept='.png, .jpg, .jpeg' onChange={handleChange}></input>    
            <button id="submit" onClick={handleSubmit}>Save</button>
            <ToastContainer position="top-center"></ToastContainer>
        </div>
        </>
    )
}

export default AddNewPicture; 