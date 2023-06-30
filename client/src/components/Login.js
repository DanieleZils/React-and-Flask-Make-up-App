import React, { useState, useContext} from "react";
import { UserContext } from './UserContext';
import { useNavigate, Link, useLocation } from "react-router-dom";
import Footer from "./Footer";


function Login() {
    const { user, setUser } = useContext(UserContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const location = useLocation();
    const fromProductDetail = location.state?.fromProductDetail || false;

    const navigate = useNavigate();

    function handleSubmit(e) {
      e.preventDefault();
      

      async function handleErrors(response) {
        if (!response.ok) {
          return { errorData: await response.json(), isError: true };
        }
        return { data: await response.json(), isError: false };
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
        .then((result) => {
          if (result.isError) {
            const errorData = result.errorData;
            if (errorData.error) {
              setErrors([errorData.error]);
            } else if (errorData.errors) {
              setErrors(errorData.errors);
            } else {
              setErrors(["Unexpected error occurred"]);
            }
          } else {
            const user = result.data;
            setUser(user);
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/");
          }
        })
        .catch((error) => {
          setErrors(["An error occurred. Please try again later."]);
    });
  };

 
 return (
<div className="min-h-screen flex flex-col glassy-bg overflow-auto">
 <div className="flex-grow flex items-start py-20 justify-center">
    <div className="w-full max-w-md p-16 bg-white bg-opacity-60 backdrop-blur-md rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
           {fromProductDetail && (
              <p className="mt-4 text-red-600 font-bold">
                Please login to shop!
              </p>
            )}
        <h1 className="text-3xl font-bold text-center">Login</h1>
        {errors.map((error, index) => (
          <div key={index} className="text-red-600 font-bold">
            {error}
          </div>
          ))}
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
          <p className="text-xs text-gray-500">Username must be at least 4 characters long</p>
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
          <p className="text-xs text-gray-500">Password must be at least 8 characters long</p>
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
  <Footer />
</div>
);
}

export default Login;
