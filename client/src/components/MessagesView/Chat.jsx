import Header from "../Header/Header";
import MessageItem from "./MessageItem";
import SendMessage from "./SendMessage";
import "./styles.css"
//Component for showing individual chat
const Chat = (props) => {
    
    console.log(props.recipient)
    return(
        <div className="container-fluid" id="chat">
            <Header type="h2" text={props.recipient}></Header>
            <MessageItem content={props.content}>
            </MessageItem>

            <SendMessage recipient={props.recipient}></SendMessage>


        </div>


    )


}

export default Chat;