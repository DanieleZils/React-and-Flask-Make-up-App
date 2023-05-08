import React, { useState, useContext} from "react";
import { UserContext } from './UserContext';
import { useNavigate, Link, useLocation } from "react-router-dom";


function Login() {
    const { user, setUser } = useContext(UserContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const location = useLocation();
    const fromProductDetail = location.state?.fromProductDetail || false;

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

<div className="min-h-screen flex items-start pt-20 justify-center glassy-bg ">
    <div className="w-full max-w-md p-8 bg-white bg-opacity-60 backdrop-blur-md rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
           {fromProductDetail && (
              <p className="mt-4 text-red-600 font-bold">
                Please login to Shop!
              </p>
            )}
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <div className="space-y-2">
          <label htmlFor="username" className="block text-l font-medium">
            Username
          </label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="block text-l font-medium">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 text-white bg-black rounded-md hover:opacity-60"
        >
          Login
        </button>
        <p className="text-sm text-center">
          New to Pure Glow?{" "}
          <Link
            to="/signup"
            className="text-[#6d2b3d] font-bold underline hover:text-black"
          >
            Signup Here!
          </Link>
        </p>
      </form>
    </div>
  </div>
);
}

export default Login;
