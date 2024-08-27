import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JoditEditor from 'jodit-react';

const EditBlog = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        blogName: "",
        image: null,
        blogDescription: ""
    });
    const { _id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/blog/${_id}`);
                const blog = res.data.data;
                setData({
                    blogName: blog.blogName,
                    image: null,  // You might want to handle the current image differently, if needed
                    blogDescription: blog.blogDescription
                });
            } catch (error) {
                console.error(error);
                toast.error("Failed to load blog data.");
            }
        };
        fetchBlog();
    }, [_id]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append("blogName", data.blogName);
            if (data.image) {
                formData.append("image", data.image);
            }
            formData.append("blogDescription", data.blogDescription);

            const res = await axios.put(`http://localhost:8000/api/blog/${_id}`, formData);
            if (res.status === 200) {
                toast.success("Blog updated successfully!");
                navigate("/all-blog");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to update blog.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Blog</h4>
                </div>
                <div className="links">
                    <Link to="/all-blog" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
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
                        <label htmlFor="image" className="form-label">Blog Image</label>
                        <input
                            type="file"
                            name="image"
                            className="form-control"
                            id="image"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="blogDescription" className="form-label">Blog Description<sup className='text-danger'>*</sup></label>
                        <JoditEditor
                            value={data.blogDescription}
                            onChange={handleEditorChange}
                            placeholder="Enter blog details here..."
                        />
                    </div>
                    <div className="col-12 text-center">
                        <button
                            type="submit"
                            className={`btn ${isLoading ? 'btn-secondary' : 'btn-primary'}`}
                            disabled={isLoading}
                        >
                            {isLoading ? "Please Wait..." : "Update Blog"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditBlog;
