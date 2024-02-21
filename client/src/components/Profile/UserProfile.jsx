import Header from "../Header/Header";

const UserProfile = (props) => {
    return(
        <div className="container-m" id="userProfile">
            <Header type="h2" text="Your information"></Header>
            <Header type="h4" text={"Email: "+props.user.email}></Header>
            <Header type="h4" text={"Username: "+props.user.username}></Header>
            <Header type="h5" text={"Registering date: " + props.user.registerDate}></Header>
            <Header type="h5" text={"Bio: " + props.user.bio}></Header>
        </div>
    )
}

export default UserProfile; 