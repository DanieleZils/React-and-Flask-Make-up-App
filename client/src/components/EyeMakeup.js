import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCards";

function EyeMakeup() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the backend based on the category.
    // Replace "/eye-makeup" with the correct API endpoint for the category.
    fetch("/eye")
      .then((r) => r.json())
      .then(setProducts);
  }, []);

  return (
    <div className="eyeDiv">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default EyeMakeup;
