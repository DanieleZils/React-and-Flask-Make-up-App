import React, {useState, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import gold from '../assets/gold.png';
import {AiOutlineShoppingCart} from 'react-icons/ai';
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai'


const categories = [
  { name: "Face", path: "/face" },
  { name: "Lip", path: "/lip" },
  { name: "Eye", path: "/eye" },
];

const Navbar = () => {

  const { user, setUser } = useContext(UserContext);

  const [dropdown, setDropdown] = useState(null);

  const navigate = useNavigate();

  //handle opening and closing of the mobile nav menu
  const [navOpen, setNavOpen] = useState(false);

  const handleNavClick = () => setNavOpen(!navOpen);

  const handleNavClose = () => {
    setNavOpen(false);
  };

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

   <div className='w-full'>
      <div className="w-full h-28 border-b-2 border-gray-700 bg-stone-800">
        <div className="max-w-screen-xl h-full mx-auto flex items-center justify-between px-4 md:px-0">
          <div className=''>
            <Link to="/">
              <img src={gold} alt="logo" className='w-40'/>
            </Link>
          </div>
          <div className='flex items-center'>
          <ul className="hidden md:flex items-center gap-8">
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
      
      <div onClick={handleNavClick} className='block md:hidden px-8'>
           {navOpen ? <AiOutlineClose size={30} className='text-white' /> : <AiOutlineMenu size={30} className='text-white'/>}
      </div>
      <div className={navOpen ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-300 bg-gray-100 ease-in-out duration-500 z-50': 'ease-in-out duration-500 fixed left-[-100%] z-50'}>
          <div className="m-4 p-4">
            <Link onClick={handleNavClose}
            to="/">
              <img src={gold} alt="logo" className='w-40'/>
            </Link>
          </div>
          <ul className='uppercase p-4'>
          <li>
              <Link
                onClick={handleNavClose}
                to="/"
                className="text-xl text-stone-800 font-bold hover:opacity-50 cursor-pointer duration-300 py-7 "
              > Home
              </Link>
            </li>
            <li>
              <Link
                 onClick={handleNavClose}
                 className="text-xl text-stone-800 font-bold hover:opacity-50 cursor-pointer duration-300"
                 to="/products"
              > Products
              </Link>
            </li>
            {user ? (
            <li className="relative"
                onMouseEnter={() => setDropdown('cart')}
                onMouseLeave={() => setDropdown(null)}
            >
              <Link onClick={() => {
               toggleDropdown('cart');
               handleNavClose()}}
               className="mx-4" to="/cart">
              <AiOutlineShoppingCart className="text-3xl text-stone-800" />
              </Link>
              {user && dropdown === 'cart' && (
                <div className="relative py-4  text-stone-800 text-lg font-bold my-auto overflow-hidden hidden ">
                  <div className='transition duration-300 hover:scale-110'>
                  <Link onClick={handleNavClose} to="/past-orders">Order History</Link>
                  </div>
                </div>
              )}
            </li>
            ) : (
              null
            )}
            {user ? (
              <>
                <li>
                  <span className='text-lg font-bold text-stone-800'>Welcome, {user.username}!</span>
                </li>
                <li>
                  <div className='overflow-hidden p-4'>
                  <button onClick={handleLogoutClick} className='transition duration-300 hover:scale-110 text-lg'>Logout</button>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li className="relative">
                  <Link
                    onClick={handleNavClose}
                    className="text-xl text-stone-800 font-bold hover:opacity-50 cursor-pointer duration-300"
                    to="/login"
                  >
                    Login
                  </Link>
                  </li>
                  <li>
                    <Link 
                    onClick={handleNavClose}
                    className="text-xl text-stone-800 font-bold hover:opacity-50 cursor-pointer duration-300"
                    to="/signup">
                    Signup</Link>
                </li>
              </>
            )}
          </ul>
      </div>
    </div>
    </div>
  </div>
  );
}  

export default Navbar;
          