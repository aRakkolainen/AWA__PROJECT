import {useState, useEffect} from 'react'; 
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
            <label for="bio">Bio text: </label>
            <input name="bio" type="textarea" maxLength={50} onChange={handleChange} placeholder="Add new bio text.."></input>    
            <button id="submit" onClick={handleSubmit}>Save</button>
        </div>
        </>
    )
}

export default AddProfileBio; 