import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


const UserItem = (props) => {
    return(
        <>
            <Card style={{width: '18rem'}}>
            <Card.Img variant="top" src={props.img}>
            </Card.Img>
            <Card.Body>
                <Card.Title>{props.username}</Card.Title>
                <Card.Text>
                    {props.bio}
                </Card.Text>
                <Button variant="secondary" onClick={props.dislike}>DISLIKE</Button>
                <Button variant="primary" onClick={() => {props.like(props.username)}}>LIKE</Button>
            </Card.Body>
        </Card>
        
        
        </>

    )
}
export default UserItem; 