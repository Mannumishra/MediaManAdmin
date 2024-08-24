import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllBanner = () => {
    const [data, setData] = useState([])

    const getApiData = async () => {
        try {
            const res = await axios.get("https://mediamanserver.onrender.com/api/hoading")
            console.log(res)
            if (res.status === 200) {
                setData(res.data.data.reverse())
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deleteRecord = async (_id) => {
        const userConfirmed = window.confirm("Are you sure you want to delete this records?")
        if (userConfirmed) {
            try {
                const res = await axios.delete("https://mediamanserver.onrender.com/api/hoading/" + _id)
                if (res.status === 200) {
                    toast.success("Hoading Delete successfully")
                    getApiData()
                }
            } catch (error) {
                console.log(error)
            }
        }

    }
    const deleteallRecod = async () => {
        const userConfirmed = window.confirm("Are you sure you want to delete all records?");
        if (userConfirmed) {
            try {
                const res = await axios.post("https://mediamanserver.onrender.com/api/deleteallhoading");
                if (res.status === 200) {
                    getApiData();
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        getApiData()
    }, [data.length])
    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Hoadings </h4>
                </div>
                <div className="links">
                    <span><button className='btn btn-danger' onClick={deleteallRecod}>Delete All Record</button></span>  <Link to="/add-banner" className="add-new">Add Record By Excle<i class="fa-solid fa-plus"></i></Link> <Link to="/add-banner/manual" className="add-new">Add Record Manual Record<i class="fa-solid fa-plus"></i></Link>
                </div>
            </div>

            <div className="filteration">
                <div className="selects">
                    {/* <select>
                        <option>Ascending Order </option>
                        <option>Descending Order </option>
                    </select> */}
                </div>
                <div className="search">
                    <label htmlFor="search">Search </label> &nbsp;
                    <input type="text" name="search" id="search" />
                </div>
            </div>

            <section className="d-table ">
                <table class="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">Media</th>
                            <th scope="col">State</th>
                            <th scope="col">City</th>
                            <th scope="col">Locatation</th>
                            <th scope="col">Width</th>
                            <th scope="col">Height</th>
                            <th scope="col">RPM</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Image</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, index) =>
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.media}</td>
                                    <td>{item.state}</td>
                                    <td>{item.city}</td>
                                    <td>{item.location}</td>
                                    <td>{item.width}</td>
                                    <td>{item.height}</td>
                                    <td>{item.rpm}</td>
                                    <td>{item.total}</td>
                                    <td><img src={item.image} alt="" /></td>
                                    <td><Link className="bt edit" to={`/edit-banner/${item._id}`}>Edit <i class="fa-solid fa-pen-to-square"></i></Link></td>
                                    <td><Link className="bt delete" onClick={() => deleteRecord(item._id)}>Delete <i class="fa-solid fa-trash"></i></Link></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </section>
        </>
    )
}

export default AllBanner