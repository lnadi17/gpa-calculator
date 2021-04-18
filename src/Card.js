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
        [theme.breakpoints.up('xs')]: {
            backgroundColor: theme.palette.primary.main,
            width: "75%"
        },
        [theme.breakpoints.up('md')]: {
            backgroundColor: theme.palette.primary.main,
            width: "100%"
        },
        [theme.breakpoints.down('xs')]: {
            backgroundColor: theme.palette.secondary.main,
            width: "100%",
            maxWidth: "400px"
        },
        margin: 'auto',
        textAlign: "left",
        // maxWidth: "400px"
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
        }
    },
    // name: {
    // },
    mark: {
        [theme.breakpoints.up('md')]: {
            width: '50%',
            marginLeft: '0.15cm',
            marginRight: '0.15cm'
        },
    }
}));

function Card(props) {
    const classes = useStyles();

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
                                    onClick={() => props.removeButtonHandler()}>
                            <DeleteIcon/>
                        </IconButton>
                    }
                />
                <MaterialCardContent className={classes.cardContent}>
                    <EditableText label="საგნის დასახელება"
                                  text={props.subjectName}
                                  // className={classes.name}
                                  changeHandler={(e) => changeHandler(e, props.setSubjectName)}/>
                    {/*<EditableText className="subject-mark"*/}
                    {/*              label="მიღებული ქულა"*/}
                    {/*              text={props.subjectMark}*/}
                    {/*              changeHandler={(e) => changeHandler(e, props.setSubjectMark)}/>*/}
                    <SelectableText label="მიღებული ქულა"
                                    className={classes.mark}
                                    text={props.subjectMark}
                                    changeHandler={(e) => changeHandler(e, props.setSubjectMark)}/>
                    <EditableText label="კრედიტების რაოდენობა"
                                  text={props.subjectCredits}
                                  className={classes.credits}
                                  changeHandler={(e) => changeHandler(e, props.setSubjectCredits, true)}/>
                </MaterialCardContent>
            </MaterialCard>
        </div>
    );
}

export default Card;
