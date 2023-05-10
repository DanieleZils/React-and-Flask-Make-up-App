import React from "react";
import Footer from "./Footer";



function Products({productCards}){


    return (
        <div className="glassy-bg ">
            <div className="max-w-screen-xl mx-auto py-14 grid grid-cols-4 gap-8">
                {productCards}
            </div>
            < Footer />
        </div>
    )
}

export default Products;