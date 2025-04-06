import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { SearchBar, PostContent } from "./";
import CodeIcon from '@mui/icons-material/Code';

const Navbar = () => (
  <Stack 
    direction="row" 
    alignItems="center" 
    p={2} 
    sx={{ 
      position: "sticky", 
      background: '#000', 
      top: 0, 
      justifyContent: "space-between",
      zIndex: 1000
    }}
  >
    <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
      <CodeIcon sx={{ color: '#FC1503', fontSize: 45 }} />
      <Typography 
        variant="h4" 
        fontWeight="bold" 
        ml={1}
        sx={{ 
          color: "white",
          textDecoration: "none",
          display: { xs: 'none', sm: 'block' }
        }}
      >
        Tayusa
      </Typography>
    </Link>
    <Stack direction="row" alignItems="center" spacing={2}>
      <SearchBar />
      <PostContent />
    </Stack>
  </Stack>
);

export default Navbar;
