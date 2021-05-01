import {freeuniData, agruniData} from "./EmisData";

function convertEmisDataIntoJson(data, isFreeuni) {
    let jsonCards = [];

    const emisData = isFreeuni ? freeuniData : agruniData;

    try {
        // This only works if the whole page is copied (as instructed)
        let scoreTable = data.split(/[\t\n]/);
        scoreTable.forEach((value, index) => {
            Object.keys(emisData).forEach((subject) => {
                if (value.replace(/\s+/g, '') === subject.replace(/\s+/g, '')) {
                    let jsonCard = {};
                    value ? jsonCard.subjectName = subject : jsonCard.subjectName = "";
                    scoreTable[index + 3] ? jsonCard.subjectMark = scoreTable[index + 3] : jsonCard.subjectMark = "";
                    scoreTable[index + 5] ? jsonCard.subjectCredits = scoreTable[index + 5] : jsonCard.subjectCredits = "";
                    jsonCards.push(jsonCard);
                }
            });
        });

        return jsonCards.filter(card => ["A", "B", "C", "D", "E", "F"].includes(card.subjectMark));
    } catch (err) {
        console.log(err);
        return null;
    }
}

export default convertEmisDataIntoJson;