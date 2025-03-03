import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../styles/addProduct.css';

const AddProduct = ({ setProducts }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [message, setMessage] = useState('');  
  const [messageType, setMessageType] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = { name, price, stock };

    try {
      const response = await fetch('http://localhost:8085/products/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.status === 409) {
       
        setMessage('Product already exists!');
        setMessageType('error');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

     
      const updatedProducts = await fetch('http://localhost:8085/products').then((res) => res.json());
      setProducts(updatedProducts);

      
      setMessage('Product added successfully!');
      setMessageType('success');
      setTimeout(() => navigate('/products'), 2000); 
    } catch (error) {
      setMessage('Error adding product. Please try again.');
      setMessageType('error');
      console.error('Error adding product:', error);
    }
  };

  // const handleBackToHome = () => {
  //   navigate('/home'); 
  // };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        Add New Product
      </Typography>

    
      {message && (
        <Alert severity={messageType} style={{ marginBottom: '20px' }}>
          {message}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Price ($)"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Stock"
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Add Product
        </Button>
      </form>
      {/* <Button
        variant="outlined"
        color="secondary"
        onClick={handleBackToHome}
        style={{ marginTop: '20px' }}
        fullWidth
      >
        Back to Home
      </Button> */}
    </Container>
  );
};

export default AddProduct;
