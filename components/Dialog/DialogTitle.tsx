import React, { ReactNode } from 'react';
import { DialogTitle, DialogTitleProps } from '@mui/material';

interface CustomDialogTitleProps extends DialogTitleProps {
    title?: string
    children?: ReactNode
}

export const CustomDialogTitle: React.FC<CustomDialogTitleProps> = ({ title, children, ...props}) => {
    return (
        <DialogTitle sx={{ fontSize: '32px', fontWeight: 'bold', textAlign: 'center' }} {...props}>
            {title}
            {children}
        </DialogTitle>
    )
}
