import {useState, useEffect} from 'react'; 
import Header from '../Header/Header';
import Form from 'react-bootstrap/Form';
import { Button, Toast } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
const AddProfileBio = (props) => {
    const [bioText, setBioText] = useState("")
    const handleChange = (e) => {
        setBioText({...bioText, [e.target.name]: e.target.value})
    }
    const handleSubmit = (event) => {
        event.preventDefault(); 
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
        .then(data => { toast(data);
        })
    }
    return(
        <>
        <div className='container-m'>
            <Form onSubmit={handleSubmit} onChange={handleChange}>
                <Form.Label htmlFor='bio' >New bio: </Form.Label>
                <Form.Control size="sm" as="textarea" name="bio" maxLength={250} placeholder='Tell something about yourself..'></Form.Control>
                <Button onClick={handleSubmit}>Save</Button>
            </Form>
            <ToastContainer position="bottom-center"></ToastContainer>
        </div>
        </>
    )
}

export default AddProfileBio; 