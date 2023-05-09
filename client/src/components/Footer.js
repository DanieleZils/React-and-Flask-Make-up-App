import React from 'react';
import Gold from '../assets/gold.png';



const Footer = () => {
    return (
      <footer className="bg-stone-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-start">
            <div className="w-full md:w-1/2 mb-4 md:mb-0">
              <img src={Gold} alt="logo" className="w-36 mb-4" />
              <div>
                <p className="text-white text-sm">
                  Clean makeup for a healthier, more radiant you.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 text-center md:text-right">
              <ul className="flex flex-wrap justify-center md:justify-end mb-4 py-4">
                <li className="mx-2">
                  <a href="/" className="text-white hover:text-red-300">
                    Home
                  </a>
                </li>
                <li className="mx-2">
                  <a href="/products" className="text-white hover:text-red-300">
                    Products
                  </a>
                </li>
                <li className="mx-2">
                  <a href="/signup" className="text-white hover:text-red-300">
                    Signup
                  </a>
                </li>
                <li className="mx-2">
                  <a href="/login" className="text-white hover:text-red-300">
                    Login
                  </a>
                </li>
              </ul>
              <div>
                <p className="text-white text-sm py-16">
                  &copy; {new Date().getFullYear()} Pure Glow. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  
