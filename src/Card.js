// import React, {useState} from 'react';
import EditableText from "./EditableText";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
//import Container from '@material-ui/core/Container';
import MaterialCard from '@material-ui/core/Card';
import MaterialCardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import {makeStyles} from '@material-ui/core/styles';
import SelectableText from "./SelectableText";
//import { spacing } from '@material-ui/system';

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        [theme.breakpoints.up('xs')]: {
            backgroundColor: theme.palette.primary.main,
            width: "50%"
        },
        [theme.breakpoints.down('xs')]: {
            backgroundColor: theme.palette.secondary.main,
            width: "100%"
        },
        marginTop: 10,
        marginBottom: 10,
        margin: "auto",
        textAlign: "left",
        maxWidth: "400px"
    },
    cardHeader: {
        padding: 0
    },
    cardContent: {
        padding: "8px",
        "&:last-child": {
            paddingBottom: "8px"
        }
    }
}));

function Card(props) {
    const classes = useStyles();

    const changeHandler = (event, stateChanger) => {
        stateChanger(event.target.value);
    }

    return (
        <MaterialCard className={classes.root} elevation={5}>
            <CardHeader
                className={classes.cardHeader}
                action={<IconButton variant="contained"
                                    className="remove-button"
                                    onClick={() => props.removeButtonHandler()}>
                    <DeleteIcon/>
                </IconButton>
                }
            />
            <MaterialCardContent className={classes.cardContent}>
                <EditableText className="subject-name"
                              label="საგნის დასახელება"
                              text={props.subjectName}
                              changeHandler={(e) => changeHandler(e, props.setSubjectName)}/>
                {/*<EditableText className="subject-mark"*/}
                {/*              label="მიღებული ქულა"*/}
                {/*              text={props.subjectMark}*/}
                {/*              changeHandler={(e) => changeHandler(e, props.setSubjectMark)}/>*/}
                <SelectableText className="subject-mark"
                              label="მიღებული ქულა"
                              text={props.subjectMark}
                              changeHandler={(e) => changeHandler(e, props.setSubjectMark)}/>
                <EditableText className="subject-credits"
                              label="კრედიტების რაოდენობა"
                              text={props.subjectCredits}
                              changeHandler={(e) => changeHandler(e, props.setSubjectCredits)}/>
            </MaterialCardContent>
        </MaterialCard>
    );
}

export default Card;