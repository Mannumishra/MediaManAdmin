import React, { useEffect, useState } from 'react';
import './SinglePageDtata.css'; // Import your CSS file for styles
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SinglePageDtata = () => {
    const [data, setData] = useState(null);
    const { _id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://mediamanserver.onrender.com/api/hoadingcart/${_id}`);
                console.log(response.data);
                setData(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [_id]);

    if (!data) {
        return <p>Loading...</p>;
    }

    return (
        <div className="details-container">
            <h1 className="details-title">Hoading Cart Details</h1>
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
