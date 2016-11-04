var XLSX = require('XLSX');
var fs = require('fs');

var path = './files/';
var sheetname = 'SheetJS';

function readFile (filename) {
  var result = {};
  var workbook = XLSX.readFile(path + filename);
  var worksheet = workbook.Sheets[sheetname];
  // console.log(worksheet)
  var rows = worksheet['!ref'].split(':')[1].slice(1) - 1;
  // console.log(rows)
  for (var i = 2; i < rows + 2; i++) {
  	var staff = worksheet['D' + i ].v;
  	var yes = worksheet['F' + i ].v === '满意' ? 1 : 0;
 	// console.log(staff,yes);
 	if(result[staff] == null){
 	  result[staff] = {'count':0,'yes':0};
 	}
 	result[staff].count ++;
 	result[staff].yes += yes;
  }
  // console.log(JSON.stringify(result));
  return result;
}

function readFiles(path, callback) {
  fs.readdir(path, function(err, files) {
  	// console.log(err, files);
  	var result = {};
  	for (var i = files.length - 1; i >= 0; i--) {
  	  var file = readFile(files[i]);
  	  // console.log(JSON.stringify(file));
  	  for(var k in file) {
  	  	if(!result[k]) {
  	  	  result[k] = {'count':0,'yes':0};
  	  	}
  	  	result[k].count += file[k].count;
  	  	result[k].yes += file[k].yes;
  	  }
  	}
  	// console.log('files result',JSON.stringify(result))
  	if(callback) {
  		callback(result);
  	}
  });
}

exports.readFiles = readFiles;