import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";



function FeaturedProducts() {

    const [ featuredProducts, setFeaturedProducts ] = useState([]);
    const [ randomFeaturedProducts, setRandomFeaturedProducts ] = useState([]);


    function getRandomElements(arr, count) {
        const shuffled = [...arr];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled.slice(0, count);
      }

    useEffect(() => {
        fetch('/featured-products')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error fetching featured products');
                }
            })
            .then(data => {
                setFeaturedProducts(data);
            })
            .catch(error => {
                console.error('Error fetching featured products:', error);
            });
    }, []);





    useEffect(() => {
        setRandomFeaturedProducts(getRandomElements(featuredProducts, 5));
      }, [featuredProducts]);
    
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 py-20 px-2 ">
          {randomFeaturedProducts.map((product) => (
            <div key={product.id} className="w-full h-38 md:h-64 relative border border-gray-300 rounded-3xl overflow-hidden transition duration-300 hover:scale-110">
              <Link to={`/products/${product.id}`}>
                <img className="w-full h-full object-fill md:object-cover rounded-3xl" src={product.image_url} alt={product.name} />
                <div className="absolute bottom-0 py-6 w-full h-1/5 bg-white rounded-b-3xl">
                  <div className="flex flex-col justify-center items-center gap-2 h-full">
                    <h1 className="text-sm text-center object-fill md:text-lg font-bold">{product.name}</h1>
                    <h2 className="text-sm font-bold md:text-lg">${product.price}</h2>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      );
    
    }
    
    export default FeaturedProducts;