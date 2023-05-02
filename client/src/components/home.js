import React from "react";
import FeaturedProducts from "./FeaturedProducts";



function Home(){

    return (
        <div className="homeFeat">
           <h2 style={{fontFamily:"Roboto"}}>Featured Products</h2>
            <FeaturedProducts />
           
        </div>
    )
}

export default Home;

