import React, { Component } from 'react';
import Select from 'react-select';

const options = [
    { value: '12123232', label: 'Komputer' },
    { value: '23233232', label: 'Mouse' },
    { value: '34344343', label: 'Keyboard' },
    { value: '45455454', label: 'CPU' },
    { value: '56566565', label: 'Telepon' },
    { value: '67677676', label: 'Proyektor' },
    { value: '78788787', label: 'Kursi' },
    { value: '89899898', label: 'Kabel Data' },
    { value: '90900909', label: 'Charger Komputer' },
    { value: '10100101', label: 'Printer' },
    { value: '20200202', label: 'CISCO' },
    { value: '30300303', label: 'Speaker' },
    { value: '40400404', label: 'Headphone' },
];

class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRecommendation: null,
            selectedAcknowledged: null,
            description: '',
            serialNumber: '',
            quantity: '',
        };
    }

    handleRecommendationChange = (selectedRecommendation) => {
        this.setState({ selectedRecommendation });
    };

    handleAcknowledgedChange = (selectedAcknowledged) => {
        this.setState({ selectedAcknowledged });
    };

    handleDescriptionChange = (e) => {
        this.setState({ description: e.target.value });
    };

    handleSerialNumberChange = (e) => {
        this.setState({ serialNumber: e.target.value });
    };

    handleQuantityChange = (e) => {
        this.setState({ quantity: e.target.value });
    };

    handleSave = () => {
        const { selectedAcknowledged, description, serialNumber, quantity } = this.state;
        // Lakukan sesuatu dengan nilai-nilai yang disimpan
    };

    render() {
        const { selectedAcknowledged, description, serialNumber, quantity } = this.state;

        return (
            <div>
                <h1 className="title">Gatepass</h1>
                <h2 className="subtitle">Add New Rincian Gatepass</h2>
                <div className="card">
                    <div className="card-content">
                        <div className="content">
                            <form style={{ marginTop: '20px' }}>
                                <div className="field is-horizontal">
                                    <div className="field-body">
                                        <div className="field">
                                            <label className="label">Product</label>
                                            <div className="control">
                                                <Select
                                                    value={selectedAcknowledged}
                                                    onChange={this.handleAcknowledgedChange}
                                                    options={options}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="field is-horizontal">
                                    <div className="field-body">
                                        <div className="field">
                                            <label className="label">Description</label>
                                            <div className="control">
                                                <textarea
                                                    className="textarea"
                                                    placeholder="Alasan"
                                                    value={description}
                                                    onChange={this.handleDescriptionChange}
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
                                            <label className="label">Serial Number</label>
                                            <div className="control">
                                                <input
                                                    type="text"
                                                    className="input"
                                                    placeholder="Serial Number"
                                                    value={serialNumber}
                                                    onChange={this.handleSerialNumberChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="field">
                                            <label className="label">Qty</label>
                                            <div className="control">
                                                <input
                                                    type="text"
                                                    className="input"
                                                    placeholder="Quantity"
                                                    value={quantity}
                                                    onChange={this.handleQuantityChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>

                            {/* Additional Form */}
                            <form>
                                <div className="field is-grouped is-grouped-right">
                                    <div className="control">
                                        <button className="button is-success" onClick={this.handleSave}>
                                            Save
                                        </button>
                                        <button className="button is-light">Close</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Popup;
