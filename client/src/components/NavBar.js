import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';


const Navbar = () => {

  const { user, setUser } = useContext(UserContext);

  function handleLogoutClick() {
      fetch("/logout", { method: "DELETE" }).then(() => {
        setUser(null);
        localStorage.removeItem("user"); // Remove user from localStorage
      });
  }

return (
  <nav className='navBar'>
    <div>
      <Link to="/">Home</Link>
    </div>
    <div>
    <Link to="/products"> Products </Link>
    </div>
      <div>
      {user ? (
          <>
          <span> Welcome, {user.username}! </span>
          <button onClick={handleLogoutClick}>Logout</button>
          </>
      ) : (
          <>
          <Link to="/signup">Signup </Link>
          <Link to="/login">Login </Link>
          </>
      )}
      <Link to = "/cart"> Cart </Link>
    </div>
  </nav>
  );
};

export default Navbar;