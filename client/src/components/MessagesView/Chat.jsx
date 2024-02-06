import Header from "../Header/Header";
import MessageItem from "./MessageItem";
import SendMessage from "./SendMessage";
import "./styles.css"
//Component for showing individual chat
const Chat = (props) => {
    
    //console.log(props.recipient)
    console.log(props.messages)
    const getMessage = (i) => {
        return props.messages[i];
    }

    return(
        <div className="container-fluid" id="chat">
            <Header type="h2" text={props.recipient}></Header>
            <MessageItem messages={props.messages}>
            </MessageItem>

            <SendMessage recipient={props.recipient}></SendMessage>


        </div>


    )


}

export default Chat;