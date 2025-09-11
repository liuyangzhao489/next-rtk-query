import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { Box, Button, Typography, Drawer } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import LogoutIcon from '@mui/icons-material/Logout';

import { RootState } from '@/redux/store';
import { logOut } from '@/redux/authSlice';

interface SidebarProps {
    open: boolean;
    onClose: () => void;
    variant?: "permanent" | "temporary"
}

const Sidebar: React.FC<SidebarProps> = ({open, onClose, variant="permanent"}) => {
    const username = useSelector((state: RootState) => state.auth.user?.username);
    const router = useRouter();
    const dispatch = useDispatch();


    const handleLogout = async () => {
        dispatch(logOut());
        router.push('/signin')
    };

  return (
    <Drawer
        variant={variant}
        open={open}
        onClose={onClose}
        sx={{
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
    >
        <Box sx={{
            height: '100vh',
            backgroundColor: '#F2EAE1',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingTop: '50px',
            paddingLeft: '20px',
            paddingRight: '20px'
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
            }}>
                <Typography variant="h6" sx={{fontWeight: "bold"}}>CRUD OPERATIONS</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* <Image
                        src="https://i.pravatar.cc/150?img=1"
                        width={80}
                        height={890}
                        alt="Profile"
                        style={{ borderRadius: '50%', marginBottom: '10px' }}
                    /> */}
                    <Box
                        component="img"
                        src="https://i.pravatar.cc/150?img=1"
                        alt="profile"
                        sx={{ width: 80, height: 80, borderRadius: '50%' }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {username||  'User'}
                    </Typography>
                    <Typography variant="body2" color="gray" sx={{ color: "#FEAF00" }}>Admin</Typography>
                </Box>
                <Button fullWidth sx={{ marginTop: '20px', color: '#000', textAlign: 'center', backgroundColor: "#FEAF00"}} startIcon={<SchoolIcon />}>
                    Students
                </Button>
            </Box>        
            <Button
                fullWidth
                sx={{ marginTop: '10px', color: '#000', textAlign: 'left' }} startIcon={<LogoutIcon />}
                onClick={handleLogout}
            >
                Logout
            </Button>
        </Box>
    </Drawer>

  );
};

export default Sidebar;
