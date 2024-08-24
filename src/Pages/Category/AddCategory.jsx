import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCategory = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        categoryName: "",
        image: null
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
            formData.append("categoryName", data.categoryName);
            formData.append("image", data.image);

            const res = await axios.post("http://localhost:8000/api/create-cinema", formData);
           if(res.status===200){
            setIsLoading(false);
            toast.success("Cinema added successfully!");
            navigate("/all-category")
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
                    <Link to="/all-category" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={postData}>
                    <div className="col-md-6">
                        <label htmlFor="categoryName" className="form-label">Cinema Name<sup className='text-danger'>*</sup></label>
                        <input
                            type="text"
                            name="categoryName"
                            className="form-control"
                            id="categoryName"
                            onChange={handleChange}
                            value={data.categoryName}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="categoryImage" className="form-label">Cinema Image<sup className='text-danger'>*</sup></label>
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

export default AddCategory;
