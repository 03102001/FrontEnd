import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import { getData } from '../utils/fetch';
import { useParams } from 'react-router-dom';

function FormAddGatepass() {
  const [productsData, setProductsData] = useState([]);
  const [date, setDate] = useState('');
  const [refNo, setRefNo] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [lastRefNo, setLastRefNo] = useState(0);
  const [selectedRecommendation, setSelectedRecommendation] = useState('');
  const [selectedAcknowledged, setSelectedAcknowledged] = useState('');
  const [addedDetails, setAddedDetails] = useState([]);
  const [createdBy, setCreatedBy] = useState('Rafa');
  const API_URL = 'http://192.168.198.5:8008';
  const { GatepassID } = useParams();



  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10);
    setDate(formattedDate);
    fetchGatepassData();
    fetchProductData();
    fetchCurrentUser();
  }, []);

  const fetchGatepassData = async () => {
    try {
      const response = await getData(`/gatepass/getData/${GatepassID}`);
      setRefNo(response.data.refNo);
      setDate(response.data.date);
    } catch (error) {
      console.error('Error fetching initial data:', error);
    }
  };

  const fetchProductData = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/product/getAll`);
      const products = res.data;
      setProductsData(products);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/HrEmployee/getAll`);
      const currentUserData = res.data.find(user => user.username === 'your_username_here'); // Replace with actual username
      if (currentUserData) {
        setCreatedBy(currentUserData.username);
      }
    } catch (error) {
      console.error('Error fetching current user data:', error);
    }
  };

  const addData = async () => {
    if (!selectedProduct) {
      console.error('Produk yang dipilih bernilai null.');
      return;
    }

    const newData = {
      // product: .value,
      // description,
      // serialNumber: selectedProduct.value,
      // quantity,
    };

    try {
      await axios.post('/api/gatepass/create', newData);
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveModal = () => {
    addDetail();
    addData();
    handleCloseModal();
  };

  const handleOpenModal = () => {
    const nextRefNo = `GPS_00${lastRefNo + 1}`;
    setShowModal(true);
    setSelectedProduct(null);
    setDescription('');
    setQuantity('');
    setLastRefNo(lastRefNo + 1);
    setRefNo(nextRefNo);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleDeleteDetail = (serialNumber) => {
    const updatedDetails = addedDetails.filter(
      (detail) => detail.serialNumber !== serialNumber
    );
    setAddedDetails(updatedDetails);
  };

  const addDetail = () => {
    if (selectedProduct && description && quantity) {
      const existingDetailIndex = addedDetails.findIndex(
        (detail) => detail.serialNumber === selectedProduct.value
      );

      if (existingDetailIndex !== -1) {
        const updatedDetails = [...addedDetails];
        updatedDetails[existingDetailIndex].quantity += parseInt(quantity);
        setAddedDetails(updatedDetails);
      } else {
        const newDetail = {
          serialNumber: selectedProduct.value,
          description,
          quantity: parseInt(quantity),
        };
        setAddedDetails([...addedDetails, newDetail]);
      }

      setDescription('');
      setQuantity('');
    }
  };

  const handleSave = async () => {
    const gatepassData = {
      refNo,
      date,
      addedDetails,
      created_by: createdBy,
      recommended_by: selectedRecommendation,
      acknowledged_by: selectedAcknowledged,
    };

    try {
      await axios.post('/api/gatepass/update', gatepassData);
      setRefNo('');
      setDate('');
      setAddedDetails([]);
    } catch (error) {
      console.error('Error saving gatepass data:', error);
    }
  };

  return (
    <div>
      <h1 className="title">Gatepass</h1>
      <h2 className="subtitle">Add New Gatepass</h2>
      <div className="card">
        <div className="card-content">
          <div className="content">
            <form>
              <div className="field is-horizontal">
                <div className="field-body">
                  <div className="field">
                    <label className="label">Ref_No</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        placeholder="Ref_No"
                        value={refNo}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Tanggal</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        placeholder="Tanggal"
                        value={date}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body">
                  <div className="field">
                    <label className="label">Tujuan Lokasi</label>
                    <div className="control">
                      <input type="text" className="input" placeholder="Tujuan Lokasi" />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Deskripsi</label>
                    <div className="control">
                      <textarea
                        className="textarea"
                        placeholder="Deskripsi"
                        rows={3}
                        maxLength={150}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body">
                  <div className="field">
                    <label className="label">Dibawa Oleh</label>
                    <div className="control">
                      <input type="text" className="input" placeholder="Dibawa Oleh" />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">SIM/KTP/NIK</label>
                    <div className="control">
                      <input type="text" className="input" placeholder="SIM/KTP/NIK" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body">
                  <div className="field">
                    <label className="label">Kendaraan</label>
                    <div className="control">
                      <input type="text" className="input" placeholder="Kendaraan" />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Plat No</label>
                    <div className="control">
                      <input type="text" className="input" placeholder="Plat No" />
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <div className="field is-grouped is-grouped-right">
              <div className="control">
                <button className="button is-success" onClick={handleOpenModal}>
                  Add Details
                </button>
              </div>
            </div>
            <table className="table is-striped is-centered has-text-centered">
              <thead className="has-background-primary">
                <tr>
                  <th style={{ verticalAlign: 'middle', textAlign: 'center' }}>No</th>
                  <th style={{ verticalAlign: 'middle', textAlign: 'center' }}>Product ID</th>
                  <th style={{ verticalAlign: 'middle', textAlign: 'center' }}>Description</th>
                  <th style={{ verticalAlign: 'middle', textAlign: 'center' }}>Quantity</th>
                  <th style={{ verticalAlign: 'middle', textAlign: 'center' }}>Actions</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {addedDetails.map((detail, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{detail.serialNumber}</td>
                    <td>{detail.description}</td>
                    <td>{detail.quantity}</td>
                    <td>
                      <div className="columns is-gapless">
                        <div className="column">
                          <button
                            style={{ borderRadius: "0px" }}
                            className="button is-small is-danger"
                            onClick={() => handleDeleteDetail(detail.serialNumber)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <form>
              <div className="field is-horizontal">
                <div className="field-body">
                  <div className="field">
                    <label className="label">Dibuat Oleh</label>
                    <div className="control">
                      <input type="text" className="input" placeholder="Dibuat Oleh" value={createdBy} readOnly />
                    </div>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body">
                  <div className="field">
                    <label className="label">Atas Rekomendasi Dari</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        placeholder="Atas Rekomendasi Dari"
                        value={selectedRecommendation}
                        onChange={(e) => setSelectedRecommendation(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Diketahui Oleh</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        placeholder="Diketahui Oleh"
                        value={selectedAcknowledged}
                        onChange={(e) => setSelectedAcknowledged(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="field is-grouped is-grouped-right">
                <div className="control">
                  <button className="button is-success" onClick={handleSave}>
                    Simpan
                  </button>
                  <button className="button is-light">Tutup</button>
                </div>
              </div>
            </form>
            <Modal
              show={showModal}
              onHide={handleCloseModal}
              style={{
                backgroundColor: '#FFF',
                maxWidth: '700px',
                margin: 'auto',
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                height: '500px',
              }}
            >
              <Modal.Body>
                <form>
                  <div className="field">
                    <label className="label">Product</label>
                    <div className="control">
                      <Select
                        options={productsData.map((product, index) => ({
                          value: product.ProductID,
                          label: `${product.ProductName} - ${product.ProductDesc}`,
                        }))}
                        value={selectedProduct}
                        onChange={(selected) => setSelectedProduct(selected)}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                      <textarea
                        className="textarea"
                        placeholder="Description"
                        value={description}
                        onChange={handleDescriptionChange}
                        rows={3}
                        maxLength={150}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Serial Number</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        placeholder="Serial Number"
                        value={selectedProduct ? selectedProduct.value : ''}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Quantity</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        placeholder="Quantity"
                        value={quantity}
                        onChange={handleQuantityChange}
                      />
                    </div>
                  </div>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <button className="button is-success is-active" onClick={handleSaveModal}>
                  Save
                </button>
                <button className="button is-active" onClick={handleCloseModal}>
                  Close
                </button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormAddGatepass;
