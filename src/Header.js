import React from 'react';
import {AppBar, fade, InputBase, Paper, Switch, Toolbar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search"
import {matchSorter} from 'match-sorter';
import Autocomplete from "@material-ui/lab/Autocomplete";
import useSwitchStyles from "./SwitchStyles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    gpaPaper: {
        height: '100%'
    },
    gpaText: {
        fontWeight: '700',
        fontSize: '1.4rem',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
            marginRight: theme.spacing(1)
        },
        width: '80%'
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
        width: '20ch',
        [theme.breakpoints.up('sm')]: {
            width: '30ch',
        }
    },
    paper: {
        backgroundColor: 'yellow',
        position: 'relative',
        top: '5px'
    }
}));

function CustomPaper(props) {
    const paperClass = useStyles().paper;
    return <Paper elevation={2} {...props} className={paperClass}/>
}

function Header(props) {
    const classes = useStyles();

    const options = [{name: 'აზმათი'}, {name: 'ლიტხელი'},];
    const filterOptions = (options, {inputValue}) => matchSorter(options, inputValue, {keys: ['name']});
    const switchStyles = useSwitchStyles();

    return (
        <div className={classes.root}>
            <AppBar>
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        GPA Calculator
                    </Typography>
                    <Paper className={classes.gpaPaper}>
                        <Typography className={classes.gpaText} align='center'>
                            3.99
                        </Typography>
                    </Paper>
                    <Switch
                        classes={switchStyles}
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