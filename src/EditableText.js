import React from 'react';
import TextField from '@material-ui/core/TextField';
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
    notchedOutline: {
        borderWidth: "1px",
        borderColor: props => (props.isFreeuni ? theme.palette.freeuni.main : theme.palette.agruni.main)
    },
    cssLabel: {
        // color: 'black'
    },
    cssShrunk: props => ({
        color: props.isFreeuni ? theme.palette.freeuni.main : theme.palette.agruni.main
    }),
    cssOutlinedInput: {
        // "&$cssFocused $notchedOutline": {
        //     borderColor: `${fade(theme.palette.freeuni.light, 0.1)} !important`
        // },
        // "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
        //     borderColor: `${fade(theme.palette.freeuni.light, 0.2)} !important`
        // }
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
        variant="outlined"
        label={props.label}
        value={props.text}
        spellCheck="false"
        onKeyPress={keyPressHandler}
        onChange={(e) => props.changeHandler(e)}
        InputProps={{
            classes: {
                root: classes.cssOutlinedInput,
                notchedOutline: classes.notchedOutline,
            },
            inputMode: props.digitsOnly ? "numeric" : "text"
        }}
        InputLabelProps={{
            classes: {
                root: classes.cssLabel,
                shrink: classes.cssShrunk
            }
        }}
    />
}

export default EditableText;
