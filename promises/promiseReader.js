/*wrapped_reader.js
Modification to lecture 6 reader.js to return a Promise object.
Jake Levy
Sept 2020
Modified: Oct 2020
*/
var fs = require('fs');

var opts = {encoding:"utf8", flag: 'r'};

//To turn a standard function that accepts a callback into a Promise,
//simply wrap it inside a Promise constructor and return the new Promise
function wrapper( fileName){
    return new Promise( function( resolve, reject){
	fs.readFile(fileName, opts, function(err, data){
            if (err){ return reject(err); }
	    resolve(data);
	});
    });
}

function noErr(data){
    console.log("Loaded");
    var configData = JSON.parse(data);
    
    for( property in configData){
	console.log(` ${property} : ${configData[property]}`);
    }
}

let promise = wrapper('config.txt');
promise.then(noErr, console.log);
