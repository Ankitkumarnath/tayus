import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos, Sidebar } from "./";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    setVideos(null);

    // Create category-specific search queries
    const searchQueries = {
      'New': 'technology programming latest',
      'Programming': 'programming tutorial coding',
      'JavaScript': 'javascript programming tutorial',
      'ReactJS': 'reactjs react.js tutorial',
      'NextJS': 'nextjs next.js tutorial',
      'Python': 'python programming tutorial',
      'Web Development': 'web development tutorial',
      'Software Engineering': 'software engineering tutorial',
      'Data Science': 'data science tutorial',
      'Machine Learning': 'machine learning tutorial',
      'Artificial Intelligence': 'artificial intelligence tutorial',
      'Cloud Computing': 'cloud computing tutorial',
      'DevOps': 'devops tutorial',
      'Cybersecurity': 'cybersecurity tutorial',
      'Mobile Development': 'mobile development tutorial',
      'Database': 'database tutorial',
      'System Design': 'system design tutorial'
    };

    const searchQuery = searchQueries[selectedCategory] || selectedCategory;

    fetchFromAPI(`search?part=snippet&q=${searchQuery}`)
      .then((data) => setVideos(data.items))
  }, [selectedCategory]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box sx={{ height: { sx: "auto", md: "92vh" }, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        
        <Typography className="copyright" variant="body2" sx={{ mt: 1.5, color: "#fff", }}>
          Copyright © 2024 Tayusa
        </Typography>
      </Box>

      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
          {selectedCategory} <span style={{ color: "#FC1503" }}>videos</span>
        </Typography>

        <Videos videos={videos} />
      </Box>
    </Stack>
  );
};

export default Feed;
