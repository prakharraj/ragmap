// src/shopify.js
import axios from "axios";


export const fetchProducts = async () => {
  try {
    console.log("Fetching products from Shopify store:");
    const response = await axios.get(`http://localhost:8080/api/products`, {
    });
    console.log("API response:", response);
    console.log("Products:", response.data.products);
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
