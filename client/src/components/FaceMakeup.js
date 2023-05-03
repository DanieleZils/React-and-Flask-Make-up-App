import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCards";

function FaceMakeup() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the backend based on the category.
    // Replace "/eye-makeup" with the correct API endpoint for the category.
    fetch("/face")
      .then((r) => r.json())
      .then(setProducts);
  }, []);

  return (
    <div className="faceDiv">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default FaceMakeup;
