import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { Videos, Loader } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => setVideoDetail(data.items[0]))

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => setVideos(data.items))
  }, [id]);

  if (!videoDetail?.snippet) return <Loader />;

  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;

  const handleVideoClick = () => {
    const player = document.querySelector('.react-player');
    if (player) {
      player.requestFullscreen();
    }
  };

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        {/* Main Video Section */}
        <Box flex={1} sx={{ width: '100%', maxWidth: '100%' }}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <Box
              onClick={handleVideoClick}
              sx={{
                cursor: 'pointer',
                width: '100%',
                height: 'calc(100vh - 200px)',
                minHeight: '500px',
                backgroundColor: '#000'
              }}
            >
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${id}`}
                className="react-player"
                controls
                playing={true}
                width="100%"
                height="100%"
                config={{
                  youtube: {
                    playerVars: {
                      autoplay: 1,
                      controls: 1,
                      modestbranding: 1,
                      rel: 0,
                      fs: 1,
                    },
                  },
                }}
              />
            </Box>
            <Box sx={{ p: 2 }}>
              <Typography color="#fff" variant="h5" fontWeight="bold">
                {title}
              </Typography>
              <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1}>
                <Link to={`/channel/${channelId}`}>
                  <Typography variant={{ sm: "subtitle1", md: 'h6' }} color="#fff">
                    {channelTitle}
                    <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
                  </Typography>
                </Link>
                <Stack direction="row" gap="20px" alignItems="center">
                  <Typography variant="body1" sx={{ opacity: 0.7 }}>
                    {parseInt(viewCount).toLocaleString()} views
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.7 }}>
                    {parseInt(likeCount).toLocaleString()} likes
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Box>

        {/* Related Videos Sidebar */}
        <Box
          sx={{
            width: { xs: '100%', md: '400px' },
            maxHeight: 'calc(100vh - 86px)',
            overflowY: 'auto',
            position: { md: 'sticky' },
            top: '86px',
            p: 2
          }}
        >
          <Typography variant="h6" color="#fff" mb={2}>
            Related Videos
          </Typography>
          <Videos videos={videos} isSuggestedVideos={true} />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
