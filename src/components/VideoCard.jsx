import React from 'react'
import { Link } from "react-router-dom"; 
import { Typography, Card, CardContent, CardMedia, Avatar, Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { demoThumbnailUrl, demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle } from "../utils/constants";

const VideoCard = ({ video: { id: { videoId }, snippet } }) => {
  if (!videoId || !snippet) return null;

  return (
    <Card sx={{ 
      width: '100%', 
      boxShadow: 'none', 
      borderRadius: 0,
      backgroundColor: '#1E1E1E',
      '&:hover': {
        transform: 'scale(1.02)',
        transition: 'transform 0.3s ease-in-out',
      }
    }}>
      <Link to={`/video/${videoId}`}>
        <CardMedia
          component="img"
          image={snippet?.thumbnails?.high?.url || 'https://i.ibb.co/G2L2Gwp/API-Course.png'}
          alt={snippet?.title}
          sx={{ 
            width: '100%',
            height: 180,
            objectFit: 'cover'
          }}
        />
      </Link>
      <CardContent sx={{ backgroundColor: '#1E1E1E', height: '106px', p: 2 }}>
        <Link to={`/video/${videoId}`}>
          <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
            {snippet?.title.slice(0, 60) || "Title not available"}
          </Typography>
        </Link>
        <Link to={`/channel/${snippet?.channelId}`}>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Avatar
              src={snippet?.thumbnails?.default?.url}
              sx={{ width: 24, height: 24, mr: 1 }}
            />
            <Typography variant="subtitle2" color="gray">
              {snippet?.channelTitle || "Channel not available"}
              <CheckCircleIcon sx={{ fontSize: 12, color: 'gray', ml: '5px' }} />
            </Typography>
          </Box>
        </Link>
      </CardContent>
    </Card>
  );
};

export default VideoCard