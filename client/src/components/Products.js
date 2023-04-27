import React, {useState} from "react";
import Navbar from "./NavBar";



function Products({productCards}){


    return (
        <div>
            <div className="productList">
                {productCards}
            </div>
        </div>
    )
}

export default Products;