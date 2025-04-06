import React, { useState } from 'react';
import { Box, Button, Modal, TextField, Typography, Stack, Tabs, Tab, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ShortTextIcon from '@mui/icons-material/ShortText';
import ForumIcon from '@mui/icons-material/Forum';

const PostContent = () => {
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [videoUrl, setVideoUrl] = useState('');
  const [shortText, setShortText] = useState('');
  const [communityPost, setCommunityPost] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSubmit = () => {
    // Here you would typically handle the submission to your backend
    console.log('Submitting content:', { videoUrl, shortText, communityPost });
    handleClose();
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{
          backgroundColor: '#FC1503',
          '&:hover': {
            backgroundColor: '#e61403',
          },
          borderRadius: '20px',
          px: 3,
          py: 1,
        }}
      >
        Post Content
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="post-content-modal"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{
          width: { xs: '90%', md: '600px' },
          bgcolor: '#1E1E1E',
          borderRadius: '10px',
          p: 3,
          position: 'relative',
        }}>
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: '#fff',
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
            Post New Content
          </Typography>

          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              mb: 2,
              '& .MuiTab-root': {
                color: '#fff',
                '&.Mui-selected': {
                  color: '#FC1503',
                },
              },
            }}
          >
            <Tab icon={<VideoLibraryIcon />} label="Video" />
            <Tab icon={<ShortTextIcon />} label="Short" />
            <Tab icon={<ForumIcon />} label="Community" />
          </Tabs>

          <Box sx={{ mt: 2 }}>
            {tabValue === 0 && (
              <TextField
                fullWidth
                label="Video URL"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    '& fieldset': {
                      borderColor: '#3d3d3d',
                    },
                    '&:hover fieldset': {
                      borderColor: '#FC1503',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#fff',
                  },
                }}
              />
            )}

            {tabValue === 1 && (
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Short Content"
                value={shortText}
                onChange={(e) => setShortText(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    '& fieldset': {
                      borderColor: '#3d3d3d',
                    },
                    '&:hover fieldset': {
                      borderColor: '#FC1503',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#fff',
                  },
                }}
              />
            )}

            {tabValue === 2 && (
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Community Post"
                value={communityPost}
                onChange={(e) => setCommunityPost(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    '& fieldset': {
                      borderColor: '#3d3d3d',
                    },
                    '&:hover fieldset': {
                      borderColor: '#FC1503',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#fff',
                  },
                }}
              />
            )}
          </Box>

          <Stack direction="row" spacing={2} sx={{ mt: 3, justifyContent: 'flex-end' }}>
            <Button onClick={handleClose} sx={{ color: '#fff' }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                backgroundColor: '#FC1503',
                '&:hover': {
                  backgroundColor: '#e61403',
                },
              }}
            >
              Post
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default PostContent; 