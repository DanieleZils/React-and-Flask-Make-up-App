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
    <div className="glassy-bg py-10 min-h-screen">
      <div className="max-w-screen-xl mx-auto py-10 grid grid-cols-4 gap-10">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </div>
  );
}

export default LipMakeup;