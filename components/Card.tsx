import React, { ReactNode } from "react";
import { Box, Typography, BoxProps} from "@mui/material";

interface CardProps extends BoxProps {
    title: string,
    subtitle?: string,
    detail?: string,
    children: ReactNode
}

const Card: React.FC<CardProps> = ({title, subtitle, detail, children, ...props}) => {
    return (
        <Box sx={{
                backgroundColor: 'white',
                padding: 3,
                borderRadius: 2,
                boxShadow: 3,
                ...props.sx,
            }}
            {...props}
        >
            <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#000' }}>
                {title}
            </Typography>
            
            {subtitle && (
                <Typography variant="h6" align="center" gutterBottom>
                    {subtitle}
                </Typography>
            )}

            {detail && (
                <Typography variant="body2" align="center" color="textSecondary" gutterBottom>
                    {detail}
                </Typography>
            )}
            {children}
        </Box>
    )
}

export default Card

