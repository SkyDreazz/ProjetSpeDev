const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data', 'metadatas.json');

const getMetaData = () => {
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(jsonData);
}


console.log(getMetaData());