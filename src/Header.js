import React from 'react';
import {AppBar, fade, InputBase, Paper, TextField, Toolbar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search"
import {matchSorter} from 'match-sorter';
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
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
        transition: theme.transitions.create('width'),
        width: '30ch',
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

    return (
        <div className={classes.root}>
            <AppBar>
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        GPA Calculator
                    </Typography>
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
                            noOptionsText="საგანი ვერ მოიძებნა..."
                            filterOptions={filterOptions}
                            PaperComponent={CustomPaper}
                        />
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;