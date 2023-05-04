import React, { useState, useContext} from "react";
import { UserContext } from './UserContext';
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const { user, setUser } = useContext(UserContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        

        function handleErrors(response) {
            if (!response.ok) {
                window.alert("Error: Ensure all fields are valid");
                throw Error(response.statusText)
            }
            return response.json();
        }

        fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password
        }),
        })
            .then(handleErrors)
            .then((user) => {
                setUser(user);
                localStorage.setItem("user", JSON.stringify(user));
                navigate("/");
              })
            .catch(error => console.log("Validation Error: Ensure all fields are valid", error))
                
    }

 
 
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div>
        <label htmlFor="username">Username </label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        </div>
        <div>
        <label htmlFor="password"> Password </label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        <button type="submit">Login</button>
        <p>
          New to Pure Glow? <Link to="/signup"> Signup Here! </Link>
        </p>
      </form>
    </div>
  );

}

export default Login;
