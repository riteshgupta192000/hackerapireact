import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './UserDetail.scss';

const UserDetail = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/user/${id}`);
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user', error);
                setLoading(false);
            }
        };
        fetchUser();
    }, [id]);

    return (
        <div className="user-detail">
            {loading ? (
                <p>Loading...</p>
            ) : (
                user && (
                    <div>
                        <h2>{user.id}</h2>
                        <p>Karma: {user.karma}</p>
                        <p>Created: {new Date(user.created * 1000).toLocaleDateString()}</p>
                    </div>
                )
            )}
        </div>
    );
};

export default UserDetail;
