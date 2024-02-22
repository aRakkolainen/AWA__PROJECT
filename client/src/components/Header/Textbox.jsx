import "./styles.css";

const Textbox = function(props) {
    return (
        <>
        <div id="textbox">
            <p className={props.headerType}>{props.header} </p><span></span> <p className={props.textType}>{props.text}</p>  
        </div>
        </>

    )
}
export default Textbox; 