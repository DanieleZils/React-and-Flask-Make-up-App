import React from "react";
import FeaturedProducts from "./FeaturedProducts";
import { EmblaCarousel } from "./EmblaCarousel";


function Home(){

    return (
    <div>
        <EmblaCarousel />
          <div className="homeFeat">
           <h2 style={{fontFamily:"Roboto"}}>Featured Products</h2>
            <FeaturedProducts />
         </div>
    </div>
    )
}

export default Home;

