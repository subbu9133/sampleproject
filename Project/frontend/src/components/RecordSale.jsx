import React, { useState } from 'react';
import { TextField, Button, Container, Typography, MenuItem, Select, InputLabel, FormControl, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import "../styles/RecordSale.css";

const RecordSale = ({ products }) => {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!productId || !quantity || quantity <= 0) {
      setMessage('Please enter valid product and quantity.');
      setMessageType('error');
      return;
    }

    const selectedProduct = products.find(product => product.id === productId);
    
    if (selectedProduct && selectedProduct.stock < quantity) {
      setMessage(`Insufficient stock. Only ${selectedProduct.stock} items available.`);
      setMessageType('error');
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:8085/sales/record?productId=${productId}&quantity=${quantity}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to record sale');
      }
  
      setMessage('Sale recorded successfully!');
      setMessageType('success');
      setTimeout(() => navigate('/sales'), 2000); 
    } catch (error) {
      console.error('Error recording sale:', error);
      setMessage('Error recording sale. Please try again.');
      setMessageType('error');
    }
  };

  // const handleBackToHome = () => {
  //   navigate('/home'); 
  // };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        Record New Sale
      </Typography>
      
      
      {message && (
        <Alert severity={messageType} style={{ marginBottom: '20px' }}>
          {message}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Product</InputLabel>
          <Select value={productId} onChange={(e) => setProductId(e.target.value)} required>
            <MenuItem value="">
              <em>-- Select a product --</em>
            </MenuItem>
            {products.map((product) => (
              <MenuItem key={product.id} value={product.id}>
                {product.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Record Sale
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

export default RecordSale;
