import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddmanualHoading = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [formData, setFormData] = useState({
        state: '',
        city: '',
        location: '',
        media: '',
        width: '',
        height: '',
        sft: '',
        unitType: '',
        rpm: '',
        flexInstallation: '',
        total: '',
    });

    useEffect(() => {
        // Fetch states and cities data
        const fetchStatesAndCities = async () => {
            try {
                const [statesResponse, citiesResponse] = await Promise.all([
                    axios.get('https://mediamanserver.onrender.com/api/state'),
                    axios.get('https://mediamanserver.onrender.com/api/city'),
                ]);

                if (statesResponse.data.success) {
                    setStates(statesResponse.data.data);
                }

                if (citiesResponse.data.success) {
                    setCities(citiesResponse.data.data);
                }
            } catch (error) {
                toast.error('An error occurred while fetching states or cities.');
                console.error(error);
            }
        };

        fetchStatesAndCities();
    }, []);

    useEffect(() => {
        if (formData.state) {
            const filtered = cities.filter(city => city.state === formData.state);
            setFilteredCities(filtered);
            setFormData({ ...formData, city: '' });
        } else {
            setFilteredCities([]);
        }
    }, [formData.state, cities]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post('https://mediamanserver.onrender.com/api/manualhoading', formData);
            if (response.status === 200) {
                toast.success(response.data.message);
                navigate('/all-banners');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('An error occurred while adding the hoading.');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Hoading</h4>
                </div>
                <div className="links">
                    <Link to="/all-banners" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-3">
                        <label htmlFor="state" className="form-label">State</label>
                        <select
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className="form-control"
                            id="state"
                        >
                            <option value="" selected disabled>Select State</option>
                            {states.map(state => (
                                <option key={state._id} value={state.state}>
                                    {state.state}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="city" className="form-label">City</label>
                        <select
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="form-control"
                            id="city"
                            disabled={!formData.state}
                        >
                            <option value="" selected disabled>Select City</option>
                            {filteredCities.map(city => (
                                <option key={city._id} value={city.city}>
                                    {city.city}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="location" className="form-label">Location</label>
                        <input type="text" name="location" value={formData.location} onChange={handleChange} className="form-control" id="location" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="media" className="form-label">Media</label>
                        <input type="text" name="media" value={formData.media} onChange={handleChange} className="form-control" id="media" />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="width" className="form-label">Width</label>
                        <input type="number" name="width" value={formData.width} onChange={handleChange} className="form-control" id="width" />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="height" className="form-label">Height</label>
                        <input type="number" name="height" value={formData.height} onChange={handleChange} className="form-control" id="height" />
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="sft" className="form-label">Square Feet (SFT)</label>
                        <input type="number" name="sft" value={formData.sft} onChange={handleChange} className="form-control" id="sft" />
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="unitType" className="form-label">Unit Type</label>
                        <input type="text" name="unitType" value={formData.unitType} onChange={handleChange} className="form-control" id="unitType" />
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="rpm" className="form-label">RPM</label>
                        <input type="number" name="rpm" value={formData.rpm} onChange={handleChange} className="form-control" id="rpm" />
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="flexInstallation" className="form-label">Flex Installation</label>
                        <input type="text" name="flexInstallation" value={formData.flexInstallation} onChange={handleChange} className="form-control" id="flexInstallation" />
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="total" className="form-label">Total</label>
                        <input type="number" name="total" value={formData.total} onChange={handleChange} className="form-control" id="total" />
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="image" className="form-label">Image</label>
                        <input type="file" name="image" onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} className="form-control" id="image" />
                    </div>

                    <div className="col-12 text-center">
                        <button type="submit" className={`btn btn-primary ${isLoading ? 'not-allowed' : ''}`} disabled={isLoading}>
                            {isLoading ? 'Please Wait...' : 'Add Hoading'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddmanualHoading;
