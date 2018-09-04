var fs = require('fs');
var readlines = require('n-readlines');

var args = process.argv.slice(2);

//command line stuff
if(args[0] && args[0] == '-s') {

	if(!args[1])
		printUsage();

	console.log(args[1] + ': ' + matchesPattern(args[1]));

} else if (args[0] && args[0] == '-f') {

	if(!args[1])
		printUsage();

	printMatches(args[1]);

} else {
	printUsage();
}

function printUsage() {
	console.log('Usage:');
	console.log('node match.js -s <string>: match a string to the 4-char pattern');
	console.log('node match.js -f <filePath>: print lines and count of all strings in the file that match the 4-char pattern');
}

function printMatches(filePath) {

	//using n-readlines library to read in file synchronously
	var liner = new readlines(filePath);

	var matchCount = 0;
	var next, str;
	while(next = liner.next()) {
		
			str = next.toString();
			if (matchesPattern(str)) {
				console.log(str);
				matchCount++;
			} 
	}

	console.log('Total lines matched: ' + matchCount);
}

/* test cases: 

rttr (true)
[rttr] (false)
aaaa (false)
rttr[rttr] (false)
rttr[rrrr] (true)
aaaa[aaaa] (false)
ommo[srttra] (false)

*/
function matchesPattern(str) {

	var regex = /([A-Za-z])([A-Za-z])\2\1/gm;

	var matchArr;

	var openBracket = false;
	var lastOBSrchIdx = 0;
	
	var found = false;

	var nextCharIdx;
	while ( (matchArr = regex.exec(str)) !== null ) {

		if(matchArr[1] !== matchArr[2]) {
    		
    		//search for open brackets
    		if(!openBracket) {

    		 	if( str.substring(lastOBSrchIdx, matchArr.index).indexOf('[') > -1 ) {
    				openBracket = true;
    			} else {
    				//begin search from char after matched expression
    				lastOBSrchIdx = matchArr.index + 4;
    			}
    		}

    		if(openBracket) {

    			nextCharIdx = matchArr.index + 4;
    			//open bracket previously, search for close bracket ahead
    			if( nextCharIdx < str.length && (str.substring(nextCharIdx).indexOf(']') > -1) ) {
    				//found 4-char pattern enclosed by open and closed square brackets. 
    				//The string is not considered valid if the pattern above exist in square brackets.
    				return false;
    			}
    		}

    		found = true;
    	}
	}

	return found;	
}

