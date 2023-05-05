import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import logo from '../assets/logo.png';


const categories = [
  { name: "Face Makeup", path: "/face" },
  { name: "Lip Makeup", path: "/lip" },
  { name: "Eye Makeup", path: "/eye" },
  { name: "All Products", path: "/products" },
];

const Navbar = () => {

  const { user, setUser } = useContext(UserContext);

  function handleLogoutClick() {
      fetch("/logout", { method: "DELETE" }).then(() => {
        setUser(null);
        localStorage.removeItem("user"); // Remove user from localStorage
      });
  }

  return (
    <nav className="navBar">
      <div className='logo'>
        <Link to="/">
        <img src={logo} alt="logo" />
        </Link>
      </div>
      <div>
        <Link to="/" className='navLink'>Home</Link>
      </div>
      <div className="dropdown">
        <Link to="/products" className='navLink'>Products</Link>
        <div className="dropdown-content">
          {categories.map((category) => (
            <Link key={category.name} to={category.path}>
              {category.name}
            </Link>
          ))}
        </div>
      </div>
      <div>
        {user ? (
          <>
            <span> Welcome, {user.username}! </span>
            <button onClick={handleLogoutClick}>Logout</button>
          </>
        ) : (
          <>
           <div className='dropdown dropdown-login'>
            <Link to="/login" className='navLink'>Login </Link>
              <div className='dropdown-content'>
                <Link to="/signup" className='navLink'> Signup </Link>
              </div>
            </div>
          </>
        )}
        <div className='dropdown'>
        <Link to="/cart" className='navLink'> Cart </Link>
         {user && (
           <div className='dropdown-content'>
            <Link to="/past-orders" className='navLink'> Order History </Link>
            </div>   
            )}
      </div>
      </div>
    </nav>
  );
};

export default Navbar;