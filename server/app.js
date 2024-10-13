const express = require('express');
const axios = require('axios');
const cors = require('cors');
const cache = require('memory-cache');

const app = express();
app.use(cors());

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

const withDependencyInjection = (fn) => {
    return (req, res) => fn(req, res, { axios, cache });
};

const getItemById = async (req, res, { axios }) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`${BASE_URL}/item/${id}.json`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching item data' });
    }
};

app.get('/item/:id', withDependencyInjection(getItemById));

const getUserById = async (req, res, { axios }) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`${BASE_URL}/user/${id}.json`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user data' });
    }
};

app.get('/user/:id', withDependencyInjection(getUserById));

const getTopStories = async (req, res, { axios, cache }) => {
    const cachedStories = cache.get('topStories');
    if (cachedStories) {
        return res.status(200).json(cachedStories);
    }

    try {
        const topStoriesIds = await axios.get(`${BASE_URL}/topstories.json`);
        const storyPromises = topStoriesIds.data.slice(0, 200).map(async (storyId) => {
            const storyData = await axios.get(`${BASE_URL}/item/${storyId}.json`);
            return storyData.data;
        });
        const topStories = await Promise.all(storyPromises);
        cache.put('topStories', topStories, 300000); // Cache for 5 minutes
        res.status(200).json(topStories);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching top stories' });
    }
};

app.get('/topstories', withDependencyInjection(getTopStories));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
