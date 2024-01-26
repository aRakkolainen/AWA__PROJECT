const Register = function() {
    return(
        <div className="container">
            <form action="/api/user/register" method="POST">
                <label for="email">Email: </label>
                <input name="email" type="email" placeholder="Fill out an email.."></input>
                <br></br>
                <br></br>
                <label for="password">Password</label>
                <input name="password" type="password" placeholder="Fill out an password.."></input>
                <br></br>
                <button id="submit">Register</button>
            </form>
        </div>
    )
}
export default Register; 