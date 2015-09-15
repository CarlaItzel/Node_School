var fs=require('fs');
var str= fs.readFileSync(process.argv[2]).toString().split('\n').length;
str = str-1;
console.log(str);