Instructions:
-ensure node and NPM are installed
-go to the directory using the command line.
-type 'npm install' to  ensure you have all package dependencies

-test the script using a single string or file in the directory.
-commands:
-to test a single string: 
node match.js -s (string), 
i.e. node match.js -s rttr (should return true) 
      node.match.js -s [rttr] (should return false 

-to run the matcher for a file:
node match.js -f <filename>
i.e. node match.js -f sample1.txt (prints to console the list of strings that match, then number of lines that match)