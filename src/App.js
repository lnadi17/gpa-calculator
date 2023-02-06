import React, {useEffect, useState} from 'react';
import Card from './Card';
import {nanoid} from 'nanoid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import {animated, useTransition} from 'react-spring';
import Box from '@material-ui/core/Box';
import {makeStyles} from "@material-ui/core/styles";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import Header from "./Header";
import calculateGpa from "./Calculator";
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import EmisDialog from "./EmisDialog";
import emisParser from "./EmisParser";
import {agruniData, freeuniData} from "./EmisData";
import {saveAs} from 'file-saver';
// import XLSX from 'xlsx';
import {Tooltip, Zoom} from "@material-ui/core";

const AnimatedCard = animated(Card);

const useStyles = makeStyles(theme => ({
    box: {
        backgroundColor: theme.palette.background.default
    },
    buttonsRoot: {
        '& > *': {
            margin: '2px',
        }
    },
    addButton: props => ({
        backgroundColor: props.isFreeuni ? theme.palette.freeuni.main : theme.palette.agruni.main,
        '&:hover': {
            backgroundColor: props.isFreeuni ? theme.palette.freeuni.light : theme.palette.agruni.light
        }
    }),
    iconButton: props => ({
        backgroundColor: props.isFreeuni ? theme.palette.freeuni.main : theme.palette.agruni.main,
        '&:hover': {
            backgroundColor: props.isFreeuni ? theme.palette.freeuni.light : theme.palette.agruni.light
        }
    })
}));

function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}

function App() {
    // region States
    const cardsDefault = [
        {
            "id": nanoid(),
            "subjectName": "ფილოსოფია",
            "subjectMark": "F",
            "subjectCredits": "4"
        },
        {
            "id": nanoid(),
            "subjectName": "ლოგიკა",
            "subjectMark": "A",
            "subjectCredits": "4"
        },
        {
            "id": nanoid(),
            "subjectName": "ლიტერატურა და ხელოვნება",
            "subjectMark": "B",
            "subjectCredits": "5"
        },
    ]

    const [cards, setCards] = useState(cardsDefault);
    const [gpaText, setGpaText] = useState('0.00');
    const [isFreeuni, setIsFreeuni] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    // endregion

    // region Styles
    const classes = useStyles({isFreeuni: isFreeuni});
    // endregion

    // region Effects
    useEffect(() => {
        setGpaText(calculateGpa(cards));
    }, [cards])
    // endregion

    // region Animation
    const cardsTransition = useTransition(cards, {
        leave: {opacity: 0, maxHeight: '0px', marginBottom: 0, transform: 'scaleY(0)'},
        enter: {opacity: 1, maxHeight: '500px', marginBottom: 10, transform: 'scaleY(1)'},
        from: {opacity: 0, maxHeight: '0px', marginBottom: 0, transform: 'scaleY(0)'},
        keys: card => card.id
    });
    // endregion

    // region Helper Functions
    const switchChangeHandler = () => {
        setIsFreeuni(!isFreeuni);
    }

    const updateCardField = (index, key, value) => {
        const cardsCopy = cards.slice();
        cardsCopy[index] = {...cards[index], [key]: value};
        setCards(cardsCopy);
    }

    const addCard = (subjectName, subjectCredits, subjectMark, addOnTop = false) => {
        if (addOnTop) {
            setCards([{
                id: nanoid(),
                subjectName: subjectName,
                subjectCredits: subjectCredits,
                subjectMark: subjectMark
            }, ...cards]);
            return;
        }
        setCards([...cards, {
            id: nanoid(),
            subjectName: subjectName,
            subjectCredits: subjectCredits,
            subjectMark: subjectMark
        }]);
    }

    const removeCard = (id) => {
        setCards(cards.filter(card => card.id !== id));
    }

    const addButtonHandler = () => {
        addCard("", "", "");
    }

    const removeButtonHandler = (id) => {
        removeCard(id);
    }

    // const scrollToBottom = (behavior = 'smooth') => {
    //     window.scrollTo({
    //         top: document.body.scrollHeight,
    //         behavior: behavior
    //     });
    // }

    const getCards = () => {
        return cardsTransition((values, card, state, index) => {
            return (
                <Draggable key={card.id} draggableId={card.id} index={index}>
                    {(provided) => (
                        <AnimatedCard style={values}
                                      provided={provided}
                                      subjectName={card.subjectName}
                                      setSubjectName={newValue => updateCardField(index, "subjectName", newValue)}
                                      subjectCredits={card.subjectCredits}
                                      setSubjectCredits={newValue => updateCardField(index, "subjectCredits", newValue)}
                                      subjectMark={card.subjectMark}
                                      isFreeuni={isFreeuni}
                                      setSubjectMark={newValue => updateCardField(index, "subjectMark", newValue)}
                                      removeButtonHandler={() => removeButtonHandler(card.id)}/>
                    )}
                </Draggable>
            )
        });
    }

    const searchChangeHandler = (event, value, reason) => {
        if (reason === 'clear') {
            return;
        }
        addCard(value.name, isFreeuni ? freeuniData[value.name] : agruniData[value.name], '', false);
    }

    const onSubmitHandler = (result) => {
        // Parse and fill
        let newCards = emisParser(result, isFreeuni);
        if (newCards.length !== 0) {
            newCards = newCards.map(card => ({"id": nanoid(), ...card}));
            setCards(newCards);
        }
        setDialogOpen(false);
    }

    const onDragEndHandler = (result) => {
        // Dropped outside the list
        if (!result.destination) {
            return;
        }

        const newCards = reorder(
            cards,
            result.source.index,
            result.destination.index
        );

        setCards(newCards);
    }

    const onDownloadClickHandler = () => {
        // const rows = cards.map(card => [card.subjectName, card.subjectMark, card.subjectCredits]);
        // // let wb = XLSX.utils.book_new();
        // wb.Props = {
        //     Author: "Dante from Devil May Cry series"
        // };
        // wb.SheetNames.push("Scores")
        // // let ws = XLSX.utils.aoa_to_sheet(rows);
        // ws['!cols'] = [{wch: 40}, {wch: 10}, {wch: 10}];
        // wb.Sheets["Scores"] = ws;
        //
        // // let wbOut = XLSX.write(wb, {bookType: 'xlsx', type: 'binary'});
        // saveAs(new Blob([s2ab(wbOut)], {type: "application/octet-stream;charset=UTF-8"}), 'test.xlsx');
    }


    // A little function to help us with reordering the result
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };
    // endregion

    return (
        <div>
            <Header switchChangeHandler={switchChangeHandler} searchChangeHandler={searchChangeHandler}
                    gpaText={gpaText} isFreeuni={isFreeuni}/>
            <Box className={classes.box} m="5%" mt="80px" textAlign="center">
                <DragDropContext onDragEnd={onDragEndHandler}>
                    <Droppable droppableId="droppable">
                        {(provided) => (
                            <div {...provided.droppableProps}
                                 ref={provided.innerRef}
                            >
                                {getCards()}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                <Box className={classes.buttonsRoot}>
                    <Tooltip title="ექსელში დაექსპორტება" enterDelay={500} TransitionComponent={Zoom} arrow>
                        <Button
                            variant="contained"
                            className={classes.iconButton}
                            onClick={onDownloadClickHandler}
                        >
                            <SystemUpdateAltIcon fontSize="small"/>
                        </Button>
                    </Tooltip>
                    <Button variant="contained" className={classes.addButton} onClick={() => addButtonHandler()}
                            startIcon={<AddIcon/>}>საგნის დამატება</Button>
                    <Tooltip title="ნიშნების დაიმპორტება" enterDelay={500} TransitionComponent={Zoom} arrow>
                        <Button
                            variant="contained"
                            className={classes.iconButton}
                            onClick={() => setDialogOpen(true)}
                        >
                            <AllInclusiveIcon fontSize="small"/>
                        </Button>
                    </Tooltip>
                </Box>
            </Box>
            <EmisDialog handleSubmit={onSubmitHandler} isFreeuni={isFreeuni} open={dialogOpen}
                        handleClose={() => setDialogOpen(false)}/>
        </div>
    );
}

export default App;
