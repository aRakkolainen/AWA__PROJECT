import Form from 'react-bootstrap/Form';
import {useState} from "react";
import { toast, ToastContainer } from 'react-toastify';

const SendMessage = (props) => {
    const [message, setMessage] = useState();
    const handleSubmit = (event) => {
        event.preventDefault();
        //Message object: 
        let newMessage = {
            sender: localStorage.getItem("username"),
            recipient: props.recipient, 
            sendingTime: new Date(),
            content: message.message 
        }

        fetch("/api/user/send/message", {method: "POST", 
            headers: {
                "Content-type": "application/json",
                "authorization": "Bearer " + localStorage.getItem("auth_token")
            }, body: JSON.stringify(newMessage)
        })
        .then(response => response.text())
        .then(data => toast(data))
    }
    const handleChange = (e) => {
        setMessage({...message, [e.target.name]: e.target.value})
    }
    return (
        <Form onSubmit={handleSubmit} onChange={handleChange}>
            <Form.Control type="text" name="message" placeholder='Write new message..'></Form.Control>
            <ToastContainer position="top-center"></ToastContainer>
        </Form>
    )
}

export default SendMessage; 