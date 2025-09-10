import React from 'react';
import { Box, Button } from '@mui/material';

const Header: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'right', padding: '10px 20px', backgroundColor: '#fff', borderBottom: '1px solid #ddd' }}>
      <Button variant="contained" color="primary">Add New Student</Button>
    </Box>
  );
};

export default Header;
