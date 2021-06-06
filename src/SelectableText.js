import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        "& .MuiFormLabel-root.Mui-focused": {
            color: props => props.isFreeuni ? theme.palette.freeuni.main : theme.palette.agruni.main
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: props => props.isFreeuni ? theme.palette.freeuni.main : theme.palette.agruni.main
        },
        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: props => props.isFreeuni ? theme.palette.freeuni.light : theme.palette.agruni.light
        },
    },
    menuItems: {
        backgroundColor: theme.palette.background.default
    },
    notchedOutline: {
        borderWidth: "1px",
        borderColor: props => (props.isFreeuni ? theme.palette.freeuni.main : theme.palette.agruni.main)
    },
    cssLabel: {
        //
    },
    cssShrunk: props => ({
        color: props.isFreeuni ? theme.palette.freeuni.main : theme.palette.agruni.main
    }),
    cssOutlinedInput: {
        height: '100%',
    },
}));

function EditableText(props) {
    const classes = useStyles(props);

    const keyPressHandler = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    };

    return <TextField
        className={props.className + ' ' + classes.root}
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
                classes: {paper: classes.menuItems}
            }
        }}
        InputProps={{
            classes: {
                root: classes.cssOutlinedInput,
                notchedOutline: classes.notchedOutline,
            },
            inputMode: "numeric"
        }}
        InputLabelProps={{
            classes: {
                root: classes.cssLabel,
                shrink: classes.cssShrunk
            }
        }}
    >
        {["A", "B", "C", "D", "E", "F"].map(value => {
            return (<MenuItem key={value} value={value}>{value}</MenuItem>);
        })}
    </TextField>
}

export default EditableText;
