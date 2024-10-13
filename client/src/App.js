import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopStories from './components/TopStories';
import StoryDetail from './components/StoryDetail';
import UserDetail from './components/UserDetail';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<TopStories />} />
                    <Route path="/story/:id" element={<StoryDetail />} />
                    <Route path="/user/:id" element={<UserDetail />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
