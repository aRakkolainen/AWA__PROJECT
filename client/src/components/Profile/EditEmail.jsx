import {useState} from 'react'; 
import Header from '../Texts/Header';
import { ToastContainer, toast } from "react-toastify";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { InputGroup } from 'react-bootstrap';
const EditEmail = (props) => {
    const [email, setEmail] = useState("");
    const handleChange = (e) => {
        setEmail({...email, [e.target.name]: e.target.value})
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (email !== "") {
            fetch("/api/user/profile/email/" + props.email, {
                method: "POST", 
                headers: {
                    "Content-type": "application/json",
                    "authorization": "Bearer " + localStorage.getItem("auth_token")
                },
                body: JSON.stringify(email), 
                mode: "cors"
            })
            .then(response => response.json())
            .then(data => handleUpdate(data));
        } else {
            toast.warning("Email cannot be empty!");
        }
    }
    //Updates the email and/or username
    const handleUpdate = (data) => {
        if (data) {
            //Updating the username in local storage if it was updated
            if (data.message === "Email and username updated successfully") {
                localStorage.setItem("username", data.username);
            } 
            if (data.status === 200) {
                toast.success(data.message + ", refresh the page to see change");
            } else {
                toast.error(data.message);
            }
        }
    }

    return(
        <>
        <Header type="h5" text="New Email: "></Header>
        <InputGroup>
            <Form.Control type="email" name="email" maxLength={250} placeholder='Fill new email..' onChange={handleChange}></Form.Control>
            <Button onClick={handleSubmit}>Save</Button>
        </InputGroup>
        <ToastContainer position="top-center"></ToastContainer>
        </>
    )
}

export default EditEmail; 