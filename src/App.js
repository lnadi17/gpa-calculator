import React, {useEffect, useState} from 'react';
import Card from './Card';
import {nanoid} from 'nanoid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import {useTransition, animated} from 'react-spring';
import Box from '@material-ui/core/Box';
import {makeStyles} from "@material-ui/core/styles";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import Header from "./Header";
import calculateGpa from "./Calculator";

const useStyles = makeStyles(theme => ({
    box: {
        backgroundColor: theme.palette.background.default
    },
    addButton: props => ({
        backgroundColor: props.isFreeuni ? theme.palette.freeuni.main : theme.palette.agruni.main,
        '&:hover': {
            backgroundColor: props.isFreeuni ? theme.palette.freeuni.light : theme.palette.agruni.light
        }
    }),
}));

function App() {
    // region States
    const cardsDefault = [
        {
            "id": nanoid(),
            "subjectName": "აზროვნების მათემატიკური წესი",
            "subjectMark": "A",
            "subjectCredits": "7"
        },
        {
            "id": nanoid(),
            "subjectName": "ლიტერატურა და ხელოვნება",
            "subjectMark": "B",
            "subjectCredits": "5"
        }]

    const [cards, setCards] = useState(cardsDefault);
    const [cardAdded, setCardAdded] = useState(false);
    const [gpaText, setGpaText] = useState('4.00');
    const [isFreeuni, setIsFreeuni] = useState(true);
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
    const AnimatedCard = animated(Card);
    const cardsTransition = useTransition(cards, {
        leave: {opacity: 0, maxHeight: '0px', marginBottom: 0, transform: 'scaleY(0)'},
        enter: {opacity: 1, maxHeight: '500px', marginBottom: 10, transform: 'scaleY(1)'},
        from: {opacity: 0, maxHeight: '0px', marginBottom: 0, transform: 'scaleY(0)'},
        onChange: () => {
            scrollToBottom('auto')
        },
        onRest: () => {
            setCardAdded(false)
        },
        keys: card => card.id
    });
    // endregion

    // region Helper Functions
    const switchChangeHandler = (event) => {
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
        setCardAdded(true);
    }

    const removeButtonHandler = (id) => {
        removeCard(id);
    }

    const scrollToBottom = (behavior = 'smooth') => {
        if (!cardAdded) {
            return;
        }
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: behavior
        });
    }

    const getCards = () => {
        return cardsTransition((values, card, state, index) => {
            return (
                <Draggable key={card.id} draggableId={card.id} index={index}>
                    {(provided, snapshot) => (
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
        addCard(value.name, 7, 'A', true);
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
                        {(provided, snapshot) => (
                            <div {...provided.droppableProps}
                                 ref={provided.innerRef}
                            >
                                {getCards()}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                <Button variant="contained" className={classes.addButton} onClick={() => addButtonHandler()}
                        startIcon={<AddIcon/>}>საგნის დამატება</Button>
            </Box>
        </div>
    );
}

export default App;
