import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface CustomButtonProps extends ButtonProps {
    label: string
}

const CustomButton: React.FC<CustomButtonProps> = ({label, ...props}) => {
    
    return (
        <Button
            fullWidth
            variant='contained'
            sx={{
                marginTop: 2,
                backgroundColor: '#f9d423',
                    '&:hover': {
                    backgroundColor: '#ff4e00', 
                 },
            }}
            {...props}
        >
            {label}
        </Button>
    )
}

export default CustomButton