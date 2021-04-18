import React, {useState} from 'react';
import Card from './Card';
import {nanoid} from 'nanoid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import {useTransition, animated} from 'react-spring';
import Box from '@material-ui/core/Box';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    addButton: {
        //
    }
}));

function App() {
    // region Styles
    const classes = useStyles();
    // endregion

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
    // endregion

    // region Animation
    const AnimatedCard = animated(Card);
    const cardsTransition = useTransition(cards, {
        leave: {opacity: 0, maxHeight: '0px', marginBottom: 0, transform: 'scaleY(0)'},
        enter: {opacity: 1, maxHeight: '500px', marginBottom: 10, transform: 'scaleY(1)'},
        from: {opacity: 0, maxHeight: '0px', marginBottom: 10, transform: 'scaleY(0)'},

        onChange: () => {scrollToBottom('auto')},
        onRest: () => {setCardAdded(false)},
        keys: card => card.id
    });
    // endregion

    // region Helper Functions
    const updateCardField = (index, key, value) => {
        const cardsCopy = cards.slice();
        cardsCopy[index] = {...cards[index], [key]: value};
        setCards(cardsCopy);
    }

    const addCard = (subjectName, subjectCredits, subjectMark) => {
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
            return <AnimatedCard style={values}
                                 subjectName={card.subjectName}
                                 setSubjectName={newValue => updateCardField(index, "subjectName", newValue)}
                                 subjectCredits={card.subjectCredits}
                                 setSubjectCredits={newValue => updateCardField(index, "subjectCredits", newValue)}
                                 subjectMark={card.subjectMark}
                                 setSubjectMark={newValue => updateCardField(index, "subjectMark", newValue)}
                                 removeButtonHandler={() => removeButtonHandler(card.id)}/>
        });
    }
    // endregion

    return (
        <div className="app">
            <Box className="cards" m="5%" textAlign="center">
                {getCards()}
                <Button variant="contained" className={classes.addButton} onClick={() => addButtonHandler()}
                        startIcon={<AddIcon/>}>Add card</Button>
            </Box>
        </div>
    );
}

export default App;
