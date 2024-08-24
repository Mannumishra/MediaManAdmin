import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Editstate = () => {
    const [btnLoading, setBtnLoading] = useState(false);
    const [state, setState] = useState("")
    const navigate = useNavigate()

    const { _id } = useParams()
    const getApiData = async () => {
        try {
            const res = await axios.get("https://mediamanserver.onrender.com/api/state/" + _id)
            console.log(res)
            if (res.status === 200) {
                setState(res.data.data.state)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const postData = async (e) => {
        setBtnLoading(true)
        e.preventDefault()
        try {
            const res = await axios.put("https://mediamanserver.onrender.com/api/state/" + _id, { state })
            if (res.status === 200) {
                toast.success(res.data.message)
                navigate("/all-state")
            }
        } catch (error) {
            console.log(error)
            toast.error(error.data.message)
        }
    }
    useEffect(() => {
        getApiData()
    }, [_id])
    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Category</h4>
                </div>
                <div className="links">
                    <Link to="/all-tags" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={postData}>
                    <div className="col-md-6">
                        <label htmlFor="title" className="form-label">State Name</label>
                        <input type="text" name='name' value={state} className="form-control" id="title" onChange={(e)=>{setState(e.target.value)}}/>
                    </div>
                    <div className="col-md-6 mt-5 text-center">
                        <button type="submit" className={`${btnLoading ? 'not-allowed' : 'allowed'}`} >{btnLoading ? "Please Wait.." : "Update state"} </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Editstate;
