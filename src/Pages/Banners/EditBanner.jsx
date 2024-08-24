import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditBanner = () => {
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
        image: null,
    });
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { _id } = useParams(); 

    useEffect(() => {
        // Fetch states and cities data
        const fetchStatesAndCities = async () => {
            try {
                const [statesResponse, citiesResponse] = await Promise.all([
                    axios.get('http://localhost:8000/api/state'),
                    axios.get('http://localhost:8000/api/city'),
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

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/hoading/${_id}`);
                const { state, city, location, media, width, height, sft, unitType, rpm, flexInstallation, total } = response.data.data;
                setFormData({ state, city, location, media, width, height, sft, unitType, rpm, flexInstallation, total, image: null });
            } catch (error) {
                console.error('Error fetching banner details:', error);
                toast.error('Failed to fetch banner details.');
            }
        };

        fetchBanner();
    }, [_id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formDataToSend = new FormData();
        formDataToSend.append('state', formData.state);
        formDataToSend.append('city', formData.city);
        formDataToSend.append('location', formData.location);
        formDataToSend.append('media', formData.media);
        formDataToSend.append('width', formData.width);
        formDataToSend.append('height', formData.height);
        formDataToSend.append('sft', formData.sft);
        formDataToSend.append('unitType', formData.unitType);
        formDataToSend.append('rpm', formData.rpm);
        formDataToSend.append('flexInstallation', formData.flexInstallation);
        formDataToSend.append('total', formData.total);

        // Append the image only if it's updated
        if (formData.image) {
            formDataToSend.append('image', formData.image);
        }

        try {
            const response = await axios.put(`http://localhost:8000/api/hoading/${_id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                toast.success(response.data.message);
                navigate('/all-banners');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error updating the banner:', error);
            toast.error('Server error. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Hoading</h4>
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
                            <option value="" disabled>Select State</option>
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
                            <option value="" disabled>Select City</option>
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
                    <div className="col-md-12">
                        <label htmlFor="image" className="form-label">Image</label>
                        <input type="file" name="image" onChange={handleFileChange} className="form-control" id="image" />
                    </div>
                    <div className="col-md-12">
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? 'Updating...' : 'Update Banner'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditBanner;
