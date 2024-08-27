import React, { useEffect, useState } from 'react';
import './SinglePageDtata.css'; // Import your CSS file for styles
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SinglePageDtataRadio = () => {
    const [data, setData] = useState(null);
    const { _id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/radio-cart/${_id}`);
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
            <h4 className="details-title">Radio Cart Details</h4>
            <div className="details-content">
                {data.radiocart && data.radiocart.length > 0 ? (
                    data.radiocart.map((item, index) => (
                        <div key={index} className="details-card">
                            <img src={item.image} alt={item.station} className="details-image" />
                            <div className="details-info">
                                <p><strong>Station:</strong> {item.station}</p>
                                <p><strong>State:</strong> {item.state}</p>
                                <p><strong>City:</strong> {item.city}</p>
                                <p><strong>Rate:</strong> ₹{item.rate}</p>
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

export default SinglePageDtataRadio;
