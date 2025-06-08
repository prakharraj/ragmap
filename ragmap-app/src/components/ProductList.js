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
      {products?.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul>
          {products?.map((product) => (
            <li key={product.id} style={{ border: "1px solid #eee", borderRadius: "8px", margin: "16px 0", padding: "16px", display: "flex", gap: "24px", alignItems: "flex-start" }}>
              <div>
                <img
                  src={product.image?.src}
                  alt={product.title}
                  width="200"
                  style={{ borderRadius: "8px", objectFit: "cover" }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: "0 0 8px 0" }}>{product.title}</h3>
                <div dangerouslySetInnerHTML={{ __html: product.body_html }} style={{ marginBottom: "12px" }} />
                <p style={{ margin: "8px 0", fontWeight: "bold" }}>Price: ₹{product.variants?.[0]?.price}</p>
                <div style={{ margin: "8px 0" }}>
                  <span style={{ fontWeight: "bold" }}>Available Sizes: </span>
                  {product.options?.find(opt => opt.name === "Size")?.values?.join(", ") || "N/A"}
                </div>
                <button style={{ padding: "8px 16px", background: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                  Add to Cart
                </button>
              </div>
            </li>
      ))}
      </ul>
    )}
    </div>
  );
};

export default ProductList;
