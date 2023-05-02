import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCards";

function LipMakeup() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the backend based on the category.
    // Replace "/lip-makeup" with the correct API endpoint for the category.
    fetch("/lip")
      .then((r) => r.json())
      .then(setProducts);
  }, []);

  return (
    <div>
      <h1>Lip Makeup</h1>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default LipMakeup;