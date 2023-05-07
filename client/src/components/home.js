import React from "react";
import FeaturedProducts from "./FeaturedProducts";



function Home(){

    return (
    <div>
          <div className="homeFeat">
           <h2 style={{fontFamily:"Roboto"}}>Featured Products</h2>
            <FeaturedProducts />
         </div>
    </div>
    )
}

export default Home;

