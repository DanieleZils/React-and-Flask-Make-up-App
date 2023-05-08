import React from "react";
import FeaturedProducts from "./FeaturedProducts";
import Hero from "./Hero";
import { Link } from "react-router-dom";
import Footer from "./Footer";



function Home(){

    return (
    <div className="glassy-bg">
        <div className="hero">
            <Hero/>
        </div>
        <div className="flex flex-col items-center gap-4 py-20">
            <span className="w-32 h-[3px] bg-black"></span>
            <h1 className="text-3xl font-bold py-8">Best Sellers</h1>
            <span className="w-32 h-[3px] bg-black"></span>
            <FeaturedProducts/>
        </div>
        <div>
            < Footer />
        </div>
    </div>
    )
}

export default Home;

