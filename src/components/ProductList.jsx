import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoAddCircleSharp } from 'react-icons/io5';
import { getData, deleteData } from '../utils/fetch';

const ProductList = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredProducts = data.filter((product) =>
    product.ProductName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = Math.ceil(filteredProducts.length / itemsPerPage);
  const pages = Array.from({ length: pageNumbers }, (_, i) => i + 1);

  const navigate = useNavigate();
  const location = useLocation();

  const handleAddData = () => {
    navigate('/product/add');
  };

  const handleEdit = (product) => {
    navigate({
      pathname: `/product/update/${product.ProductID}`,
      state: { ProductData: product },
    });
  };

  const handleDeleteConfirmation = (id) => {
    setDeleteProductId(id);
    const productToDelete = data.find((product) => product.ProductID === id);
    if (window.confirm(`Apakah Anda yakin ingin menghapus data '${productToDelete.ProductName}'?`)) {
      handleDelete(id);
    }
  };

  const getProduct = async () => {
    try {
      const res = await getData('/api/product/getAll');
      const sortedData = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setData(sortedData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteData(`/api/product/delete/${id}`);
      const updatedData = data.filter((product) => product.ProductID !== id);
      setData(updatedData);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    } catch (error) {
      console.log(error);
      alert(`Terjadi kesalahan saat menghapus data dengan ID ${id}.`);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div style={{ maxWidth: '95%' }}>
      <h1 className="title">Product</h1>
      <h2 className="subtitle">List Of Product</h2>
      {showAlert && (
        <div className="notification is-success">
          Data berhasil dihapus.
        </div>
      )}
      <div className="columns" style={{ marginBottom: '10px' }}>
        <div className="column is-3">
          <input
            type="text"
            placeholder="Search by Product Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input"
          />
        </div>
        <div className="column is-3">
          <button className="button is-primary" onClick={handleAddData}>
            <IoAddCircleSharp className="mr-2" />
            Add Data
          </button>
        </div>
      </div>
      <div className="columns">
        <div className="column is-full">
          <div className="table-container">
            <table className="table is-striped is-centered has-text-centered">
              <thead className="has-background-primary">
                <tr>
                  <th style={{ verticalAlign: 'middle', textAlign: 'center' }}>No</th>
                  <th style={{ verticalAlign: 'middle', textAlign: 'center' }}>Product_Id</th>
                  <th style={{ verticalAlign: 'middle', textAlign: 'center' }}>Product</th>
                  <th style={{ verticalAlign: 'middle', textAlign: 'center' }}>Description</th>
                  <th style={{ verticalAlign: 'middle', textAlign: 'center' }}>Created By</th>
                  <th style={{ verticalAlign: 'middle', textAlign: 'center' }}>Created At</th>
                  <th style={{ verticalAlign: 'middle', textAlign: 'center' }}>Updated By</th>
                  <th style={{ verticalAlign: 'middle', textAlign: 'center' }}>Updated At</th>
                  <th style={{ verticalAlign: 'middle', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts
                    .slice(indexOfFirstItem, indexOfLastItem) 
                    .map((product, index) => (
                      <tr key={index}>
                        <td>{index + 1 + indexOfFirstItem}</td>
                        <td>{product.ProductID}</td>
                        <td>{product.ProductName}</td>
                        <td>{product.ProductDesc}</td>
                        <td>{product.CreatedBy}</td>
                        <td>{product.createdAt}</td>
                        <td>{product.UpdatedBy}</td>
                        <td>{product.updatedAt}</td>
                        <td>
                          <div className="columns is-gapless">
                            <div className="column">
                              <button
                                style={{ borderRadius: "0px" }}
                                className="button is-small is-primary"
                                onClick={() => handleEdit(product)}
                              >
                                <FaEdit />
                              </button>
                            </div>
                            <div className="column">
                              <button
                                style={{ borderRadius: "0px" }}
                                className="button is-small is-danger"
                                onClick={() => handleDeleteConfirmation(product.ProductID)}
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="9">No data available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div
            className="pagination is-centered"
            role="navigation"
            aria-label="pagination"
            style={{ display: "flex", justifyContent: "center", gap: "5px" }}
          >
            {pages.map((page) => (
              <button
                key={page}
                className={`button ${currentPage === page ? 'is-primary' : ''}`}
                onClick={() => paginate(page)}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
      <footer style={{ textAlign: 'center', marginTop: '20px' }}>
        <p>
          &copy; {new Date().getFullYear()} APRIL Learning Institute. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default ProductList;
