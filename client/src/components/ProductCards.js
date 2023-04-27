import React from 'react';



function ProductCard({product}){



    return (
        <div className='productCard'>
                <h3>{product.name}</h3>
                <h4> Price: {product.price}</h4>
                <img src={product.image_url} alt={product.name} />
                <h3 className="view">View Product Details</h3>
        </div>
    )
}

export default ProductCard;