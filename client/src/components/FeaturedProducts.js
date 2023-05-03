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
        setRandomFeaturedProducts(getRandomElements(featuredProducts, 4));
      }, [featuredProducts]);
    
      return (
        // map the random featured products to the page
        <div className="featProduct">
          {randomFeaturedProducts.map((product) => (
            <div key={product.id} className="featProductImg">
              <Link to={`/products/${product.id}`}>
                <img src={product.image_url} alt={product.name} />
              </Link>
            </div>
          ))}
        </div>
      );
    }
    
    export default FeaturedProducts;