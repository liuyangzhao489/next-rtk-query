import React, { ReactNode } from "react";

import { Box, Typography, BoxProps, Icon, CircularProgress} from "@mui/material";

interface DetailCardProps {
    loading: boolean,
    icon: ReactNode,
    subtitle: string,
    title: string,
    color: string,
    children?: ReactNode
}

const DetailCard: React.FC<DetailCardProps> = ({loading, icon, subtitle, title, color, children}) => {
    return (
        <Box sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: `${color}`,
                padding: "20px",
                borderRadius: "10px",
                width: "255px"
            }}>
            <Box>
                {icon}
                {loading ? <CircularProgress size={20} /> : <Typography sx={{ fontSize: "14px" }}>{subtitle}</Typography>}
            </Box>            
            <Box sx={{ textAlign: "right" }}>
                <Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>{title}</Typography>      
            </Box>
            {children}
        </Box>
    )
}

export default DetailCard