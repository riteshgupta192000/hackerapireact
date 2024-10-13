import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './StoryDetail.scss';

const StoryDetail = () => {
    const { id } = useParams();
    const [story, setStory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStory = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/item/${id}`);
                setStory(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching story', error);
                setLoading(false);
            }
        };
        fetchStory();
    }, [id]);

    return (
        <div className="story-detail">
            {loading ? (
                <p>Loading...</p>
            ) : (
                story && (
                    <div>
                        <h2>{story.title}</h2>
                        <p>By: <a href={`/user/${story.by}`}>{story.by}</a></p>
                        <p>{story.text ? story.text : 'No description available'}</p>
                        <a href={story.url} target="_blank" rel="noopener noreferrer">Read More</a>
                    </div>
                )
            )}
        </div>
    );
};

export default StoryDetail;
