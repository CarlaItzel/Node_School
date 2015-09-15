
var mymodule = require('C:/Users/CarlaItzel/Documents/FIMEE/schoolsolutions/Learnyounode/modulo.js');

mymodule(process.argv[2], process.argv[3], function (error, data) {

	data.forEach(function (file) {
		
		console.log(file);
	});
});