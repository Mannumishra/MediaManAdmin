import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCinema = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        file: null,
    });

    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.file) {
            toast.error('Please upload an Excel file.');
            return;
        }

        setIsLoading(true);
        const formDataObj = new FormData();
        formDataObj.append('file', formData.file);

        try {
            const response = await axios.post('https://mediamanserver.onrender.com/api/cinemaimport', formDataObj, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status===200) {
                toast.success(response.data.message);
                navigate('/all-products');
            } else {
                toast.error(response.data.message);
                if (response.data.failedRecords) {
                    console.log('Failed records:', response.data.failedRecords);
                }
            }
        } catch (error) {
            toast.error('An error occurred while uploading the file.');
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
                    <h4>Add Cinema</h4>
                </div>
                <div className="links">
                    <Link to="/all-products" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="file" className="form-label">Upload Cinema Excel File<sup className='text-danger'>*</sup></label>
                        <input type="file" name="file" onChange={handleFileChange} className="form-control" id="file" required />
                    </div>

                    <div className="col-12 text-center">
                        <button type="submit" className={`btn btn-primary ${isLoading ? 'not-allowed' : ''}`} disabled={isLoading}>
                            {isLoading ? 'Please Wait...' : 'Upload and Add Cinemas'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddCinema;
