//Navbar based on example in react bootstrap documentation: https://react-bootstrap.netlify.app/docs/components/navbar
import Header from "./Header";
import ShowUsers from "./ShowUsers";
import Navigation from "./Navigation";
import {useEffect} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
const MainPage = () => {
    useEffect(() => {
        console.log("Fetching main page..")
        fetch("/api/main", {
            headers: {
                "authorization": "Bearer " + localStorage.getItem("auth_token")
            }
        })
        .then(console.log("main page"))
    })
    return(
        <>
            <Navigation></Navigation>
            <Header text="Welcome to New Friends Site!"></Header>
            <ShowUsers></ShowUsers>
    </>
    )
}
export default MainPage;