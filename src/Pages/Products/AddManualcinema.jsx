import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddManualCinema = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        cinemaChain: '',
        region: '',
        state: '',
        city: '',
        category: '',
        cinema: '',
        audi: '',
        seatingCapacity: '',
        baseRate10SecWeek: '',
        baseRateBB10SecWeek: '',
        baseRateMBB10SecWeek: '',
        image: null,
    });

    const [cinemaChains, setCinemaChains] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch cinema chains
        axios.get('https://mediamanserver.onrender.com/api/create-cinema')
            .then(response => setCinemaChains(response.data.data))
            .catch(error => console.error('Error fetching cinema chains:', error));

        // Fetch states
        axios.get('https://mediamanserver.onrender.com/api/state')
            .then(response => setStates(response.data.data))
            .catch(error => console.error('Error fetching states:', error));

        // Fetch categories
        axios.get('https://mediamanserver.onrender.com/api/category')
            .then(response => setCategories(response.data.data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const handleStateChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Fetch cities based on selected state
        axios.get(`https://mediamanserver.onrender.com/api/city?state=${value}`)
            .then(response => setCities(response.data.data))
            .catch(error => console.error('Error fetching cities:', error));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        if (name === 'cinemaChain') {
            const selectedChain = cinemaChains.find(chain => chain._id === value);
            if (selectedChain) {
                setFormData(prevFormData => ({
                    ...prevFormData,
                    image: selectedChain.image,
                }));
            }
        }
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
            const data = new FormData();
            for (const key in formData) {
                if (formData[key] instanceof File) {
                    // Append file directly
                    data.append(key, formData[key]);
                } else {
                    // Append other types of data
                    data.append(key, formData[key]);
                }
            }
    
            const res = await axios.post('https://mediamanserver.onrender.com/api/manual-create', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (res.status === 200) {
                toast.success('Cinema added successfully!');
                navigate("/all-products");
                setFormData({
                    cinemaChain: '',
                    region: '',
                    state: '',
                    city: '',
                    category: '',
                    cinema: '',
                    audi: '',
                    seatingCapacity: '',
                    baseRate10SecWeek: '',
                    baseRateBB10SecWeek: '',
                    baseRateMBB10SecWeek: '',
                    image: null,
                });
            }
        } catch (error) {
            console.error('There was an error adding the cinema!', error);
            toast.error('Failed to add cinema.');
        }
    };
    

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Manual Cinema</h4>
                </div>
                <div className="links">
                    <Link to="/all-products" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="card p-4">
                <form onSubmit={handleSubmit} className='row'>
                    <div className="col-md-3 mb-3">
                        <label className="form-label">Cinema Chain</label>
                        <select
                            className="form-control"
                            name="cinemaChain"
                            value={formData.cinemaChain}
                            onChange={handleChange}
                        >
                            <option value="">Select Cinema Chain</option>
                            {cinemaChains.map((chain) => (
                                <option key={chain._id} value={chain._id}>{chain.categoryName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-3 mb-3">
                        <label className="form-label">Region</label>
                        <input
                            type="text"
                            className="form-control"
                            name="region"
                            value={formData.region}
                            onChange={handleChange}
                            placeholder='Region'
                        />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label className="form-label">State</label>
                        <select
                            className="form-control"
                            name="state"
                            value={formData.state}
                            onChange={handleStateChange}
                        >
                            <option value="">Select State</option>
                            {states.map((state) => (
                                <option key={state._id} value={state.state}>{state.state}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-3 mb-3">
                        <label className="form-label">City</label>
                        <select
                            className="form-control"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            disabled={!formData.state}
                        >
                            <option value="">Select City</option>
                            {cities.map((city) => (
                                <option key={city._id} value={city.city}>{city.city}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-3 mb-3">
                        <label className="form-label">Category</label>
                        <select
                            className="form-control"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-3 mb-3">
                        <label className="form-label">Cinema Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="cinema"
                            value={formData.cinema}
                            onChange={handleChange}
                            placeholder='Cinema Name'
                        />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label className="form-label">Audi</label>
                        <input
                            type="text"
                            className="form-control"
                            name="audi"
                            value={formData.audi}
                            onChange={handleChange}
                            placeholder='Audi'
                        />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label className="form-label">Seating Capacity</label>
                        <input
                            type="number"
                            className="form-control"
                            name="seatingCapacity"
                            value={formData.seatingCapacity}
                            onChange={handleChange}
                            placeholder='Seating Capacity'
                        />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label className="form-label">Base Rate/10 Sec/Week</label>
                        <input
                            type="number"
                            className="form-control"
                            name="baseRate10SecWeek"
                            value={formData.baseRate10SecWeek}
                            onChange={handleChange}
                            placeholder='Base Rate'
                        />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label className="form-label">Base Rate BB/10 Sec/Week</label>
                        <input
                            type="number"
                            className="form-control"
                            name="baseRateBB10SecWeek"
                            value={formData.baseRateBB10SecWeek}
                            onChange={handleChange}
                            placeholder='Base Rate'
                        />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label className="form-label">Base Rate MBB/10 Sec/Week</label>
                        <input
                            type="number"
                            className="form-control"
                            name="baseRateMBB10SecWeek"
                            value={formData.baseRateMBB10SecWeek}
                            onChange={handleChange}
                            placeholder='Base Rate'
                        />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label className="form-label">Upload Image</label>
                        <input
                            type="file"
                            className="form-control"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="col-12 mt-3">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddManualCinema;
