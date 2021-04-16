import React, {useState, useEffect} from 'react';
import Card from './Card';
import {nanoid} from 'nanoid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
//import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    addButton: {
        //
    }

}));

function App() {
    const classes = useStyles();

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

    useEffect(() => {
        scrollToBottom();
        setCardAdded(false);
    }, [cardAdded]);

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
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: behavior
        })
    }

    return (
        <div className="app">
            <Box className="cards" m="5%" textAlign="center">
                {cards.map((value, index) => {
                    return (
                        <Card key={value.id}
                              subjectName={value.subjectName}
                              setSubjectName={(newValue) => updateCardField(index, "subjectName", newValue)}
                              subjectCredits={value.subjectCredits}
                              setSubjectCredits={(newValue) => updateCardField(index, "subjectCredits", newValue)}
                              subjectMark={value.subjectMark}
                              setSubjectMark={(newValue) => updateCardField(index, "subjectMark", newValue)}
                              removeButtonHandler={() => removeButtonHandler(value.id)}/>
                    );
                })}
                <Button variant="contained" className={classes.addButton} onClick={() => addButtonHandler()}
                        startIcon={<AddIcon/>}>Add card</Button>
            </Box>
        </div>
    );
}

export default App;
