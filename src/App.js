import React, {useState} from 'react';
import Card from './Card';
import {nanoid} from 'nanoid';

function App() {
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
        addCard("დისკრეტული მათემატიკა", "6", "ჭ");
    }

    const removeButtonHandler = (id) => {
        removeCard(id)
    }

    return (
        <div className="app">
            <div className="cards">
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
            </div>
            <button className="add-button" onClick={() => addButtonHandler()}>Add card</button>
        </div>
    );
}

export default App;
