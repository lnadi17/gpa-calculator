const fs = require('fs');

let jsonObject = {};

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('data.csv')
});

lineReader.on('line', function (line) {
    let nameAndCredits = line.split(',').slice(0, -1);
    let name = nameAndCredits[0].split('(')[0].split(/\s+/g).join(' ').trim();
    let credits = parseInt(nameAndCredits[1]);
    jsonObject[name] = credits;
});

lineReader.on('close', function() {
    console.log(jsonObject);
});

