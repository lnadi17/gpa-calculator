function convertEmisDataIntoJson(data) {
    let jsonCards = [];

    try {
        let scoreTable = data.split(/[\t\n]/);
        scoreTable.forEach((value, index) => {
            if (value.match(/[A-Z]+[0-9]{6}/)) {
                let jsonCard = {};
                scoreTable[index + 1] ? jsonCard.subjectName = scoreTable[index + 1] : jsonCard.subjectName = "";
                scoreTable[index + 4] ? jsonCard.subjectMark = scoreTable[index + 4] : jsonCard.subjectMark = "";
                scoreTable[index + 6] ? jsonCard.subjectCredits = scoreTable[index + 6] : jsonCard.subjectCredits = "";
                jsonCards.push(jsonCard);
            }
        });

        return jsonCards.filter(card => ["A", "B", "C", "D", "E", "F"].includes(card.subjectMark));
    } catch (err) {
        // console.log(err);
        return null;
    }
}

export default convertEmisDataIntoJson;