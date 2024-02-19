import {useState, useEffect} from 'react'; 
import Header from '../Header/Header';
import { ToastContainer, toast } from "react-toastify";
const EditEmail = (props) => {
    console.log(props.email)
    const [email, setEmail] = useState("");
    const [updateData, setUpdateData] = useState();
    const handleChange = (e) => {
        setEmail({...email, [e.target.name]: e.target.value})
    }
    const handleSubmit = (event) => {
        event.preventDefault(); 
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
        .then(data => setUpdateData(data));
    }
        console.log(updateData);
        if(updateData) {
            if (updateData.message === "Email and username updated successfully") {
                localStorage.setItem("username", updateData.username);
            }
        }
        //Updating the username in local storage if it was updated

        //localStorage.setItem("username", updateData.)
    return(
        <>
        <div className='container-m'>
            <Header type="h3" text="New email:"></Header>
            <input name="email" type="email" onChange={handleChange} placeholder="Add new email address.."></input>    
            <button id="submit" onClick={handleSubmit}>Save</button>
        </div>
        <ToastContainer position="top-center"></ToastContainer>
        </>
    )
}

export default EditEmail; 