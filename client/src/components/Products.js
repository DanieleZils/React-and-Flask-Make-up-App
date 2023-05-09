import React from "react";
import Footer from "./Footer";



function Products({productCards}){


    return (
        <div className="glassy-bg ">
            <div className="max-w-screen-2xl mx-auto py-10 grid grid-cols-4 gap-12">
                {productCards}
            </div>
            < Footer />
        </div>
    )
}

export default Products;