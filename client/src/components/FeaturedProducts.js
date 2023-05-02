import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";



function FeaturedProducts() {

    const [ featuredProducts, setFeaturedProducts ] = useState([]);



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




    return (
       
            <div className="featProduct">
                {featuredProducts.map((product) => (
                    <div key={product.id} className="featProductImg">
                        <Link to={`/products/${product.id}`}>
                        <img src={product.image_url} alt={product.name} />
                        </Link>
                    </div>
                ))}
            </div>
    
    )
}

export default FeaturedProducts;