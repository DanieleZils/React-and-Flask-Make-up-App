import React from "react";




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