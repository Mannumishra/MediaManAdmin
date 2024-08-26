import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditCity = () => {
    const [btnLoading, setBtnLoading] = useState(false);
    const [allstate, setAllState] = useState([]); 
    const [data, setData] = useState({
        state: "",
        city: ""
    });
    const navigate = useNavigate();
    const { _id } = useParams();

    const getAllStates = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/state");
            if (res.status === 200) {
                setAllState(res.data.data.reverse());
            }
        } catch (error) {
            console.log(error);
        }
    };


    const getCityData = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/city/" + _id);
            if (res.status === 200) {
                setData({
                    state: res.data.data.state,
                    city: res.data.data.city
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getInputData = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const postData = async (e) => {
        e.preventDefault();
        setBtnLoading(true);
        try {
            const res = await axios.put("http://localhost:8000/api/city/" + _id, data);
            if (res.status === 200) {
                toast.success(res.data.message);
                navigate("/all-city");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setBtnLoading(false);
        }
    };

    useEffect(() => {
        getAllStates();
        getCityData();
    }, [_id]);

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit City</h4>
                </div>
                <div className="links">
                    <Link to="/all-city" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={postData}>
                    <div className="col-md-6">
                        <label htmlFor="">State Name</label>
                        <select
                            name="state"
                            value={data.state}
                            onChange={getInputData}
                            className='form-control mt-2'
                        >
                            <option value="" disabled>Select state</option>
                            {allstate.map((item, index) => (
                                <option key={index} value={item.state}>{item.state}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="title" className="form-label">City Name</label>
                        <input
                            type="text"
                            name='city'
                            value={data.city}
                            className="form-control"
                            id="title"
                            onChange={getInputData}
                        />
                    </div>
                    <div className="col-md-12 mt-5 text-center">
                        <button
                            type="submit"
                            disabled={btnLoading}
                            className={`${btnLoading ? 'not-allowed' : 'allowed'}`}
                        >
                            {btnLoading ? "Please Wait..." : "Update City"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditCity;
