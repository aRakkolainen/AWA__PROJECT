//Accepting only images in input field: https://stackoverflow.com/questions/3828554/how-to-allow-input-type-file-to-accept-only-image-files
//Uploading images to the page: https://stackoverflow.com/questions/43692479/how-to-upload-an-image-in-react-js
//Sending image to the backend: https://www.youtube.com/watch?v=-7w2KtfiMEM
import {useState, useEffect} from 'react'; 
import { ToastContainer, toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import Header from '../Header/Header';
import { InputGroup } from 'react-bootstrap';
import "./styles.css";
const AddNewPicture = (props) => {
    const [pictureFile, setPictureFile] = useState()
    const [profilePic, setProfilePic] = useState(); 
    const handleSubmit = (event) => {
        event.preventDefault();
        let url = "/api/user/profile/picture/"+props.username;
        if (pictureFile !== undefined) {
            const formData = new FormData();
            formData.append('file', pictureFile);

            fetch(url, {
                method: "POST", 
                headers: {
                    "authorization": "Bearer " + localStorage.getItem("auth_token"),
                },
                body: formData
            })
            .then(response => response.json())
            .then(data => handleToast(data));
        } else {
            toast.warning("No profile picture was selected, try again!");
        }
    }

    const handleToast = (data) => {
        if (data) {
            toast.success(data.message)
        }
    }
    return(
        <>
        <Header type="h5" text="New Profile Picture: "></Header>
        <InputGroup>
            <Form.Control type="file" name="profilePicture" accept='.png, .jpg, jpeg' required onChange={(e) => setPictureFile(e.target.files[0])}></Form.Control>
            <Button onClick={handleSubmit}>Save</Button>
            <ToastContainer position="top-center"></ToastContainer>
        </InputGroup>
        </>
    )
}

export default AddNewPicture; 