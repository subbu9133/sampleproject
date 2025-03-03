import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography, Button } from '@mui/material';
import axios from 'axios';
import '../styles/Product.css'; 
import ProductUpdate from './ProductUpdate'; 

const Product = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Get token from localStorage
        if (!token) {
          console.error('Token is missing');
          return;
        }

        const response = await axios.get('http://localhost:8085/products', {
          headers: {
            'Authorization': `Bearer ${token}`, // Send token in the request header
          },
        });

        console.log('Response:', response.data);  
        setProducts(response.data); 
      } catch (error) {
        console.error("There was an error fetching the products!", error);
      }
    };

    fetchProducts();
  }, []);

  const refreshProductList = () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Token is missing');
      return;
    }

    axios.get('http://localhost:8085/products', {
      headers: {
        'Authorization': `Bearer ${token}`, // Send token in the request header
      },
    })
      .then((response) => {
        setProducts(response.data); 
      })
      .catch((error) => {
        console.error("There was an error refreshing the products!", error);
      });
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom textAlign="center">
        Product List
      </Typography>
      <div className="table-container">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Actions</TableCell> 
              </TableRow>
            </TableHead>
            <TableBody>
              {products && products.length > 0 ? (
                products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setSelectedProductId(product.id)}
                      >
                        Update
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No products available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {selectedProductId && (
        <ProductUpdate
          productId={selectedProductId}
          onProductUpdated={refreshProductList} 
        />
      )}
    </Container>
  );
};

export default Product;
