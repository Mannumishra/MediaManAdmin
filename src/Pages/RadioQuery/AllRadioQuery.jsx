import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllRadioQuery = () => {
    const [data, setData] = useState([])

    const getApiData = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/radio-cart")
            console.log(res)
            if (res.status === 200) {
                setData(res.data.data.reverse())
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getApiData()
    }, [data.length])
    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Hoading Enquery</h4>
                </div>
                <div className="links">
                    {/* Additional links or actions can be placed here */}
                </div>
            </div>

            <div className="filteration">
               
                <div className="search">
                    <label htmlFor="search">Search </label>&nbsp;
                    <input
                        type="text"
                        name="search"
                        id="search"
                    />
                </div>
            </div>

            <section className="d-table">
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">State</th>
                            <th scope="col">Message</th>
                            <th scope="col">Date</th>
                            <th scope="col">View Enquery</th>
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
                                        <td>{item.state}</td>
                                        <td>{item.message}</td>
                                        <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                        <td><Link className='btn btn-success' to={`/single-data-radio/${item._id}`}>View Enquery</Link></td>
                                    </tr>
                                )
                            }
                    </tbody>
                </table>
            </section>
        </>
    );
};

export default AllRadioQuery;
