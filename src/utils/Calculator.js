export default function calculateGpa(cards) {
    const gpaMap = {"A": 4, "B": 3.38, "C": 2.77, "D": 2.16, "E": 1.55, "F": 0}
    const marks = cards.map((card, index) => {
        return [card.subjectMark, card.subjectCredits];
    });
    const filteredMarks = marks.filter((value) => value[0] !== "" && value[1] !== "")
        .map((value) => [gpaMap[value[0]], parseInt(value[1])]);
    let creditsSum = 0;
    let pointsSum = 0;
    for (let i = 0; i < filteredMarks.length; i++) {
        creditsSum += filteredMarks[i][1];
        pointsSum += filteredMarks[i][0] * filteredMarks[i][1];
    }
    const gpa = pointsSum / creditsSum;
    return isNaN(gpa) ? '' : gpa.toFixed(2);
}