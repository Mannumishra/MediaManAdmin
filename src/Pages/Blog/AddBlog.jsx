import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JoditEditor from 'jodit-react';

const AddBlog = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        blogName: "",
        image: null,
        blogDescription: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: files ? files[0] : value
        }));
    };

    const handleEditorChange = (content) => {
        setData(prevData => ({
            ...prevData,
            blogDescription: content
        }));
    };

    const postData = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append("blogName", data.blogName);
            formData.append("image", data.image);
            formData.append("blogDescription", data.blogDescription);

            const res = await axios.post("https://mediamanserver.onrender.com/api/blog", formData);
            console.log(res)
            if (res.status === 200) {
                setIsLoading(false);
                toast.success("Blog added successfully!");
                navigate("/all-blog");
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false);
            toast.error(error.response?.data?.message || "An error occurred");
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Blog</h4>
                </div>
                <div className="links">
                    <Link to="/all-blog" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={postData}>
                    <div className="col-md-6">
                        <label htmlFor="blogName" className="form-label">Blog Name<sup className='text-danger'>*</sup></label>
                        <input
                            type="text"
                            name="blogName"
                            className="form-control"
                            id="blogName"
                            onChange={handleChange}
                            value={data.blogName}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="categoryImage" className="form-label">Blog Image<sup className='text-danger'>*</sup></label>
                        <input
                            type="file"
                            name="image"
                            className="form-control"
                            id="categoryImage"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="blogDescription" className="form-label">Blog blogDescription<sup className='text-danger'>*</sup></label>
                        <JoditEditor
                            value={data.blogDescription}
                            onChange={handleEditorChange}
                            placeholder="Enter Blog details here..."
                        />
                    </div>
                    <div className="col-12 text-center">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`${isLoading ? 'not-allowed' : 'allowed'}`}
                        >
                            {isLoading ? "Please Wait..." : "Add Blog"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddBlog;
