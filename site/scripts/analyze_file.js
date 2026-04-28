const fs=require('fs');
const p=process.argv[2];
const s=fs.readFileSync(p,'utf8');
const counts={paren:0,brace:0,bracket:0,less:0,greater:0,backtick:0,quotes:0};
for(const ch of s){ if(ch==='(') counts.paren++; if(ch===')') counts.paren--; if(ch==='{') counts.brace++; if(ch==='}') counts.brace--; if(ch==='[') counts.bracket++; if(ch===']') counts.bracket--; if(ch==='`') counts.backtick++; if(ch==='<') counts.less++; if(ch==='>') counts.greater++; if(ch==="\"") counts.quotes++; }
console.log(JSON.stringify(counts,null,2));
// print last 200 chars for context
console.log('\n--- tail ---\n'+s.slice(-400))
