import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPrint, FaInfo } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { IoAddCircleSharp } from "react-icons/io5";
import Modal from "react-bootstrap/Modal";
import { getData, postData } from "../utils/fetch";
import axios from "axios";

const GatepassList = () => {
  const [gatepass, setGatepass] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const API_URL = 'http://192.168.198.5:8008';
  const [refNo, setRefNo] = useState('');
  const [date, setDate] = useState('');

  const fetchInitialData = async () => {
    try {
      const response = await getData('/api/gatepass/getAll');
      setRefNo(response.data.refNo);
      setDate(response.data.date);
    } catch (error) {
      console.error('Error fetching initial data:', error);
    }
  };

  const fetchGatepassData = async () => {
    try {
      const response = await getData('/api/gatepass/getAll');
      setGatepass(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching gatepass data:', error);
    }
  };



  useEffect(() => {
    fetchGatepassData();
    fetchInitialData();
  }, []);

  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate('/Gatepass/add');
  };

  const handleEditProduct = (id) => {
    navigate(`/Gatepass/edit/${id}`);
  };

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState([]);

  const fetchModalData = async (refNo) => {
    try {
      const response = await getData(`/api/gatepass/getData/${refNo}`);
      setModalData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching modal data:', error);
      setModalData([]);
    }
  };

  const handleOpenModal = async (data) => {
    setSelectedData(data);
    setShowModal(true);
    await fetchModalData(data.GatepassID);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedData(null);
  };

  const [selectedData, setSelectedData] = useState(null);

  const fetchDataByRefNo = async (refNo) => {
    try {
      const response = await getData(`/api/gatepass/getByRefNo/${refNo}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching gatepass data by Ref No:', error);
      return null;
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      // Implement your API call to delete the data by ID
      console.log(`Deleting data with ID: ${id}`);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handlePrint = (dept, refNo) => {
    // Placeholder logic for printing
    console.log('Printing selected data');
    alert(`Print Report ${dept} with ref no. ${refNo}`);

    switch (dept) {
      case "IT":
        window.location.href = `/it-it/${dept}/${refNo}`;
        break;
      // case "DIGITAL":
      //   window.location.href = `/it-di/${dept}/${refNo}`;
      //   break;
      // case "STORE":
      //   window.location.href = `/it-it/${dept}/${refNo}`;
      //   break;
      // case "MILL":
      //   window.location.href = `/it-it/${dept}/${refNo}`;
      //   break;

      default:
        break;
    }
    // Implement your printing logic using window.print() or other methods
  };

  const handleAddData = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/gatepass/create`);
      console.log('Data added successfully:', response);
      fetchGatepassData();
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  return (
    <div style={{ maxWidth: "95%" }}>
      <h1 className="title">Gatepass</h1>
      <h2 className="subtitle">List Of Gatepass</h2>
      <div className="columns" style={{ marginBottom: '10px' }}>
        <div className="column is-3">
          <input
            type="text"
            placeholder="Search by Ref No"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input"
          />
        </div>
        <div className="column is-3">
          <button type="submit" className="button is-primary" onClick={handleAddData}>
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
                  <th style={{ verticalAlign: 'middle', textAlign: 'center' }}>Ref No</th>
                  <th style={{ verticalAlign: "middle", textAlign: "center" }}>Department</th>
                  <th style={{ verticalAlign: "middle", textAlign: "center" }}>Destination</th>
                  <th style={{ verticalAlign: "middle", textAlign: "center" }}>Driver</th>
                  <th style={{ verticalAlign: "middle", textAlign: "center" }}>SIM/KTP</th>
                  <th style={{ verticalAlign: "middle", textAlign: "center" }}>Vehicle</th>
                  <th style={{ verticalAlign: "middle", textAlign: "center" }}>Vehicle No</th>
                  <th style={{ verticalAlign: "middle", textAlign: "center" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(gatepass) && gatepass.length > 0 ? (
                  gatepass.map((data, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{data.GatepassID}</td>
                      <td>{data.Department}</td>
                      <td>{data.Destination}</td>
                      <td>{data.Driver}</td>
                      <td>{data.SIM_KTP}</td>
                      <td>{data.Vehicle}</td>
                      <td>{data.VehicleNo}</td>
                      <td>
                        <div className="columns is-gapless">
                          <div className="column">
                            <button
                              style={{ borderRadius: "0px" }}
                              className="button is-success is-small is-info"
                              onClick={() => handleOpenModal(data)}
                            >
                              <FaInfo />
                            </button>
                          </div>
                          <div className="column">
                            <button
                              style={{ borderRadius: "0px" }}
                              className="button is-small is-primary"
                              onClick={() => handleEditProduct(data.GatepassID)}
                            >
                              <FaEdit />
                            </button>
                          </div>
                          <div className="column">
                            <button
                              style={{ borderRadius: '0px' }}
                              className="button is-small is-danger"
                              onClick={() => handleDeleteProduct(data.id)}
                            >
                              <FaTrash />
                            </button>
                          </div>
                          <div className="column">
                            <button type="button" style={{ borderRadius: "0px" }} className="button is-small is-info" onClick={() => handlePrint(data.Department, data.GatepassID)}>
                              <FaPrint />
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
        </div>
      </div>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        size="lg"
        style={{
          backgroundColor: '#FFF',
          maxWidth: '700px',
          margin: 'auto',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
          height: '600px'
        }}
      >
        <Modal.Header>
          <h3 className="title is-4">Gatepass Info</h3>
          <button
            style={{ backgroundColor: "grey", color: "white", float: "right" }}
            className="button is-active"
            onClick={handleCloseModal}
          >
            Close
          </button>
        </Modal.Header>

        <Modal.Body>
          {selectedData?.gatepassdetails && selectedData.gatepassdetails.length > 0 ? (
            <>
              <ul>
                {selectedData.gatepassdetails.map((detail, index) => (
                  <li key={index}>
                    <strong>Ref No:</strong> {detail.gatepass_ref} <br />
                    <strong>Department:</strong> {detail.department_name} <br />
                    <strong>Destination:</strong> {detail.destination} <br />
                    <strong>SIM/KTP:</strong> {detail.sim_ktp} <br />
                    <strong>Vehicle:</strong> {detail.vehicle} <br />
                    <strong>Vehicle Description:</strong> {detail.vehicle_desc} <br />
                    <strong>Plat No:</strong> {detail.description} <br />
                    <strong>Created By:</strong> {detail.created_by} <br />
                    <strong>Created At:</strong> {detail.createdAt} <br />
                    <strong>Updated By:</strong> {detail.updated_by} <br />
                    <strong>Updated At:</strong> {detail.updatedAt} <br />
                    <strong>Approved By:</strong> {detail.approved_by} <br />
                    <strong>Cancel By:</strong> {detail.cancel_by} <br />
                    <strong>Cancal Date:</strong> {detail.cancel_date} <br />
                    <strong>Cancel Reason:</strong> {detail.cancel_reason} <br />
                    <strong>Status:</strong> {detail.status} <br />
                  </li>
                ))}
              </ul>

              <h3 className="title is-4">Gatepass Details</h3>
              <table className="table is-striped is-centered has-text-centered">
                <thead className="has-background-grey">
                  <tr>
                    <th style={{ verticalAlign: 'middle', textAlign: 'center' }}>No</th>
                    <th style={{ verticalAlign: "middle", textAlign: "center" }}>Product Id</th>
                    <th style={{ verticalAlign: "middle", textAlign: "center" }}>Product Name</th>
                    <th style={{ verticalAlign: "middle", textAlign: "center" }}>Product Desc</th>
                    <th style={{ verticalAlign: "middle", textAlign: "center" }}>Reason/KTP</th>
                    <th style={{ verticalAlign: "middle", textAlign: "center" }}>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(selectedData.gatepassdetails) && selectedData.gatepassdetails.length > 0 ? (
                    selectedData.gatepassdetails.map((data, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{data.product_id}</td>
                        <td>{data.product_name}</td>
                        <td>{data.product_desc}</td>
                        <td>{data.reason}</td>
                        <td>{data.quantity}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">No data available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          ) : (
            <p>No gatepass details available.</p>
          )}
        </Modal.Body>

        <Modal.Footer>
          {/* Additional footer content if needed */}
        </Modal.Footer>
      </Modal>

      <footer style={{ textAlign: 'center', marginTop: '20px' }}>
        <p>
          &copy; {new Date().getFullYear()} APRIL Learning Institute. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default GatepassList;
