import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack, Chip } from '@mui/material';
import { Videos } from './';
import { useParams, useNavigate } from 'react-router-dom';

const LongVideos = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(category || 'All');

  const categories = [
    'All',
    'JavaScript',
    'ReactJS',
    'Python',
    'DevOps',
    'Artificial Intelligence',
    'Machine Learning',
    'Cloud Computing',
    'Web Development',
    'Database',
    'System Design'
  ];

  useEffect(() => {
    if (category) {
      setSelectedCategory(category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' '));
    }
  }, [category]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      navigate('/long-videos');
    } else {
      navigate(`/long-videos/${category.toLowerCase().replace(/\s+/g, '-')}`);
    }
  };

  return (
    <Box sx={{ p: 2, color: '#fff' }}>
      <Typography variant="h5" mb={3}>Long Form Videos</Typography>
      
      <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
        {categories.map((category) => (
          <Chip
            key={category}
            label={category}
            onClick={() => handleCategoryClick(category)}
            sx={{
              backgroundColor: selectedCategory === category ? '#FC1503' : '#1E1E1E',
              color: '#fff',
              '&:hover': {
                backgroundColor: selectedCategory === category ? '#e61403' : '#2d2d2d',
              },
            }}
          />
        ))}
      </Stack>

      <Box sx={{ mt: 3 }}>
        <Videos category={selectedCategory} />
      </Box>
    </Box>
  );
};

export default LongVideos; 