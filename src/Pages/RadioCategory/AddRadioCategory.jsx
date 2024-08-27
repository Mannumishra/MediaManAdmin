import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddRadioCategory = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        radiocategoryName: "",
        radioimage: null
    });

    const navigate = useNavigate("/all-category")

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: files ? files[0] : value
        }));
    };


    const postData = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append("radiocategoryName", data.radiocategoryName);
            formData.append("radioimage", data.radioimage);

            const res = await axios.post("https://mediamanserver.onrender.com/api/radioCategory", formData);
           if(res.status===200){
            setIsLoading(false);
            toast.success("Cinema added successfully!");
            navigate("/all-radiosname")
           }
        } catch (error) {
            setIsLoading(false);
            toast.error(error.response.data.message);
        }
    };

 
    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Radio Station</h4>
                </div>
                <div className="links">
                    <Link to="/all-radiosname" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={postData}>
                    <div className="col-md-6">
                        <label htmlFor="radiocategoryName" className="form-label">Station Name<sup className='text-danger'>*</sup></label>
                        <input
                            type="text"
                            name="radiocategoryName"
                            className="form-control"
                            id="radiocategoryName"
                            onChange={handleChange}
                            value={data.radiocategoryName}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="categoryradioimage" className="form-label">Station Image<sup className='text-danger'>*</sup></label>
                        <input
                            type="file"
                            name="radioimage"
                            className="form-control"
                            id="categoryradioimage"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-12 text-center">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`${isLoading ? 'not-allowed' : 'allowed'}`}
                        >
                            {isLoading ? "Please Wait..." : "Add Station"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddRadioCategory;
