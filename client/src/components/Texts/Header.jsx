import "./styles.css";
//Custom header
const Header = function(props) {
    return (
        <>
        <div>
            <p className={props.type} id={props.id}>{props.text} <span></span> {props.content}</p>
        </div>
        
        </>
    

    )
}
export default Header; 