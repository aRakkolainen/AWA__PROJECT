import {useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const ShowUsers = function() {
    const [userData, setUserData] = useState([]);
    useEffect(() => {
        fetch("/api/user/list", { method:"GET",
            headers: {
                "authorization": "Bearer " + localStorage.getItem("auth_token")
            }
        })
        .then(response => response.json())
        .then(json => setUserData(json));
    }, [])
    console.log(userData)
    return(
        <div className='container'>

        <Card style={{width: '18rem'}}>
            <Card.Img variant="top">
            </Card.Img>
            <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text>
                    I like video games!
                </Card.Text>
                <Button variant="primary">LIKE</Button>
            </Card.Body>
        </Card>
        </div>
    )
}

export default ShowUsers;