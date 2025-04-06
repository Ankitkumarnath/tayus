import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Stack, Card, CardContent, Avatar, IconButton, Grid, Divider } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';

const CommunityPosts = () => {
  const navigate = useNavigate();
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Tech Enthusiast',
      channelId: 'channel_1',
      avatar: 'https://i.pravatar.cc/150?img=12',
      content: 'Just finished building a full-stack application using React and Node.js! Check out my latest project on GitHub. Here are some key features:\n\n• Real-time data updates\n• GraphQL integration\n• Serverless architecture\n• CI/CD pipeline',
      likes: 42,
      isLiked: false,
      comments: 8,
      timestamp: '2 hours ago',
      category: 'Web Development',
      image: 'https://source.unsplash.com/random/800x400/?coding'
    },
    {
      id: 2,
      author: 'AI Developer',
      channelId: 'channel_3',
      avatar: 'https://i.pravatar.cc/150?img=15',
      content: 'Exploring the latest developments in GPT-4 and its applications in natural language processing. The advancements in AI are truly remarkable!',
      likes: 38,
      isLiked: false,
      comments: 12,
      timestamp: '4 hours ago',
      category: 'Artificial Intelligence',
      image: 'https://source.unsplash.com/random/800x400/?artificial-intelligence'
    },
    {
      id: 3,
      author: 'Cloud Expert',
      channelId: 'channel_4',
      avatar: 'https://i.pravatar.cc/150?img=20',
      content: 'New tutorial series on AWS Lambda and Serverless Architecture coming soon! Stay tuned for in-depth content on cloud computing.',
      likes: 65,
      isLiked: false,
      comments: 15,
      timestamp: '6 hours ago',
      category: 'Cloud Computing',
      image: 'https://source.unsplash.com/random/800x400/?cloud-computing'
    }
  ]);

  const handlePost = () => {
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        author: 'Tech Enthusiast',
        channelId: 'user_channel',
        avatar: 'https://i.pravatar.cc/150?img=12',
        content: newPost,
        likes: 0,
        isLiked: false,
        comments: 0,
        timestamp: 'Just now',
        category: 'General'
      };
      setPosts([post, ...posts]);
      setNewPost('');
    }
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const handleChannelClick = (channelId) => {
    navigate(`/channel/${channelId}`);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, color: '#fff' }}>
      <Typography variant="h5" mb={3}>Community Posts</Typography>
      
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="Share your thoughts with the tech community..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              color: '#fff',
              '& fieldset': {
                borderColor: '#3d3d3d',
              },
              '&:hover fieldset': {
                borderColor: '#FC1503',
              },
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handlePost}
          sx={{
            backgroundColor: '#FC1503',
            '&:hover': {
              backgroundColor: '#e61403',
            },
          }}
        >
          Post
        </Button>
      </Box>

      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={12} key={post.id}>
            <Card sx={{ backgroundColor: '#1E1E1E', borderRadius: 2 }}>
              <CardContent>
                <Stack spacing={2}>
                  {/* Post Header */}
                  <Stack 
                    direction="row" 
                    spacing={2} 
                    alignItems="center"
                    sx={{ cursor: 'pointer' }}
                    onClick={() => handleChannelClick(post.channelId)}
                  >
                    <Avatar src={post.avatar} />
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {post.author}
                        <CheckCircleIcon sx={{ fontSize: "14px", color: "#FC1503", ml: "5px" }} />
                      </Typography>
                      <Typography variant="caption" color="gray">
                        {post.timestamp} • {post.category}
                      </Typography>
                    </Box>
                  </Stack>

                  {/* Post Content */}
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                    {post.content}
                  </Typography>

                  {/* Post Image */}
                  {post.image && (
                    <Box
                      component="img"
                      src={post.image}
                      alt={post.category}
                      sx={{
                        width: '100%',
                        borderRadius: 1,
                        maxHeight: 400,
                        objectFit: 'cover'
                      }}
                    />
                  )}

                  <Divider sx={{ borderColor: '#3d3d3d' }} />

                  {/* Post Actions */}
                  <Stack direction="row" spacing={2}>
                    <IconButton 
                      onClick={() => handleLike(post.id)}
                      sx={{ color: post.isLiked ? '#FC1503' : '#fff' }}
                    >
                      {post.isLiked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                      <Typography variant="body2" ml={1}>
                        {post.likes}
                      </Typography>
                    </IconButton>
                    <IconButton sx={{ color: '#fff' }}>
                      <CommentIcon />
                      <Typography variant="body2" ml={1}>
                        {post.comments}
                      </Typography>
                    </IconButton>
                    <IconButton sx={{ color: '#fff' }}>
                      <ShareIcon />
                    </IconButton>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CommunityPosts; 