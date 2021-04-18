import React from 'react';
import TextField from '@material-ui/core/TextField';
// import {Typography} from "@material-ui/core";
// import {makeStyles} from "@material-ui/core/styles";

function EditableText(props) {
    const keyPressHandler = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    };

    return <TextField
        className={props.className}
        fullWidth
        multiline
        margin="normal"
        size="small"
        variant="outlined"
        label={props.label}
        value={props.text}
        spellCheck="false"
        onKeyPress={keyPressHandler}
        onChange={(e) => props.changeHandler(e)}
    />;
}

export default EditableText;
