import {useState} from 'react'; 
import Header from '../Texts/Header';
import Form from 'react-bootstrap/Form';
import { Button, InputGroup} from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
const AddProfileBio = (props) => {
    const [bioText, setBioText] = useState("")
    const handleChange = (e) => {
        setBioText({...bioText, [e.target.name]: e.target.value})
    }
    const handleSubmit = (event) => {
        event.preventDefault(); 
        if (bioText !== "") {
            fetch("/api/user/profile/bio/" + props.username, {
                method: "POST", 
                headers: {
                    "Content-type": "application/json",
                    "authorization": "Bearer " + localStorage.getItem("auth_token")
                },
                body: JSON.stringify(bioText), 
                mode: "cors"
            })
            .then(response => response.json())
            .then(data => handleToast(data));
        } else {
            toast.warning("Bio cannot be empty!");
        }
    }

    const handleToast = (data) => {
        if (data) {
            toast.success(data.message)
        }
    }
    return(
        <>
        <Header type="h5" text="New Bio text: "></Header>
        <InputGroup size="sm">
            <Form.Control size="sm" as="textarea" name="bio" maxLength={300} placeholder='Tell something about yourself..' onChange={handleChange} required></Form.Control>
            <Button onClick={handleSubmit}>Save</Button>
        </InputGroup>
        <ToastContainer position="top-center"></ToastContainer>
        </>
    )
}

export default AddProfileBio; 