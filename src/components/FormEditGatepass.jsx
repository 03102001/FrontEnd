import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import { getData } from '../utils/fetch';
import { useParams } from 'react-router-dom';
import { BiChevronDown } from 'react-icons/bi';

function FormEditGatepass() {
    const [productsData, setProductsData] = useState([]);
    const [createdAt, setcreatedAt] = useState('');
    // const [refNo, setRefNo] = useState('');
    const [Gatepass, setGatepassID] = useState('');
    const [Department, setDepartment] = useState('');
    const [Destination, setDestination] = useState('');
    const [Driver, setDriver] = useState('');
    const [SIM_KTP, setSIM_KTP] = useState('');
    const [Vehicle, setVehicle] = useState('');
    const [VehicleNo, setVehicleNo] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [ApprovedBy, setApprovedBy] = useState('');
    const [CreatedBy, setCreatedBy] = useState('');
    const [KnownBy, setKnownBy] = useState('');

    const [departments, setDepartments] = useState([]);

    // const [lastRefNo, setLastRefNo] = useState(0);
    const [selectedRecommendation, setSelectedRecommendation] = useState('');
    const [selectedAcknowledged, setSelectedAcknowledged] = useState('');
    const [addedDetails, setAddedDetails] = useState([]);
    // const [createdBy, setCreatedBy] = useState('');
    const API_URL = 'http://192.168.198.5:8008';
    const { GatepassID } = useParams();
    console.log(GatepassID);



    const fetchGatepassData = async () => {
        try {
            const response = await getData(`/api/gatepass/getById/${GatepassID}`);
            console.log(response);
            setcreatedAt(response.data.createdAt);
            setGatepassID(response.data.GatepassID);
            // setDate(response.data.date);
            setDepartment(response.data.Department);
            setDestination(response.data.Destination);
            setDriver(response.data.Driver);
            setSIM_KTP(response.data.SIM_KTP);
            setVehicle(response.data.Vehicle);
            setVehicleNo(response.data.VehicleNo);
            setApprovedBy(response.data.ApprovedBy);
            setCreatedBy(response.data.CreatedBy);
            setKnownBy(response.data.KnownBy);

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

    // const fetchCurrentUser = async () => {
    //     try {
    //         const res = await axios.get(`${API_URL}/api/HrEmployee/getAll`);
    //         const currentUserData = res.data.find(user => user.username === 'your_username_here'); // Replace with actual username
    //         if (currentUserData) {
    //             setCreatedBy(currentUserData.username);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching current user data:', error);
    //     }
    // };

    const fetchDepartments = async () => {
        const responseDepartments = await getData('/api/department/getAll');
        // console.log(responseDepartments.data);
        setDepartments(responseDepartments.data);
    };

    const addData = async () => {
        // if (!selectedProduct) {
        //     console.error('Produk yang dipilih bernilai null.');
        //     return;
        // }

        const newData = {
            createdAt: createdAt,
            GatepassID: GatepassID,
            Destination: Destination,
            Department: Department,
            Driver: Driver,
            SIM_KTP: SIM_KTP,
            Vehicle: Vehicle,
            VehicleNo: VehicleNo,
            ApprovedBy: ApprovedBy,
            CreatedBy: CreatedBy,
            KnownBy: KnownBy
        };

        try {
            const result = await axios.put(`${process.env.REACT_APP_DB}/api/gatepass/update/${GatepassID}`, newData);
            console.log(result);
        } catch (error) {
            console.error('Error adding data:', error);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleOpenModal = () => {
        // const nextRefNo = `GPS_00${lastRefNo + 1}`;
        setShowModal(true);
        setSelectedProduct(null);
        setDescription('');
        setQuantity('');
        // setLastRefNo(lastRefNo + 1);
        // setRefNo(nextRefNo);
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

    const handleSaveModal = async () => {
        addDetail();
        addData();
        handleCloseModal();

        try {
            const gatepassData = {
                addedDetails,
                // recommended_by: selectedRecommendation,
                // acknowledged_by: selectedAcknowledged,
            };

            const response = await axios.post(`${API_URL}/api/gatepassdetail/create`, gatepassData);
            console.log(response);
        } catch (error) {
            console.error('Error saving gatepass detail data:', error);
        }
    };


    useEffect(() => {
        // const currentDate = new Date();
        // const formattedDate = currentDate.toISOString().slice(0, 10);
        // setDate(formattedDate);
        fetchGatepassData();
        fetchProductData();
        fetchDepartments();
        // fetchCurrentUser();
    }, []);

    return (
        <div>
            <h1 className="title">Gatepass</h1>
            <h2 className="subtitle">Update Gatepass</h2>
            <div className="card">
                <div className="card-content">
                    <div className="content">
                        <form>
                            <div className="field is-horizontal">
                                <div className="field-body">
                                    <div className="field">
                                        <label className="label">Gatepass ID</label>
                                        <div className="control">
                                            <input
                                                name="GatepassID"
                                                value={GatepassID}
                                                onChange={(e) => setGatepassID(e.target.value)}
                                                type="text" className="input" placeholder="GatepassID"
                                                readOnly />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">createdAt</label>
                                        <div className="control">
                                            <input
                                                name="createdAt"
                                                value={createdAt}
                                                onChange={(e) => setcreatedAt(e.target.value)}
                                                type="text" className="input" placeholder="createdAt"
                                                readOnly />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="field is-horizontal">
                                <div className="field-body">
                                    <div className="field">
                                        <label className="label">Destination</label>
                                        <div className="control">
                                            <input
                                                name="Destination"
                                                value={Destination}
                                                onChange={(e) => setDestination(e.target.value)}
                                                type="text" className="input" placeholder="Destination" />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Departemen</label>
                                        <div className="control has-icons-right">
                                            <div className="select is-fullwidth">
                                                <select className="input" required value={Department} onChange={(e) => setDepartment(e.target.value)}>
                                                    {departments.map((dept, index) => <option key={index + 1} value={dept.DepartmentName}>{`${dept.DepartmentID} - ${dept.DepartmentName} - ${dept.DepartmentDesc}`}</option>)}
                                                </select>
                                            </div>
                                            <div className="icon is-small is-right">
                                                <BiChevronDown />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="field is-horizontal">
                                <div className="field-body">
                                    <div className="field">
                                        <label className="label">Driver</label>
                                        <div className="control">
                                            <input
                                                name="Driver"
                                                value={Driver}
                                                onChange={(e) => setDriver(e.target.value)}
                                                type="text" className="input" placeholder="Driver" />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">SIM/KTP</label>
                                        <div className="control">
                                            <input
                                                name="SIM_KTP"
                                                value={SIM_KTP}
                                                onChange={(e) => setSIM_KTP(e.target.value)}
                                                type="text" className="input" placeholder="SIM_KTP" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="field is-horizontal">
                                <div className="field-body">
                                    <div className="field">
                                        <label className="label">Vehicle</label>
                                        <div className="control">
                                            <input
                                                name="Vehicle"
                                                value={Vehicle}
                                                onChange={(e) => setVehicle(e.target.value)}
                                                type="text" className="input" placeholder="Vehicle" />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Plat No</label>
                                        <div className="control">
                                            <input
                                                name="VehicleNo"
                                                value={VehicleNo}
                                                onChange={(e) => setVehicleNo(e.target.value)}
                                                type="text" className="input" placeholder="VehicleNo" />
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
                                    <th style={{ verticalAlign: 'middle', textAlign: 'center' }}>Reason</th>
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
                                        <label className="label">CreatedBy</label>
                                        <div className="control">
                                            <input
                                                name="CreatedBy"
                                                value={CreatedBy}
                                                onChange={(e) => setCreatedBy(e.target.value)}
                                                type="text" className="input" placeholder="CreatedBy"
                                                readOnly />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="field is-horizontal">
                                <div className="field-body">
                                    <div className="field">
                                        <label className="label">Approved By</label>
                                        <div className="control">
                                            <input
                                                name="ApprovedBy"
                                                value={ApprovedBy}
                                                onChange={(e) => setApprovedBy(e.target.value)}
                                                type="text" className="input" placeholder="ApprovedBy" />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Known By</label>
                                        <div className="control">
                                            <input
                                                name="KnownBy"
                                                value={KnownBy}
                                                onChange={(e) => setKnownBy(e.target.value)}
                                                type="text" className="input" placeholder="KnownBy" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="field is-grouped is-grouped-right">
                                <div className="control">
                                    <button className="button is-success" onClick={addData}>
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
                                                placeholder="description"
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

export default FormEditGatepass;
