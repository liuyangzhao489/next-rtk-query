import React, { ReactNode } from "react";
import { DialogContent, DialogContentProps } from "@mui/material";
import { Typography } from "@mui/material";

interface CustomDialogContentProps extends DialogContentProps {
    children?: ReactNode
    error?: string
}

export const CustomDialogContent: React.FC<CustomDialogContentProps> = ({
    children, error
}) => {
    return (
        <DialogContent>
            {error && (
                <Typography variant="body2" color="error" align="center" sx={{ marginBottom: 2 }}>
                    {error}
                </Typography>
            )}
            {children}
        </DialogContent>
    )

}