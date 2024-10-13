import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './TopStories.scss';

const ITEMS_PER_PAGE = 10;

const TopStories = () => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchTopStories = async () => {
            try {
                const response = await axios.get('http://localhost:3000/topstories');
                setStories(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching top stories', error);
                setLoading(false);
            }
        };
        fetchTopStories();
    }, []);

    const filteredStories = stories.filter(story => 
        story.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedStories = filteredStories.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const totalPages = Math.ceil(filteredStories.length / ITEMS_PER_PAGE);

    return (
        <div className="top-stories">
            <h1>Top Hacker News Stories</h1>
            <input 
                type="text" 
                placeholder="Search stories..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {paginatedStories.map((story) => (
                        <li key={story.id}>
                            {story.url ? (
                                <Link to={`/story/${story.id}`}>{story.title}</Link>
                            ) : (
                                <span>{story.title} (No link available)</span>
                            )}
                        </li>
                    ))}
                </ul>
            )}
            <div className="pagination">
                <button 
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                <span>{currentPage} / {totalPages}</span>
                <button 
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TopStories;
