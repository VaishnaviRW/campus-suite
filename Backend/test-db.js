const path = require('path');

const dotenvResult = require('dotenv').config({
  path: path.join(__dirname, '.env')
});

console.log('ENV FILE PATH:', path.join(__dirname, '.env'));
console.log('ENV FILE ERROR:', dotenvResult.error || 'None');
console.log('MONGO_URI EXISTS:', !!process.env.MONGO_URI);