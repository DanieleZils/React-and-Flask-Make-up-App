import React from "react";




function Products({productCards}){


    return (
        <div className="glassy-bg py-10 ">
            <div className="max-w-screen-xl mx-auto py-10 grid grid-cols-4 gap-10">
                {productCards}
            </div>
        </div>
    )
}

export default Products;