import React, {useState} from 'react';
import {AppBar, fade, InputBase, Paper, Switch, Toolbar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search"
import {matchSorter} from 'match-sorter';
import Autocomplete from "@material-ui/lab/Autocomplete";
import useSwitchStyles from "./SwitchStyles";
import {useSpring, animated} from "react-spring";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        backgroundColor: theme.palette.background.paper
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    gpaPaper: {
        height: '100%',
        backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    gpaText: props => ({
        fontWeight: '700',
        fontSize: '1.4rem',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        color: props.isFreeuni ? theme.palette.freeuni.main : theme.palette.agruni.main,
        textShadow: '1px 1px #000000;'
    }),
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
            marginRight: theme.spacing(1)
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        // marginLeft: theme.spacing(1),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        display: 'flex'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        width: '15ch',
        [theme.breakpoints.up('sm')]: {
            width: '20ch',
        },
        [theme.breakpoints.up('md')]: {
            width: '35ch',
        },
    },
    paper: {
        backgroundColor: theme.palette.background.default,
        position: 'relative',
        top: '5px'
    }
}));

function CustomPaper(props) {
    const paperClass = useStyles().paper;
    return <Paper elevation={2} {...props} className={paperClass}/>
}

const castFloat = (n) => parseFloat(n).toFixed(2);

const AnimatedTypography = animated(Typography);

function Header(props) {
    const classes = useStyles(props);

    const [float, setFloat] = useState(castFloat(props.gpaText));

    const options = [{name: 'აზმათი'}, {name: 'ლიტხელი'},];
    const filterOptions = (options, {inputValue}) => matchSorter(options, inputValue, {keys: ['name']});

    const switchStyles = useSwitchStyles();

    useSpring({
        number: parseFloat(props.gpaText),
        onChange({value}) {
            setFloat(castFloat(value.number));
        }
    });


    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        GPA Calculator
                    </Typography>
                    <Paper className={classes.gpaPaper}>
                        {props.gpaText ? (
                            <AnimatedTypography className={classes.gpaText} align='center'>
                                {float}
                            </AnimatedTypography>)
                            : null}
                    </Paper>
                    <Switch
                        classes={switchStyles}
                        onChange={props.switchChangeHandler}
                        // value={props.switchValue}
                    />
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <Autocomplete
                            renderInput={(params) =>
                                <InputBase
                                    ref={params.InputProps.ref}
                                    inputProps={params.inputProps}
                                    placeholder="საგნის მოძებნა…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                />
                            }
                            options={options}
                            getOptionLabel={option => option.name}
                            getOptionSelected={(option, value) => {
                                return option.name === value.name
                            }}
                            noOptionsText="საგანი ვერ მოიძებნა..."
                            filterOptions={filterOptions}
                            PaperComponent={CustomPaper}
                            onChange={props.searchChangeHandler}
                            clearOnEscape
                            clearOnBlur
                            autoHighlight
                        />
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;