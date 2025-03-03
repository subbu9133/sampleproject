import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ProductList from "./components/Product";
import Sales from "./components/Sales";
import RecordSale from "./components/RecordSale";
import AddProduct from "./components/addProduct";
import UpdateStock from "./components/ProductUpdate";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import { getToken } from "./utils/tokenUtils";

const fetchProducts = async () => {
  try {
    const token = getToken();
    const response = await fetch("http://localhost:8085/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };
    loadProducts();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<PrivateRoute />}>
          <Route path="/products" element={<ProductList products={products} />} />
          <Route path="/products/add" element={<AddProduct setProducts={setProducts} />} />
          <Route path="/products/update" element={<UpdateStock products={products} />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/sales/record" element={<RecordSale products={products} />} />
          <Route path="/Home" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
