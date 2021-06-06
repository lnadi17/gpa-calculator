const fs = require('fs');

let jsonObject = {};

const data = fs.readFileSync('data.txt', 'utf8');
let jsonParsed = JSON.parse(data).items.list;
let output = {};
jsonParsed.forEach((item, index) => {
    output[item.book_name.split('(')[0].split(/\s+/g).join(' ').trim()] = parseInt(item.credit);
});
console.log(output);
