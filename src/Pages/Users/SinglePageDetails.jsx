import React, { useEffect, useState } from 'react';
import './SinglePageDetails.css'; // Import your CSS file for styles
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SinglePageDetails = () => {
    const [data, setData] = useState(null);
    const { _id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/cinemaCart/${_id}`);
                console.log(response.data.data); // Check the response structure
                setData(response.data.data); // Update this according to your API response structure
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [_id]);

    // Add checks for null and undefined
    if (!data) {
        return <p>Loading...</p>;
    }

    return (
        <div className="details-container">
            <h4 className="details-title">Cinema Cart Details</h4>
            <div className="details-content">
                {data.item && data.item.length > 0 ? (
                    data.item.map((item, index) => (
                        <div key={index} className="details-card">
                            <img src={item.image} alt={item.name} className="details-image" />
                            <div className="details-info">
                                <h5 className="details-cinema">{item.cinemaName}</h5>
                                {/* <p><strong>Name:</strong> {item.name}</p> */}
                                <p><strong>Category:</strong> {item.category}</p>
                                <p><strong>State:</strong> {item.state}</p>
                                <p><strong>City:</strong> {item.city}</p>
                                <p><strong>Screen:</strong> {item.screen}</p>
                                <p><strong>Seating:</strong> {item.seating}</p>
                                <p><strong>Price:</strong> ₹{item.money}</p>
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

export default SinglePageDetails;
