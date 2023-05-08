import React from 'react';
import {Link} from 'react-router-dom';



function ProductCard({product}){



    return (
        <Link to={`/products/${product.id}`} className="group">
         <div className="bg-white border border-gray-20 shadow-lg rounded-3xl overflow-hidden transition duration-300 transform group-hover:scale-105">
            <img
            className="w-full rounded-3xl object-cover object-center"
            src={product.image_url}
            alt={product.name}
            />
         <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
          <h4 className="mt-2 text-gray-600">Price: {product.price}</h4>
        </div>
      </div>
    </Link>
  );
    
}

export default ProductCard;