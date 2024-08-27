import React, { useEffect, useState } from 'react';
import './SinglePageDtata.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SinglePageDtata = () => {
    const [data, setData] = useState(null);
    const { _id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/hoadingcart/${_id}`);
                console.log(response.data);
                setData(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [_id]);

    // const handlePrint = () => {
    //     const printWindow = window.open('', '', 'height=600,width=800');
    //     printWindow.document.write('<html><head><title>Print</title>');
    //     printWindow.document.write('<style>/* Add your styles here */</style>');
    //     printWindow.document.write('</head><body >');
    //     printWindow.document.write(document.querySelector('.details-container').innerHTML);
    //     printWindow.document.write('</body></html>');
    //     printWindow.document.close();
    //     printWindow.focus();
    //     printWindow.print();
    // };

    if (!data) {
        return <p>Loading...</p>;
    }

    return (
        <div className="details-container">
            <h4 className="details-title">Hoading Cart Details</h4>
            {/* <button onClick={handlePrint} className="print-button">Print Details</button> */}
            {/* <div className="user-details">
                <h2>User Details</h2>
                    <div>
                        <p><strong>Name:</strong> {data.name}</p>
                        <p><strong>Email:</strong> {data.email}</p>
                        <p><strong>Phone:</strong> {data.phone}</p>
                        <p><strong>State:</strong> {data.state}</p>
                        <p><strong>Date:</strong> {data.date}</p>
                    </div>
            </div> */}
            <div className="details-content">
                {data.hoadingcart && data.hoadingcart.length > 0 ? (
                    data.hoadingcart.map((item, index) => (
                        <div key={index} className="details-card">
                            <img src={item.image} alt={item.media} className="details-image" />
                            <div className="details-info">
                                <p><strong>Media:</strong> {item.media}</p>
                                <p><strong>State:</strong> {item.state}</p>
                                <p><strong>City:</strong> {item.city}</p>
                                <p><strong>Location:</strong> {item.location}</p>
                                <p><strong>Width:</strong> {item.width} feet</p>
                                <p><strong>Height:</strong> {item.height} feet</p>
                                <p><strong>RPM:</strong> ₹{item.rpm}</p>
                                <p><strong>Amount:</strong> ₹{item.amount}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No items found.</p>
                )}
            </div>
        </div>
    );
}

export default SinglePageDtata;
