import React, { useEffect, useState } from "react";
import { Stack, Box, Typography, Alert, Button, Grid } from "@mui/material";
import { VideoCard, Loader } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const Videos = ({ category = 'All', videos: videosProp, direction = 'row', isSuggestedVideos = false }) => {
  const [videos, setVideos] = useState(videosProp || null);
  const [loading, setLoading] = useState(!videosProp);
  const [error, setError] = useState(null);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let searchQuery = '';
      
      // Create category-specific search queries
      const searchQueries = {
        'All': 'technology programming latest',
        'JavaScript': 'javascript programming tutorial',
        'ReactJS': 'reactjs react.js tutorial',
        'Python': 'python programming tutorial',
        'DevOps': 'devops tutorial',
        'Artificial Intelligence': 'artificial intelligence programming tutorial',
        'Machine Learning': 'machine learning python tutorial',
        'Cloud Computing': 'cloud computing aws azure tutorial',
        'Web Development': 'web development tutorial',
        'Database': 'database sql mongodb tutorial',
        'System Design': 'system design architecture tutorial'
      };

      searchQuery = searchQueries[category] || category;
      console.log('Fetching videos for category:', category);
      console.log('Search query:', searchQuery);
      
      const data = await fetchFromAPI(`search?part=snippet&q=${searchQuery}`);
      
      if (data?.items) {
        console.log('Successfully fetched videos:', data.items.length);
        setVideos(data.items);
      } else {
        console.log('No videos found in response:', data);
        setError('No videos found for this category');
      }
    } catch (error) {
      console.error('Error in fetchVideos:', error);
      setError(error.message || 'Error loading videos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!videosProp) {
      fetchVideos();
    }
  }, [category]);

  if (loading) return <Loader />;
  
  if (error) return (
    <Box sx={{ p: 2 }}>
      <Alert severity="error" sx={{ backgroundColor: '#1E1E1E', color: '#fff', mb: 2 }}>
        {error}
      </Alert>
      <Typography color="#fff" sx={{ mb: 2 }}>
        Please make sure:
        <ul>
          <li>The YouTube API key is valid</li>
          <li>You have not exceeded your daily quota</li>
          <li>You have an active internet connection</li>
        </ul>
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={fetchVideos}
        sx={{ mt: 2 }}
      >
        Try Again
      </Button>
    </Box>
  );

  if (!videos?.length) return (
    <Typography color="#fff" sx={{ p: 2 }}>
      No videos found for category: {category}
    </Typography>
  );

  // For suggested videos in the sidebar, use vertical stack layout
  if (isSuggestedVideos) {
    return (
      <Stack spacing={2} direction="column">
        {videos.map((item, idx) => (
          <Box key={idx} sx={{ width: '100%' }}>
            {item.id.videoId && <VideoCard video={item} />}
          </Box>
        ))}
      </Stack>
    );
  }

  // For main content (long videos and short videos), use grid layout
  return (
    <Grid container spacing={2}>
      {videos.map((item, idx) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
          <Box>
            {item.id.videoId && <VideoCard video={item} />}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default Videos;
