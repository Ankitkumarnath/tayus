import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from '@mui/material';

import { ChannelDetail, VideoDetail, SearchFeed, Navbar, Feed, UserProfile, CommunityPosts, LongVideos, ShortVideos } from './components';

const App = () => (
  <BrowserRouter>
    <Box sx={{ backgroundColor: '#000' }}>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Feed />} />
        <Route path='/video/:id' element={<VideoDetail />} />
        <Route path='/channel/:id' element={<ChannelDetail />} />
        <Route path='/search/:searchTerm' element={<SearchFeed />} />
        <Route path='/profile' element={<UserProfile />} />
        <Route path='/community' element={<CommunityPosts />} />
        <Route path='/long-videos' element={<LongVideos />} />
        <Route path='/long-videos/:category' element={<LongVideos />} />
        <Route path='/short-videos' element={<ShortVideos />} />
        <Route path='/short-videos/:category' element={<ShortVideos />} />
      </Routes>
    </Box>
  </BrowserRouter>
);

export default App;
