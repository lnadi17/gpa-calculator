import EditableText from "./EditableText";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import MaterialCard from '@material-ui/core/Card';
import MaterialCardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import {makeStyles} from '@material-ui/core/styles';
import SelectableText from "./SelectableText";

const useStyles = makeStyles(theme => ({
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
}));

function Card(props) {
    console.log("Updating card");
    const classes = useStyles(props);

    const changeHandler = (event, stateChanger, digitsOnly) => {
        if (!digitsOnly || /^\d+$/.test(event.target.value) || event.target.value === '') {
            stateChanger(event.target.value);
        }
    }

    // Hack to animate margin size
    const marginStyle = (({marginBottom}) => ({marginBottom}))(props.style);
    // Hack to make header unfocusable by pressing tab key
    props.provided.dragHandleProps.tabIndex = -1;

    return (
        <div {...props.provided.draggableProps} ref={props.provided.innerRef}
             style={{...props.provided.draggableProps.style, ...marginStyle}}>
            <MaterialCard className={classes.root} elevation={5} style={props.style}>
                <CardHeader
                    {...props.provided.dragHandleProps}
                    className={classes.cardHeader}
                    action={
                        <IconButton variant="contained"
                                    className={classes.icon}
                                    onClick={() => props.removeButtonHandler()}>
                            <DeleteIcon/>
                        </IconButton>
                    }
                />
                <MaterialCardContent className={classes.cardContent}>
                    <EditableText label="საგნის დასახელება"
                                  text={props.subjectName}
                                  className={classes.name}
                                  isFreeuni={props.isFreeuni}
                                  changeHandler={(e) => changeHandler(e, props.setSubjectName)}/>
                    {/*<EditableText className="subject-mark"*/}
                    {/*              label="მიღებული ქულა"*/}
                    {/*              text={props.subjectMark}*/}
                    {/*              changeHandler={(e) => changeHandler(e, props.setSubjectMark)}/>*/}
                    <SelectableText label="მიღებული ქულა"
                                    className={classes.mark}
                                    text={props.subjectMark}
                                    isFreeuni={props.isFreeuni}
                                    changeHandler={(e) => changeHandler(e, props.setSubjectMark)}/>
                    <EditableText label="კრედიტების რაოდენობა"
                                  text={props.subjectCredits}
                                  className={classes.credits}
                                  isFreeuni={props.isFreeuni}
                                  digitsOnly={true}
                                  changeHandler={(e) => changeHandler(e, props.setSubjectCredits, true)}/>
                </MaterialCardContent>
            </MaterialCard>
        </div>
    );
}

export default Card;
