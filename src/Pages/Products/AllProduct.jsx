import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllProduct = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const getApiData = async (page) => {
        try {
            const res = await axios.get(`https://mediamanserver.onrender.com/api/cinemaimport?page=${page}&limit=50`);
            if (res.status === 200) {
                if (res.data.data.length === 0 && page > 1) {
                    setCurrentPage(page - 1);
                } else {
                    setData(res.data.data);
                    setCurrentPage(res.data.currentPage);
                    setTotalPages(res.data.totalPages);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    

    const deleteRecord = async (_id) => {
        const userInput = window.confirm("Are you sure you want to delete all records?")
        if (userInput) {
            try {
                const res = await axios.delete("https://mediamanserver.onrender.com/api/deleterecord/" + _id);
                if (res.status === 200) {
                    toast.success("Cinema deleted Successfully");
                    getApiData(currentPage);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const deleteallRecord = async () => {
        const userInput = window.confirm("Are you sure you want to delete all records?")
        if (userInput) {
            try {
                const res = await axios.delete("https://mediamanserver.onrender.com/api/deleteallcinema");
                if (res.status === 200) {
                    setCurrentPage(1); // Reset to the first page
                    setData([]); // Clear the data immediately
                    setTotalPages(0); // Reset total pages
                    getApiData(1); // Fetch data for the first page
                    toast.success("All records deleted successfully");
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    
    

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }
    
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }
    
    useEffect(() => {
        getApiData(currentPage);
    }, [currentPage]);

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Product List </h4>
                </div>
                <div className="links">
                    <button className="btn btn-danger" onClick={deleteallRecord}>Delete All Record</button> <Link to="/add-product" className="add-new">Add Record By ExcleSheet<i className="fa-solid fa-plus"></i></Link>
                    {/* <Link to="/add-cinema-manual" className="add-new">Add Manual Record<i className="fa-solid fa-plus"></i></Link> */}
                </div>
            </div>

            {/* <div className="filteration">
                <div className="search">
                    <label htmlFor="search">Search </label> &nbsp;
                    <input type="text" name="search" id="search" />
                </div>
            </div> */}

            <section className="d-table">
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">Cinema Chain</th>
                            <th scope="col">Cinema</th>
                            <th scope="col">Category</th>
                            <th scope="col">State</th>
                            <th scope="col">City</th>
                            <th scope="col">Audi</th>
                            <th scope="col">Seating</th>
                            <th scope="col">Money</th>
                            <th scope="col">Image</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, index) =>
                                <tr key={index}>
                                    <th scope="row">{(currentPage - 1) * 50 + index + 1}</th>
                                    <td>{item.cinemaChain}</td>
                                    <td>{item.cinema}</td>
                                    <td>{item.category}</td>
                                    <td>{item.state}</td>
                                    <td>{item.city}</td>
                                    <td>{item.audi}</td>
                                    <td>{item.seatingCapacity}</td>
                                    <td>{item.baseRate10SecWeek}</td>
                                    <td><img src={item.image} alt="" /></td>
                                    <td><Link className="bt edit" to={`/edit-cinema/${item._id}`}>Edit <i className="fa-solid fa-pen-to-square"></i></Link></td>
                                    <td><Link className="bt delete" onClick={() => { deleteRecord(item._id) }}>Delete <i className="fa-solid fa-trash"></i></Link></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </section>

            <div className="pagination-controls">
                <button onClick={handlePrevPage} disabled={currentPage === 1} className='btn btn-dark'>Previous</button> &nbsp;
                <span>Page {currentPage} of {totalPages}</span> &nbsp;
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className='btn btn-dark'>Next</button>
            </div>
        </>
    )
}

export default AllProduct;
