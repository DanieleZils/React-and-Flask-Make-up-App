import React from 'react';
import {Link} from 'react-router-dom';



function ProductCard({product}){



    return (
        <div className='productCard'>
            <Link className='productLinks' to={`/products/${product.id}`}>
                <h3>{product.name}</h3>
                <h4> Price: {product.price}</h4>
                {/* <h3 className="view">View Product Details</h3> */}
                <img src={product.image_url} alt={product.name} />
            </Link>
        </div>
    )
}

export default ProductCard;