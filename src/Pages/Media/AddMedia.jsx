import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddMedia = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        medianame: "",
        image: null
    });

    const navigate = useNavigate("/all-media")

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
            formData.append("medianame", data.medianame);
            formData.append("image", data.image);

            const res = await axios.post("https://mediamanserver.onrender.com/api/media", formData);
           if(res.status===200){
            setIsLoading(false);
            toast.success("Cinema added successfully!");
            navigate("/all-media")
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
                    <h4>Add Category</h4>
                </div>
                <div className="links">
                    <Link to="/all-media" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={postData}>
                    <div className="col-md-6">
                        <label htmlFor="medianame" className="form-label">Media Name<sup className='text-danger'>*</sup></label>
                        <input
                            type="text"
                            name="medianame"
                            className="form-control"
                            id="medianame"
                            onChange={handleChange}
                            value={data.medianame}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="categoryImage" className="form-label">Media Image<sup className='text-danger'>*</sup></label>
                        <input
                            type="file"
                            name="image"
                            className="form-control"
                            id="categoryImage"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-12 text-center">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`${isLoading ? 'not-allowed' : 'allowed'}`}
                        >
                            {isLoading ? "Please Wait..." : "Add Cinema"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddMedia;
