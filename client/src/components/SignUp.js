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
      <div className="form-container">
        {errors.map((error, index) => (
          <div key={index} className="error-message">
            {error}
          </div>
        ))}
        <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <div className="form-group">
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          </div>
          <div className="form-group">
          <label htmlFor="last_name">Last Name  </label>
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          </div>
          <div className="form-group">
          <label htmlFor="email">Email  </label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          </div>
          <div className="form-group">
          <label htmlFor="username">Username  </label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          </div>
          <div className="form-group">
          <label htmlFor="password">Password  </label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
    
  };
  
  export default Signup;