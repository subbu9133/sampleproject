import React, { useEffect, useState } from "react";
import { Container, Grid, Paper, Typography, Button, Card, CardContent } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const [totalSalesToday, setTotalSalesToday] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [recentSales, setRecentSales] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
   
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/signin"); 
    }

    const fetchTotalSalesToday = async () => {
      try {
        const response = await axios.get("http://localhost:8085/sales/total-sales-today");
        setTotalSalesToday(response.data || 0);
      } catch (error) {
        console.error("Error fetching total sales today:", error);
        setTotalSalesToday(0);
      }
    };

    const fetchTotalProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8085/products/total-products");
        setTotalProducts(response.data || 0);
      } catch (error) {
        console.error("Error fetching total products:", error);
        setTotalProducts(0);
      }
    };

    const fetchLowStockProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8085/products/low-stock");
        setLowStockProducts(response.data || []);
      } catch (error) {
        console.error("Error fetching low stock products:", error);
        setLowStockProducts([]);
      }
    };

    const fetchRecentSales = async () => {
      try {
        const response = await axios.get("http://localhost:8085/sales/recent-sales");
        setRecentSales(response.data || []);
      } catch (error) {
        console.error("Error fetching recent sales:", error);
        setRecentSales([]);
      }
    };

    fetchTotalSalesToday();
    fetchTotalProducts();
    fetchLowStockProducts();
    fetchRecentSales();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken"); 
    navigate("/signin"); 
  };

  return (
    <Container maxWidth="lg" className="home-container">
      <header className="header">
        <h1>POS Dashboard</h1>
        <div className="profile">
          <span>👤 Admin</span>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      <Grid container spacing={3} className="stats-section">
        <Grid item xs={12} sm={6} md={3}>
          <Card className="stat-card">
            <CardContent>
              <Typography variant="h6">Total Sales Today</Typography>
              <Typography variant="h4">${totalSalesToday > 0 ? totalSalesToday.toFixed(2) : "0.00"}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="stat-card">
            <CardContent>
              <Typography variant="h6">Total Products</Typography>
              <Typography variant="h4">{totalProducts}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="stat-card">
            <CardContent>
              <Typography variant="h6">Low Stock Alerts</Typography>
              <Typography variant="h4">{lowStockProducts.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {lowStockProducts.length > 0 && (
        <Paper className="low-stock-alerts">
          <Typography variant="h5">Low Stock Alerts</Typography>
          <table className="low-stock-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {lowStockProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Paper>
      )}

      <Paper className="recent-sales">
        <Typography variant="h5">Recent Sales</Typography>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentSales.map((sale) => (
              <tr key={sale.id}>
                <td>{sale.product.name}</td>
                <td>{new Date(sale.saleDate).toLocaleString()}</td>
                <td>${sale.totalPrice}</td>
                <td>✅ Completed</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Paper>
    </Container>
  );
};

export default Home;
