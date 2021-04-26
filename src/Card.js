import EditableText from "./EditableText";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import MaterialCard from '@material-ui/core/Card';
import MaterialCardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import SelectableText from "./SelectableText";
import React from 'react';
import {withStyles} from "@material-ui/core/styles";

const useStyles = (theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.background.paper,
        [theme.breakpoints.up('xs')]: {
            width: "75%"
        },
        [theme.breakpoints.up('md')]: {
            width: "100%"
        },
        [theme.breakpoints.down('xs')]: {
            width: "100%",
            maxWidth: "400px"
        },
        margin: 'auto',
        textAlign: "left",
    },
    cardHeader: {
        padding: 0,
        marginBottom: "-12px",
    },
    cardContent: {
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
        [theme.breakpoints.down('xs')]: {
            display: 'block'
        },
        padding: "8px",
        paddingTop: 0,
        "&:last-child": {
            paddingBottom: "8px"
        }
    },
    credits: {
        [theme.breakpoints.up('md')]: {
            width: '50%'
        },
    },
    name: {
        //
    },
    mark: {
        [theme.breakpoints.up('md')]: {
            width: '50%',
            marginLeft: '0.15cm',
            marginRight: '0.15cm'
        },
    },
    icon: props => ({
        color: props.isFreeuni ? theme.palette.freeuni.main : theme.palette.agruni.main,
        '&:hover': {
            color: props.isFreeuni ? theme.palette.freeuni.light : theme.palette.agruni.light
        }
    })
});

class Card extends React.Component {
    changeHandler = (event, stateChanger, digitsOnly) => {
        if (!digitsOnly || /^\d+$/.test(event.target.value) || event.target.value === '') {
            stateChanger(event.target.value);
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            JSON.stringify(this.props.style) !== JSON.stringify(nextProps.style) ||
            this.props.provided !== nextProps.provided ||
            this.props.subjectName !== nextProps.subjectName ||
            this.props.subjectCredits !== nextProps.subjectCredits ||
            this.props.subjectMark !== nextProps.subjectMark ||
            this.props.isFreeuni !== nextProps.isFreeuni
        );
    }

    render() {
        const {classes} = this.props;

        // Hack to animate margin size
        const marginStyle = (({marginBottom}) => ({marginBottom}))(this.props.style);
        // Hack to make header unfocusable by pressing tab key
        this.props.provided.dragHandleProps.tabIndex = -1;

        return (
            <div {...this.props.provided.draggableProps} ref={this.props.provided.innerRef}
                 style={{...this.props.provided.draggableProps.style, ...marginStyle}}>
                <MaterialCard className={classes.root} elevation={5} style={this.props.style}>
                    <CardHeader
                        {...this.props.provided.dragHandleProps}
                        className={classes.cardHeader}
                        action={
                            <IconButton variant="contained"
                                        className={classes.icon}
                                        onClick={() => this.props.removeButtonHandler()}>
                                <DeleteIcon/>
                            </IconButton>
                        }
                    />
                    <MaterialCardContent className={classes.cardContent}>
                        <EditableText label="საგნის დასახელება"
                                      text={this.props.subjectName}
                                      className={classes.name}
                                      isFreeuni={this.props.isFreeuni}
                                      changeHandler={(e) => this.changeHandler(e, this.props.setSubjectName)}/>
                        <SelectableText label="მიღებული ქულა"
                                        className={classes.mark}
                                        text={this.props.subjectMark}
                                        isFreeuni={this.props.isFreeuni}
                                        changeHandler={(e) => this.changeHandler(e, this.props.setSubjectMark)}/>
                        <EditableText label="კრედიტების რაოდენობა"
                                      text={this.props.subjectCredits}
                                      className={classes.credits}
                                      isFreeuni={this.props.isFreeuni}
                                      digitsOnly={true}
                                      changeHandler={(e) => this.changeHandler(e, this.props.setSubjectCredits, true)}/>
                    </MaterialCardContent>
                </MaterialCard>
            </div>
        );
    }
}

export default withStyles(useStyles)(Card);

