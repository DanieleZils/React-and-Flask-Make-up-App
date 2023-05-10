import React, {useState, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import gold from '../assets/gold.png';
import {AiOutlineShoppingCart} from 'react-icons/ai';


const categories = [
  { name: "Face", path: "/face" },
  { name: "Lip", path: "/lip" },
  { name: "Eye", path: "/eye" },
];

const Navbar = () => {

  const { user, setUser } = useContext(UserContext);

  const [dropdown, setDropdown] = useState(null);

  const navigate = useNavigate();


  function handleLogoutClick() {
      fetch("/logout", { method: "DELETE" }).then(() => {
        setUser(null);
        localStorage.removeItem("user"); // Remove user from localStorage
        navigate("/");
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
   
      <div className="w-full h-28 border-b-2 border-gray-700 bg-stone-800">
        <div className="max-w-screen-xl h-full mx-auto flex items-center justify-between">
          <div className=''>
            <Link to="/">
              <img src={gold} alt="logo" className='w-40'/>
            </Link>
          </div>
          <div className='flex items-center'>
          <ul className="flex items-center gap-8">
            <li>
              <Link
                to="/"
                className="text-xl text-white font-bold hover:opacity-50 cursor-pointer duration-300 py-7 px-3 inline-block"
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
                 className="text-xl text-white font-bold hover:opacity-50 cursor-pointer duration-300"
                 to="/products"
              >
                Products
              </Link>
              {dropdown === 'products' && (
              <div className="absolute py-4 space-y-2 text-black text-lg font-bold my-auto rounded-md p-8 hidden shadow-md z-10 backdrop-blur-lg bg-white/50">
                {categories.map((category) => (
                  <div className="transition duration-300 hover:scale-125" key={category.name}>
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
                  <div className='overflow-hidden p-4'>
                  <button onClick={handleLogoutClick} className='transition duration-300 hover:scale-110 text-lg'>Logout</button>
                  </div>
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
                    className="text-xl text-white font-bold hover:opacity-50 cursor-pointer duration-300"
                    to="/login"
                  >
                    Login
                  </Link>
                  {dropdown === 'login' && (
                  <div className="absolute py-4 space-y-2 text-black text-lg font-bold my-auto rounded-md p-8 overflow-hidden hidden shadow-md z-10 backdrop-blur-lg bg-white/50">
                    <div className='transition duration-300 hover:scale-110'>
                    <Link to="/signup">Signup</Link>
                    </div>
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
                <div className="absolute py-4 space-y-2 text-black text-lg font-bold my-auto rounded-md p-8 overflow-hidden hidden shadow-md z-10 backdrop-blur-lg bg-white/50">
                  <div className='transition duration-300 hover:scale-110'>
                  <Link to="/past-orders">Order History</Link>
                  </div>
                </div>
              )}
            </li>
            ) : (
              null
            )}
          </ul>

        </div>
      </div>
    </div>
  );
  
}  

export default Navbar;
          