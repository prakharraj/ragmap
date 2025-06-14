// src/shopify.js
import axios from "axios";


export const fetchProducts = async () => {
  try {
    console.log("Fetching products from Shopify store:");
    const response = await axios.get(`http://localhost:8080/api/products`, {
    });
    console.log("Products:", response.data.products);
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const fetchCustomer = async (email) => {
  try {
    console.log("Fetching customer details from Shopify store:");
    const response = await axios.get(`http://localhost:8080/api/customers?email=${email}`, {
    });
    console.log("Customer:", response.data.customers);
    return response.data.customers[0] || null; // Return the first customer or null if not found
  } catch (error) {
    console.error("Error fetching customer:", error);
    return [];
  }
};
