const fs = require('fs');
const path = process.argv[2];
const start = parseInt(process.argv[3] || '240', 10);
const end = parseInt(process.argv[4] || (start+30).toString(), 10);
const s = fs.readFileSync(path,'utf8').split('\n');
for(let i=start;i<=end && i<s.length;i++){
  console.log((i+1)+": " + s[i]);
}
