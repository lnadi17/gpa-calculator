import React, {createRef} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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
    cssShrunk: props => ({
        color: props.isFreeuni ? theme.palette.freeuni.main : theme.palette.agruni.main
    }),
    title: props => ({
        color: props.isFreeuni ? theme.palette.freeuni.main : theme.palette.agruni.main
    }),
}));

export default function EmisDialog(props) {
    const classes = useStyles(props);
    const textRef = createRef();

    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle className={classes.title}>ემისიდან შედეგების შემოტანა</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    ემისიდან გავლილი საგნების შემოტანა მარტივად არის შესაძლებელი.
                </DialogContentText>
                <DialogContentText>
                    1. შევდივართ ემისზე
                </DialogContentText>
                <DialogContentText>
                    2. გადავდივართ ნიშნების ფურცელზე
                </DialogContentText>
                <DialogContentText>
                    3. ვაკოპირებთ ტექსტს მთლიანად (CTRL+A, CTRL+C)
                </DialogContentText>
                <DialogContentText>
                    4. დაკოპირებული ტექსტი შეგვყავს მოცემულ ველში (CTRL+V)
                </DialogContentText>
                <TextField
                    className={classes.root}
                    fullWidth
                    focused
                    margin="dense"
                    label="შეიყვანეთ ტექსტი აქ"
                    size="small"
                    variant="outlined"
                    spellCheck="false"
                    InputProps={{
                        ref: textRef,
                        classes: {
                            root: classes.cssOutlinedInput,
                            notchedOutline: classes.notchedOutline
                        }
                    }}
                    InputLabelProps={{
                        classes: {
                            root: classes.cssLabel,
                            shrink: classes.cssShrunk
                        }
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>
                    გამოსვლა
                </Button>
                <Button onClick={() => props.handleSubmit(textRef.current.firstElementChild.value)}>
                    დადასტურება
                </Button>
            </DialogActions>
        </Dialog>
    );
}