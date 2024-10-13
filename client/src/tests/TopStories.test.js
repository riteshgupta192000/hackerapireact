import { render, screen } from '@testing-library/react';
import TopStories from '../components/TopStories';
import axios from 'axios';

jest.mock('axios');

test('renders loading state initially', () => {
    render(<TopStories />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
});

test('renders stories after fetching', async () => {
    axios.get.mockResolvedValueOnce({
        data: [{ id: 1, title: 'Test Story', url: 'http://example.com' }]
    });
    
    render(<TopStories />);
    expect(await screen.findByText('Test Story')).toBeInTheDocument();
});
