import React, { useState, useEffect } from 'react';
import "../styles/ProductUpdate.css";

const ProductUpdate = ({ productId, onProductUpdated }) => {
  const [product, setProduct] = useState({
    id: '',
    name: '',
    price: '',
    stock: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8085/products/${productId}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          setError('Product not found');
        }
      } catch (error) {
        setError('Error fetching product details');
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (product.stock < 0) {
      product.stock = 0;
    }

    try {
      const response = await fetch(`http://localhost:8085/products/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      });

      if (response.ok) {
        setSuccess('Product updated successfully!');
        setError(''); 
        if (onProductUpdated) {
          onProductUpdated();
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to update product');
        setSuccess('');  
      }
    } catch (error) {
      setError('Error updating product');
      setSuccess('');  
    }
  };

  return (
    <div>
      <h1>Update Product</h1>
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            step="0.01"
          />
        </div>
        <div>
          <label htmlFor="stock">Stock:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            required
            min="0"
          />
        </div>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default ProductUpdate;
