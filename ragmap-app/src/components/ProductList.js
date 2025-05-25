import React, { useEffect, useState } from "react";
import { fetchProducts } from "../api/shopify"; 

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    };

    loadProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <div>
      <h2>Product List</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <h3>{product.title}</h3>
              <p>{product.body_html}</p>
              {product.image && (
                <img
                  src={product.image.src}
                  alt={product.title}
                  width="200"
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
