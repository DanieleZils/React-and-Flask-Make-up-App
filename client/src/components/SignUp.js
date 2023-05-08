import React, {useContext, useState} from "react";
import { UserContext } from './UserContext';
import { useNavigate } from "react-router-dom";


// pass setUser from App
const Signup = () => {
    const { setUser } = useContext(UserContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      async function handleErrors(response) {
        if (!response.ok) {
          return { errorData: await response.json(), isError: true };
        }
        return { data: await response.json(), isError: false };
      }
    
      fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          email,
          firstName,
          lastName,
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
    <div className="min-h-screen flex justify-center glassy-bg items-start pt-20">
      <div className="w-full max-w-md p-8 bg-white bg-opacity-60 backdrop-blur-md rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-3xl font-bold text-center">Sign Up</h1>
          {errors.map((error, index) => (
          <div key={index} className="error-message">
            {error}
          </div>
          ))}
          <div className="space-y-2">
            <label htmlFor="first_name" className="block text-l font-medium" >First Name</label>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="space-y-2">
          <label htmlFor="last_name" className="block text-l font-medium">Last Name  </label>
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          </div>
          <div className="space-y-2">
          <label htmlFor="email" className="block text-l font-medium">Email  </label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          </div>
          <div className="space-y-2">
          <label htmlFor="username" className="block text-l font-medium">Username  </label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          </div>
          <div className="space-y-2">
          <label htmlFor="password" className="block text-l font-medium">Password  </label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          </div>
          <button type="submit" className="w-full py-2 text-white bg-black rounded-md hover:opacity-60">
          Sign Up</button>
        </form>
      </div>
    </div>
    );
    
  };
  
  export default Signup;