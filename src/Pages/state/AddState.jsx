import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddState = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState("")
    const navigate = useNavigate()

    const postData = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const res = await axios.post("http://localhost:8000/api/state", { state })
            if (res.status === 200) {
                navigate("/all-state")
                setIsLoading(false)
            }
        } catch (error) {
            toast.error(error.response.data.message)
            setIsLoading(false)
        }
    }
    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add State</h4>
                </div>
                <div className="links">
                    <Link to="/all-tags" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={postData}>
                    <div className="col-md-6">
                        <label htmlFor="title" className="form-label">State Name<sup className='text-danger'>*</sup></label>
                        <input type="text" name='name' value={state} className="form-control" id="title" onChange={(e) => { setState(e.target.value) }} />
                    </div>
                    <div className="col-md-6 mt-5 text-center">
                        <button type="submit" disabled={isLoading} className={`${isLoading ? 'not-allowed' : 'allowed'}`}>
                            {isLoading ? "Please Wait..." : "Add State"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddState;
