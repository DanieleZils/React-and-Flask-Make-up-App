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
        setRandomFeaturedProducts(getRandomElements(featuredProducts, 6));
      }, [featuredProducts]);
    
      return (
        // map the random featured products to the page
        <div className="flex gap-2 py-20">
          {randomFeaturedProducts.map((product) => (
            <div key={product.id} className="w-64 h-64 relative border border-gray-300 rounded-3xl">
              <Link to={`/products/${product.id}`}>
                <img className="w-full h-auto object-cover absolute rounded-3xl" src={product.image_url} alt={product.name} />
                <div className="absolute bottom-0 w-full h-1/4 bg-white rounded-b-3xl border-t-2 border-gray-300">
                  <div className="flex flex-col justify-center items-center gap-2 h-full">
                    <h1 className="text-l font-bold">{product.name}</h1>
                    <h2 className="text-l font-bold">${product.price}</h2>
                    </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      );
    }
    
    export default FeaturedProducts;