import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditCategory = () => {
    const [btnLoading, setBtnLoading] = useState(false);
    const [data, setData] = useState({
        categoryName: "",
        image: null
    });
    const { _id } = useParams();

    const navigate = useNavigate()

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/create-cinema/${_id}`);
                console.log(res)
                const category = res.data.data;
                setData({
                    categoryName: category.categoryName,
                    image: null,
                });
            } catch (error) {
                console.log(error);
                toast.error("Failed to load category data.");
            }
        };
        fetchCategory();
    }, [_id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setBtnLoading(true);
        try {
            const formData = new FormData();
            formData.append("categoryName", data.categoryName);
            if (data.image) {
                formData.append("image", data.image);
            }
            const res = await axios.put(`http://localhost:8000/api/create-cinema/${_id}`, formData);
            if(res.status===200){
                toast.success("Category updated successfully!");
                navigate("/all-category")
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to update category.");
        } finally {
            setBtnLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Category</h4>
                </div>
                <div className="links">
                    <Link to="/all-category" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="categoryName" className="form-label">Category Name</label>
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
                        <label htmlFor="categoryImage" className="form-label">Category Image</label>
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
                            className={`${btnLoading ? 'not-allowed' : 'allowed'}`}
                            disabled={btnLoading}
                        >
                            {btnLoading ? "Please Wait.." : "Update Category"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditCategory;
