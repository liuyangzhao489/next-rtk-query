import React, { ReactNode, useState } from "react";
import { Box, IconButton, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import Sidebar from "./Sidebar";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const drawerWidth = 240; 

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width:900px)");

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {isDesktop ? (
        <Box sx={{ width: drawerWidth, flexShrink: 0 }}>
          <Sidebar open={true} onClose={() => {}} variant="permanent" />
        </Box>
      ) : (
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          variant="temporary"
        />
      )}

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          sm: isDesktop ? `${drawerWidth}px` : 0,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {!isDesktop && (
            <IconButton onClick={() => setSidebarOpen(true)}>
              <MenuIcon />
            </IconButton>
          )}
        </Box>

        <Box sx={{ flex: 1}}>{children}</Box>
      </Box>
    </Box>
  );
};

export default Layout;
