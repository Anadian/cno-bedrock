#!/usr/bin/env node
/**
# [cno-utility.js](src/cno-utility.js)
> Various utilities for debugging and common tasks.

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
	import getNowISO from './cno-time.js';
	//## Standard
	import { inspect } from 'node:util';
	//## External
	import { nanoid } from 'nanoid';
//# Constants
const FILENAME = 'cno-utility.js';
//## Errors

//# Global Variables
/**## Functions*/
function annotateThis(){
	Object.defineProperties( this, {
		uid: {
			value: nanoid(),
			//configurable: false,
			enumerable: true
			//writable: false
		},
		created: {
			value: getNowISO(),
			enumerable: true
		},
		insp: {
			value: inspThis.bind( this )
		}
	} );
}
function inspThis( options = null ){
	options ??= { depth: 1, maxArrayLength: 16, maxStringLength: 64 };
	return inspect( this, options );
}
/**
### getAnnotatedObject
> Adds some basic information, UID and creation time, to an object; useful for debugging.

#### Parametres
| name | type | description |
| --- | --- | --- |
| input_object | object | The object to add the properties to. \[default: null\] |

#### Returns
| type | description |
| --- | --- |
| object | The freshly-annotated object. |

#### Throws
| code | type | condition |
| --- | --- | --- |
| 'ERR_INVALID_ARG_TYPE' | TypeError | Thrown if a given argument isn't of the correct type. |

#### History
| version | change |
| --- | --- |
| 0.0.1 | WIP |
*/
function getAnnotatedObject( input_object = null ){
	// Constants
	const FUNCTION_NAME = 'getAnnotatedObject';
	// Variables
	var _return = null;
	var return_error = null;
	// Parametre checks
	if( typeof(input_object) !== 'object' ){
		return_error = new TypeError('Param "input_object" is not of type object.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}
	// Function
	_return = Object.assign( {}, input_object );
	annotateThis.call( _return );
	// Return
	this?.logger?.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `returned: ${_return}`});
	return _return;
} // getAnnotatedObject

const NAMESPACE = {};
Object.defineProperties( NAMESPACE, {
	annotateThis: {
		value: annotateThis,
		enumerable: true
	},
	inspThis: {
		value: inspThis,
		enumerable: true
	},
	getAnnotatedObject: {
		value: getAnnotatedObject,
		enumerable: true
	}
} );

export { NAMESPACE as default, annotateThis, inspThis, getAnnotatedObject };

// cno-utility.js EOF

