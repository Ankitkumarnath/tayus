import React from 'react';
import { Box, Typography, Avatar, Stack, Chip, Grid, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();
  // Mock user data - in a real app, this would come from your backend
  const user = {
    id: 'user_123',
    name: 'Tech Enthusiast',
    avatar: 'https://i.pravatar.cc/150?img=12',
    subscriptions: [
      { 
        id: 'channel_1', 
        name: 'JavaScript Mastery', 
        category: 'JavaScript',
        thumbnail: 'https://i.pravatar.cc/300?img=1',
        subscribers: '1.2M',
        videos: 245
      },
      { 
        id: 'channel_2', 
        name: 'DevOps Mastery', 
        category: 'DevOps',
        thumbnail: 'https://i.pravatar.cc/300?img=2',
        subscribers: '850K',
        videos: 180
      },
      { 
        id: 'channel_3', 
        name: 'AI & ML Hub', 
        category: 'Artificial Intelligence',
        thumbnail: 'https://i.pravatar.cc/300?img=3',
        subscribers: '2.1M',
        videos: 320
      },
      { 
        id: 'channel_4', 
        name: 'Cloud Computing Pro', 
        category: 'Cloud Computing',
        thumbnail: 'https://i.pravatar.cc/300?img=4',
        subscribers: '980K',
        videos: 210
      },
      { 
        id: 'channel_5', 
        name: 'React Masters', 
        category: 'ReactJS',
        thumbnail: 'https://i.pravatar.cc/300?img=5',
        subscribers: '1.5M',
        videos: 275
      },
      { 
        id: 'channel_6', 
        name: 'Python Guru', 
        category: 'Python',
        thumbnail: 'https://i.pravatar.cc/300?img=6',
        subscribers: '2.3M',
        videos: 400
      },
      { 
        id: 'channel_7', 
        name: 'Database Pro', 
        category: 'Database',
        thumbnail: 'https://i.pravatar.cc/300?img=7',
        subscribers: '750K',
        videos: 156
      },
      { 
        id: 'channel_8', 
        name: 'System Design Hub', 
        category: 'System Design',
        thumbnail: 'https://i.pravatar.cc/300?img=8',
        subscribers: '1.1M',
        videos: 198
      },
    ],
    interests: ['JavaScript', 'ReactJS', 'DevOps', 'AI', 'Cloud Computing'],
  };

  const handleChannelClick = (channelId) => {
    navigate(`/channel/${channelId}`);
  };

  return (
    <Box sx={{ p: 3, color: '#fff' }}>
      {/* User Profile Header */}
      <Stack direction="row" alignItems="center" spacing={2} mb={4}>
        <Avatar
          src={user.avatar}
          sx={{ width: 100, height: 100 }}
        />
        <Box>
          <Typography variant="h4" fontWeight="bold">
            {user.name}
            <CheckCircleIcon sx={{ fontSize: '24px', color: '#FC1503', ml: 1 }} />
          </Typography>
          <Typography variant="body1" color="gray">
            User ID: {user.id}
          </Typography>
        </Box>
      </Stack>

      {/* User Interests */}
      <Box mb={4}>
        <Typography variant="h6" mb={2}>Your Interests</Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
          {user.interests.map((interest) => (
            <Chip
              key={interest}
              label={interest}
              sx={{
                backgroundColor: '#FC1503',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#e61403',
                },
              }}
            />
          ))}
        </Stack>
      </Box>

      {/* Subscribed Channels Grid */}
      <Box>
        <Typography variant="h6" mb={3}>Subscribed Channels</Typography>
        <Grid container spacing={3}>
          {user.subscriptions.map((channel) => (
            <Grid item xs={12} sm={6} md={3} key={channel.id}>
              <Card 
                sx={{ 
                  bgcolor: '#1E1E1E',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: '#2d2d2d',
                    transform: 'scale(1.02)',
                    transition: 'all 0.3s ease-in-out'
                  }
                }}
                onClick={() => handleChannelClick(channel.id)}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={channel.thumbnail}
                  alt={channel.name}
                />
                <CardContent>
                  <Stack spacing={1}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {channel.name}
                      <CheckCircleIcon sx={{ fontSize: '14px', color: '#FC1503', ml: 0.5 }} />
                    </Typography>
                    <Typography variant="body2" color="gray">
                      {channel.category}
                    </Typography>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="caption" color="gray">
                        {channel.subscribers} subscribers
                      </Typography>
                      <Typography variant="caption" color="gray">
                        {channel.videos} videos
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default UserProfile; 