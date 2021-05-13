import {freeuniData, agruniData} from "./EmisData";

function convertEmisDataIntoJson(data, isFreeuni) {
    let jsonCards = [];

    const emisData = isFreeuni ? freeuniData : agruniData;

    try {
        let scoreTable = data.split(/[\t\n]/);
        scoreTable.forEach((value, index) => {
            value = value.split(" ").pop();
            Object.keys(emisData).forEach((subject) => {
                if (value === subject) {
                    let jsonCard = {};
                    if (emisData[subject].name) {
                        jsonCard.subjectName = emisData[subject].name;
                    } else if (scoreTable[index + 1]) {
                        jsonCard.subjectName = scoreTable[index + 1];
                    } else {
                        jsonCard.subjectName = "";
                    }

                    scoreTable[index + 4] ? jsonCard.subjectMark = scoreTable[index + 4] : jsonCard.subjectMark = "";

                    if (scoreTable[index + 6]) {
                        jsonCard.subjectCredits = scoreTable[index + 6];
                    } else if (emisData[subject].credits) {
                        jsonCard.subjectCredits = emisData[subject].credits.toString();
                    } else {
                        jsonCard.subjectCredits = "";
                    }

                    jsonCards.push(jsonCard);
                }
            });
        });


        return jsonCards.filter(card => ["A", "B", "C", "D", "E", "F", ""].includes(card.subjectMark));
    } catch (err) {
        console.log(err);
        return null;
    }
}

export default convertEmisDataIntoJson;