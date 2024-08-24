import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCity = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [allstate ,setAllstate] = useState([])
    const [data, setData] = useState({
        state: "",
        city: ""
    })
    const navigate = useNavigate()

    const getstatedata = async()=>{
        try {
            const res = await axios.get("http://localhost:8000/api/state")
            if(res.status===200){
                const newData = res.data.data 
                setAllstate(newData.reverse())
            }
        } catch (error) {
            console.log(error)
        }
    }
    const getInputData = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const postData = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const res = await axios.post("http://localhost:8000/api/city", data)
            if (res.status === 200) {
                navigate("/all-city")
                setIsLoading(false)
            }
        } catch (error) {
            toast.error(error.response.data.message)
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        getstatedata()
    },[])
    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add City</h4>
                </div>
                <div className="links">
                    <Link to="/all-tags" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={postData}>
                    <div className="col-md-6">
                    <label htmlFor="">State Name<sup className='text-danger'>*</sup></label>
                       <select name="state" id="" onChange={getInputData} className='form-control mt-2'>
                            <option value="Select state" disabled selected>Select state</option>
                            {
                                allstate.map((item , index)=>
                                <option value={item.state}>{item.state}</option>
                                )
                            }
                       </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="title" className="form-label">City Name<sup className='text-danger'>*</sup></label>
                        <input type="text" name='city' value={data.city} className="form-control" id="title" onChange={getInputData} />
                    </div>
                    <div className="col-md-12 mt-5 text-center">
                        <button type="submit" disabled={isLoading} className={`${isLoading ? 'not-allowed' : 'allowed'}`}>
                            {isLoading ? "Please Wait..." : "Add City"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddCity;
