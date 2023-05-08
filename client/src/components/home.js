import React from "react";
import FeaturedProducts from "./FeaturedProducts";
import Hero from "./Hero";



function Home(){

    return (
    <div className="glassy-bg">
        <div className="homeFeat">
            <Hero/>
            <FeaturedProducts />
        </div>
         <div>
            <footer className="footer">
                <h2>this is the footer</h2>
            </footer>
         </div>
    </div>
    )
}

export default Home;

