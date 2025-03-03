import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import "../styles/Sales.css";

const Sales = () => {
  const [sales, setSales] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch('http://localhost:8085/sales');
        if (!response.ok) {
          throw new Error('Failed to fetch sales');
        }
        const data = await response.json();
        setSales(data);
      } catch (error) {
        console.error('Error fetching sales:', error);
      }
    };

    fetchSales();
  }, []);

  // const handleBackToHome = () => {
  //   navigate('/home'); 
  // };

  if (!sales || sales.length === 0) {
    return (
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom textAlign="center">
          No Sales Records Found
        </Typography>
        {/* <Button variant="contained" color="primary" onClick={handleBackToHome}>
          Back to Home
        </Button> */}
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom textAlign="center">
        Sales Records
      </Typography>
      <TableContainer component={Paper} className="TableContainer">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Sale Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>{sale.id}</TableCell>
                <TableCell>{sale.product.name}</TableCell>
                <TableCell>{sale.quantity}</TableCell>
                <TableCell>${sale.totalPrice.toFixed(2)}</TableCell>
                <TableCell>{new Date(sale.saleDate).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <Button
        variant="outlined"
        color="secondary"
        onClick={handleBackToHome}
        style={{ marginTop: '20px' }}
      >
        Back to Home
      </Button> */}
    </Container>
  );
};

export default Sales;
