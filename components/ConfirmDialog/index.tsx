import React from "react";
import { Box } from "@mui/material";

import { CustomDialog as Dialog } from "@/components/Dialog";
import { CustomDialogTitle as DialogTitle } from "@/components/Dialog/DialogTitle";
import { CustomDialogContent as DialogContent } from "@/components/Dialog/DialogContent";
import { CustomDialogActions as DialogActions } from "@/components/Dialog/DialogActions";
import Button from "@/components/Button";

interface ConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    content:  string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    open,
    onClose,
    onConfirm,
    title,
    content
}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle title={title} />
            <DialogContent>
                <Box sx={{fontSize: '16px'}}>
                    {content}
                </Box>
            </DialogContent>
            <DialogActions sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Button label="CANCEL" sx={{backgroundColor: "#ffff", color: "#f9d423"}} onClick={onClose}/>
                <Button label="DELETE" onClick={onConfirm} sx={{
                    backgroundColor: '#f9d423',
                        '&:hover': {
                            backgroundColor: '#ff4e00', 
                        },
                    }}
                />
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog;