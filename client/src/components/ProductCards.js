import React from 'react';
import {Link} from 'react-router-dom';




function ProductCard({product}){



    return (
        <Link to={`/products/${product.id}`} className="group">
         <div className="bg-white border border-gray-20 shadow-lg rounded-3xl overflow-hidden 
         transition duration-300 transform group-hover:scale-11 w-40 sm:max-w-md md:w-full lg:max-w-xl h-60 md:h-auto flex flex-col items-center justify-center mx-5 lg:mx-0">
            <img
            className="w-full rounded-3xl h-full object-fill md:object-cover"
            src={product.image_url}
            alt={product.name}
            />
         <div className="p-4">
          <h3 className="text-sm md:text-lg font-semibold text-gray-800">{product.name}</h3>
          <h4 className="mt-2 text-sm md:text-lg text-gray-600">Price: {product.price}</h4>
        </div>
      </div>
    </Link>
  );
    
}

export default ProductCard;