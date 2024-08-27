import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllQuery = () => {
    const [data, setData] = useState([])

    const getApiData = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/contacts")
            console.log(res)
            if (res.status === 200) {
                const newData = res.data.data
                setData(newData.reverse())
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deleteCinema = async (_id) => {
        try {
            const res = await axios.delete("http://localhost:8000/api/contacts/" + _id)
            if (res.status === 200) {
                toast.success(res.data.message)
                getApiData()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);
        const formattedDate = date.toLocaleDateString(); // MM/DD/YYYY
        const formattedTime = date.toLocaleTimeString(); // HH:MM:SS AM/PM
        return `${formattedDate} ${formattedTime}`;
    };
    useEffect(() => {
        getApiData()
    }, [data.length])
    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Cinema List </h4>
                </div>
                <div className="links">
                    <Link to="/add-category" className="add-new">Add New <i class="fa-solid fa-plus"></i></Link>
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
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Looking For</th>
                            <th scope="col">Message</th>
                            <th scope="col">Date</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, index) =>
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.lookingfor}</td>
                                    <td>{item.message}</td>
                                    <td>{formatDate(item.createdAt)}</td>
                                    <td><Link className="bt delete" onClick={() => deleteCinema(item._id)}>Delete <i class="fa-solid fa-trash"></i></Link></td>
                                </tr>
                            )
                        }
                    </tbody>

                </table>
            </section>
        </>
    )
}

export default AllQuery