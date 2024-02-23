import "./styles.css";
//This is simply header that is clickable
const ClickableHeader = function(props) {
    return (
        <>
            <div className={props.type} onClick={props.handleClick}>{props.text}</div>
           
        </>
    )
}
export default ClickableHeader; 