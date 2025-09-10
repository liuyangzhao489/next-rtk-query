import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

const TextInput: React.FC<TextFieldProps> = (props) => {
    return (
        <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            {...props}
        />
    );
}

export default TextInput;