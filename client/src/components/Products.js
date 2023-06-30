import React from "react";
import Footer from "./Footer";



function Products({productCards}){


    return (
        <div className="glassy-bg">
            <div className="md:max-w-screen-xl mx-auto py-14 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-8 gap-2">
                {productCards}
            </div>
            < Footer />
        </div>
    )
}

export default Products;