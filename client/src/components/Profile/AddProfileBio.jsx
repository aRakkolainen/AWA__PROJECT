import {useState, useEffect} from 'react'; 
import Header from '../Header/Header';
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
        .then(data => {
            console.log(data)
        })
    }
    return(
        <>
        <div className='container-m'>
            <Header type="h3" text="Description:"></Header>
            <input name="bio" type="textarea" maxLength={200} onChange={handleChange} placeholder="Tell something about yourself!.."></input>    
            <button id="submit" onClick={handleSubmit}>Save</button>
        </div>
        </>
    )
}

export default AddProfileBio; 