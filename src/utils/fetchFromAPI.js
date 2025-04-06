import axios from 'axios';

const BASE_URL = 'https://www.googleapis.com/youtube/v3';
const API_KEY = 'AIzaSyAqbIB3G83LyM_NX59Hia2RGlnWBH742s4';

export const fetchFromAPI = async (endpoint) => {
  try {
    // Convert RapidAPI endpoint format to YouTube Data API format
    const url = new URL(`${BASE_URL}/${endpoint.split('?')[0]}`);
    const searchParams = new URLSearchParams(endpoint.split('?')[1]);
    
    // Add API key to all requests
    url.searchParams.append('key', API_KEY);
    
    // Convert RapidAPI parameters to YouTube Data API parameters
    searchParams.forEach((value, key) => {
      if (key === 'q') {
        url.searchParams.append('q', value);
      } else if (key === 'id') {
        url.searchParams.append('id', value);
      } else if (key === 'part') {
        url.searchParams.append('part', value);
      } else if (key === 'channelId') {
        url.searchParams.append('channelId', value);
      }
    });

    // Add default parameters
    if (endpoint.includes('search')) {
      url.searchParams.append('maxResults', '50');
      url.searchParams.append('type', 'video');
    }

    console.log('Fetching from URL:', url.toString());
    const response = await axios.get(url.toString());
    
    console.log('API Response Status:', response.status);
    console.log('Response has data:', !!response.data);

    if (!response.data) {
      throw new Error('No data received from the API');
    }
    
    return response.data;
  } catch (error) {
    console.error('API Error Details:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
    });
    
    if (error.response?.status === 400) {
      throw new Error('Invalid request. Please check the API parameters.');
    }
    
    if (error.response?.status === 403) {
      throw new Error('API key is invalid or quota has been exceeded.');
    }
    
    throw new Error(error.message || 'Failed to fetch videos. Please try again later.');
  }
};
