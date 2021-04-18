import React from 'react';
import TextField from '@material-ui/core/TextField';
// import {Typography} from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    menuItems: {
        backgroundColor: theme.palette.primary.main
    }
}));

function EditableText(props) {
    const classes = useStyles();

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
        select
        variant="outlined"
        label={props.label}
        value={props.text}
        onKeyPress={keyPressHandler}
        onChange={(e) => props.changeHandler(e)}
        SelectProps={{
            MenuProps: {
                classes: { paper: classes.menuItems }
            }
        }}
    >
        {["A", "B", "C", "D", "E", "F"].map(value => {
            return (<MenuItem key={value} value={value}>{value}</MenuItem>);
        })}
    </TextField>
}

export default EditableText;
