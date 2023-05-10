import React, {useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import gold from '../assets/gold.png';
import {AiOutlineShoppingCart} from 'react-icons/ai';


const categories = [
  { name: "Face", path: "/face" },
  { name: "Lip", path: "/lip" },
  { name: "Eye", path: "/eye" },
  { name: "Products", path: "/products" },
];

const Navbar = () => {

  const { user, setUser } = useContext(UserContext);

  const [dropdown, setDropdown] = useState(null);


  function handleLogoutClick() {
      fetch("/logout", { method: "DELETE" }).then(() => {
        setUser(null);
        localStorage.removeItem("user"); // Remove user from localStorage
      });
  }

  function toggleDropdown(dropdownName){
    if (dropdown === dropdownName){
      setDropdown(null)
    } else {
      setDropdown(dropdownName)
    }
  }


  

  
  return (
    <div className='bg-stone-800 relative'>
      <nav className="w-full h-28 border-b-2 border-gray-700">
        <div className="h-full flex items-center justify-around px-32">
          <div className="mx-1 w-40">
            <Link to="/">
              <img src={gold} alt="logo" />
            </Link>
          </div>
          <ul className="flex items-center gap-8">
            <li>
              <Link
                to="/"
                className="text-xl text-white font-bold hover:text-red-900 cursor-pointer duration-300 py-7 px-3 inline-block"
              >
                Home
              </Link>
            </li>
            <li className="relative" 
                 onMouseEnter={() => setDropdown('products')}
                 onMouseLeave={() => setDropdown(null)}
            >
              <Link
                 onClick={() => toggleDropdown('products')}
                 className="text-xl text-white font-bold hover:text-red-900 cursor-pointer duration-300"
                 to="/products"
              >
                Products
              </Link>
              {dropdown === 'products' && (
              <div className="absolute left-0 mt-2 space-y-2 text-black text-xl my-auto rounded-md p-3 hidden backdrop-blur-xl bg-white shadow-md z-10">
                {categories.map((category) => (
                  <div className="hover:text-red-900" key={category.name}>
                    <Link to={category.path}>
                      {category.name}
                    </Link>
                  </div>
                ))}
              </div>
              )}
            </li>
            {user ? (
              <>
                <li>
                  <span className='text-xl text-white'>Welcome, {user.username}!</span>
                </li>
                <li>
                  <button onClick={handleLogoutClick}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="relative"
                     onMouseEnter={() => setDropdown('login')}
                     onMouseLeave={() => setDropdown(null)} 
                >
                  <Link
                    onClick={() => toggleDropdown('login')}
                    className="text-xl text-white font-bold hover:text-red-900 cursor-pointer duration-300"
                    to="/login"
                  >
                    Login
                  </Link>
                  {dropdown === 'login' && (
                  <div className="absolute left-0 mt-2 space-y-2 text-black text-xl my-auto rounded-md p-3 hidden  bg-white hover:text-red-900">
                    <Link to="/signup">Signup</Link>
                  </div>
                  )}
                </li>
              </>
            )}
            {user ? (
            <li className="relative"
                onMouseEnter={() => setDropdown('cart')}
                onMouseLeave={() => setDropdown(null)}
            >
              <Link onClick={() => toggleDropdown('cart')} className="mx-4" to="/cart">
                <AiOutlineShoppingCart className="text-3xl text-white" />
              </Link>
              {user && dropdown === 'cart' && (
                <div className="absolute left-0 mt-2 space-y-2 text-black text-xl my-auto rounded-md p-3 hidden bg-white hover:text-red-900">
                  <Link to="/past-orders">Order History</Link>
                </div>
              )}
            </li>
            ) : (
              null
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
  
}  

export default Navbar;
          