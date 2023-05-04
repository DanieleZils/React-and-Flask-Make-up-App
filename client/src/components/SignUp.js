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

    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
        e.preventDefault();

        function handleErrors(response) {
            if (!response.ok) {
                window.alert("Error: Ensure all fields are valid");
                throw Error(response.statusText)
            }
            return response.json();
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
            lastName
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
          <div>
          <label htmlFor="last_name">Last Name  </label>
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          </div>
          <div>
          <label htmlFor="email">Email  </label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          </div>
          <div>
          <label htmlFor="username">Username  </label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          </div>
          <div>
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