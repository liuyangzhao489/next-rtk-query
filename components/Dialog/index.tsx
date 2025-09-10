import React, { ReactNode } from 'react';
import { Dialog, DialogProps } from '@mui/material';

interface CustomDialogProps extends DialogProps {
    children?: ReactNode
}

export const CustomDialog: React.FC<CustomDialogProps> = ({ children, ...props }) => {
    return (
        <Dialog sx={{ borderRadius: '30px', padding: '40px' }} {...props}>
            {children}
        </Dialog>
    )
}
