import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postData } from '../utils/fetch';

const FormAddProduct = () => {
  const [ProductName, setProductName] = useState('');
  const [ProductDesc, setProductDesc] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        ProductName: ProductName,
        ProductDesc: ProductDesc,
      };
      const response = await postData('/api/product/create', productData);
      console.log('Product created successfully:', response.data);
    } catch (error) {
      console.error('Error creating product:', error);
    } finally {
      navigate('/product');
    }
  };

  return (
    <div>
      <h1 className="title">Product</h1>
      <h2 className="subtitle">Tambahkan Produk Baru</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label className="label">Nama Barang</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    placeholder="Barang"
                    name="ProductName"
                    value={ProductName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Deskripsi Barang</label>
                <div className="control">
                  <textarea
                    className="textarea"
                    placeholder="Deskripsi Barang"
                    rows={3}
                    maxLength={150}
                    name="ProductDesc"
                    value={ProductDesc}
                    onChange={(e) => setProductDesc(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="field is-grouped is-grouped-right">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Save
                  </button>
                  <button type="button" className="button is-light">
                    Close
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <footer style={{ textAlign: 'center', marginTop: '20px' }}>
        <p>&copy; {new Date().getFullYear()} APRIL Learning Institute. Seluruh hak cipta dilindungi.</p>
      </footer>
    </div>
  );
};

export default FormAddProduct;
