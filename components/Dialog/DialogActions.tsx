import React, { ReactNode } from 'react';
import { DialogActions, DialogActionsProps } from '@mui/material';

interface CustomDialogActionsProps extends DialogActionsProps {
    children?: ReactNode
}

export const CustomDialogActions: React.FC<CustomDialogActionsProps> = ({children}) => {
    return (
        <DialogActions sx={{padding: '25px'}}>
            {children}
        </DialogActions>
    )
}
