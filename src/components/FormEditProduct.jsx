import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { config } from '../config';

const FormEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ProductName, setProductName] = useState('');
  const [ProductDesc, setProductDesc] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    getProductData();
  }, []);

  const getProductData = async () => {
    try {
      const response = await axios.get(`/api/product/${id}`);
      const productData = response.data;
      setProductName(productData.ProductName);
      setProductDesc(productData.ProductDesc);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        ProductName: ProductName,
        ProductDesc: ProductDesc,
      };
      const response = await axios.put(`http://192.168.198.5:8008/api/product/update/${id}`, productData); // Ubah axios.put menjadi axios.post
      setSuccessMessage('Produk berhasil diperbarui!');
      setTimeout(() => {
        setSuccessMessage('');
        navigate('/product');
      }, 2000);
    } catch (error) {
      console.error('Error mengedit produk:', error);
    }
  };

  return (
    <div>
      <h1 className="title">Produk</h1>
      <h2 className="subtitle">Edit Produk</h2>
      {successMessage && <div className="notification is-success">{successMessage}</div>}
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
                    Simpan
                  </button>
                  <button type="button" className="button is-light">
                    Tutup
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

export default FormEditProduct;
