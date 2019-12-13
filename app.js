
require('dotenv').config();

const result = dotenv.config()
 
if (result.error) {
  throw result.error
}
 
console.log(result.parsed)
const api_key = process.env.API_KEY;

console.log(api_key);
var date = Date();

new Date().toLocaleTimeString(); // 11:18:48 AM
//---
new Date().toLocaleDateString(); // 11/16/2015
//---
new Date().toLocaleString(); // 11/16/2015, 11:18:48 PM


console.log("\n" + date);