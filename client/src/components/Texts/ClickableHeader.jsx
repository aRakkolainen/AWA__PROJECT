import "./styles.css";
//This is simply header that is clickable
const ClickableHeader = function(props) {
    return (
        <>
            <div onClick={props.handleClick}>
                <p className={props.type}>{props.text}</p>
            </div>
        </>
    )
}
export default ClickableHeader; 