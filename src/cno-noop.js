#!/usr/bin/env node
/**
# [cno-noop.js](src/cno-noop.js)
> NOOP functions.

Author: Anadian

Code license: MIT
```
	Copyright 2024 Anadian
	Permission is hereby granted, free of charge, to any person obtaining a copy of this 
software and associated documentation files (the "Software"), to deal in the Software 
without restriction, including without limitation the rights to use, copy, modify, 
merge, publish, distribute, sublicense, and/or sell copies of the Software, and to 
permit persons to whom the Software is furnished to do so, subject to the following 
conditions:
	The above copyright notice and this permission notice shall be included in all copies 
or substantial portions of the Software.
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE 
OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
Documentation License: [![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/)
> The source-code comments and documentation are written in [GitHub Flavored Markdown](https://github.github.com/gfm/).

*/

//# Dependencies
	//## Internal
	//## Standard
	//## External
	import _ from 'lodash';
//# Constants
const FILENAME = 'cno-noop.js';
const { noop } = _;
//## Errors

//# Global Variables
/**## Functions*/
function returnTrue(){
	return true;
}
function returnFalse(){
	return false;
}
function returnNull(){
	return null;
}
const NAMESPACE = {};
Object.defineProperties( NAMESPACE, {
	returnTrue: {
		value: returnTrue,
		enumerable: true
	},
	returnFalse: {
		value: returnFalse,
		enumerable: true
	},
	returnNull: {
		value: returnNull,
		enumerable: true
	},
	returnUndefined: {
		value: noop,
		enumerable: true
	}
} );

export { NAMESPACE as default, returnTrue, returnFalse, returnNull, noop as returnUndefined };

// cno-noop.js EOF

