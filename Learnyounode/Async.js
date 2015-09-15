//var fs=require('fs');
//fs.readdir(process.argv[2], 
//        function(err, list)
//        {
//            if(err) throw err;
//            var ext= process.argv[3];
//            var answer = list.filter(function(element)
//            {
//                var len=ext.length+1;
//                return(element.substr(element.length-len, element.length)== '.'+ext);
//            });
//            answer.forEach(function(e)
//            {
//                console.log(e);
//            })
//        });



var fs = require('fs')
var file = process.argv[2]

fs.readFile(file, function (err, contents) {
  // fs.readFile(file, 'utf8', callback) can also be used
  var lines = contents.toString().split('\n').length - 1
  console.log(lines)
})

