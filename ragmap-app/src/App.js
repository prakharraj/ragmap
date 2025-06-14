// src/App.jsx
import React, { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import Customer from "./components/Customer";
import { fetchCustomer } from "../src/api/shopify";
import { useDebounce } from "./utils/useDebounce"; // adjust path as needed

const App = () => {
  const [email, setEmail] = useState("");
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debounce the email input by 500ms
  const debouncedEmail = useDebounce(email, 500);

  useEffect(() => {
    // When debouncedEmail changes, trigger fetchCustomer
    const getCustomerData = async () => {
      // if empty or invalid email, clear
      if (!debouncedEmail) {
        setCustomer(null);
        setError(null);
        setLoading(false);
        return;
      }
      // Basic email pattern check (optional)
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(debouncedEmail)) {
        setCustomer(null);
        setError("Invalid email format");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const data = await fetchCustomer(debouncedEmail);
        setCustomer(data);
      } catch (err) {
        console.error("fetchCustomer error:", err);
        setCustomer(null);
        setError("Customer not found or request failed");
      } finally {
        setLoading(false);
      }
    };

    getCustomerData();
  }, [debouncedEmail]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // We do NOT call fetchCustomer here directly; effect handles after debounce.
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "1rem" }}>
      <h1>Shopify Integration Home</h1>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="email-input" style={{ display: "block", marginBottom: 4 }}>
          Enter your email:
        </label>
        <input
          id="email-input"
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="user@example.com"
          style={{
            width: "100%",
            padding: "8px",
            fontSize: "1rem",
            boxSizing: "border-box",
          }}
        />
      </div>

      {loading && <p>Loading customer...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <Customer data={customer} />

      <ProductList />
    </div>
  );
};

export default App;
