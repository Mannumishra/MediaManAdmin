import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditCinema = () => {
    const { _id } = useParams(); // Get the cinema ID from the URL parameters
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [cities, setCities] = useState([]);
    const [categories, setCategories] = useState([]);
    const [states, setStates] = useState([]);
    const [cinemas, setCinemas] = useState([]);
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

    // Fetch existing cinema details
    const getCinemaDetails = async () => {
        try {
            const res = await axios.get(`https://mediamanserver.onrender.com/api/cinemaimport/${_id}`);
            console.log(res)
            if (res.status === 200) {
                setFormData(res.data.data);
                getApiData(res.data.data.state); 
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getCategoryData = async () => {
        try {
            const res = await axios.get("https://mediamanserver.onrender.com/api/category");
            if (res.status === 200) {
                setCategories(res.data.data.reverse());
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getStateData = async () => {
        try {
            const res = await axios.get("https://mediamanserver.onrender.com/api/state");
            if (res.status === 200) {
                setStates(res.data.data.reverse());
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getApiData = async (selectedState = formData.state) => {
        try {
            const res = await axios.get("https://mediamanserver.onrender.com/api/city");
            if (res.status === 200) {
                const filteredCities = selectedState ? res.data.data.filter(city => city.state === selectedState) : [];
                setCities(filteredCities.reverse());
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getCinemaData = async () => {
        try {
            const res = await axios.get("https://mediamanserver.onrender.com/api/create-cinema");
            if (res.status === 200) {
                setCinemas(res.data.data.reverse());
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name === 'state') {
            getApiData(value);
        }
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key !== 'image' || (key === 'image' && formData.image)) {
                formDataToSend.append(key, formData[key]);
            }
        });

        try {
            const res = await axios.put(`https://mediamanserver.onrender.com/api/updatecinema/${_id}`, formDataToSend);
            if (res.status === 200) {
                toast.success('Cinema updated successfully');
                navigate("/all-products");
            }
        } catch (error) {
            console.log(error)
            toast.error('Failed to update cinema');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getCategoryData();
        getStateData();
        getCinemaData();
        getCinemaDetails(); 
    }, []);

    useEffect(() => {
        getApiData();
    }, [formData.state]);

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Cinema</h4>
                </div>
                <div className="links">
                    <Link to="/all-cinemas" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
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
                            {cinemas.map((chain) => (
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
                            onChange={handleChange}
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

export default EditCinema;
