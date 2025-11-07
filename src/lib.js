#!/usr/bin/env node
/**
# [lib.js](src/lib.js)
> `cno-bedrock`: micropackage: a test bed for various small pieces of reusable code.

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
	import Time from './cno-time.js';
	import Utility from './cno-utility.js';
	import NOOP from './cno-noop.js';
	import deriveOptions from './cno-options.js';
	import Assert from './cno-assert.js';
	//## Standard
	//## External

//# Constants
const FILENAME = 'lib.js';
//## Errors

//# Global Variables
/**## Functions*/
// Utility functions

/**
### isStrictlyNotEqual
> Returns `true` if the a give property `received` is the same type but not the same value as `invalid`.

#### Parametres
| name | type | description |
| --- | --- | --- |
| input_options | object | Run-time options. \[default: {}\] |

##### `options` Properties
| name | type | default | description |
| --- | --- | --- | --- |
| noop | boolean | false | Skip primary functionality. |
| noDefaults | boolean | false | Don't apply static default options. |
| noDynamic | boolean | false | Don't apply dynamic default options. |
| received | object | null | The value to be checked against `invalid`. |
| invalid | object | null | The test condition; same type as that of the expected value in `received` but a different value. |
| code | string | null | The sort of variable/property being checked, used to give more descriptive error messages; should be either 'ARG', 'PROPERTY', or 'RETURN'. |
| name | string | null | The name of the variable/property being checked, used to give more descriptive error messages; dynamically defaults to either 'value' or 'type' depending on which part of operation failed. |
| value | string | null | A string representation of `invalid`, used to give more descriptive error messages; dynamically defaults to `invalid` if not specified. |
| expectedType | string | null | A string representation of the type expected, used to give more descriptive error messages; dynamically defaults to `typeof(invalid)` if not specified. |

#### Returns
| type | description |
| --- | --- |
| boolean | Returns `true` if `received` is the same type but not the same value as `invalid`; throws an descriptive error message otherwise. |

#### Throws
| code | type | condition |
| --- | --- | --- |
| 'ERR_INVALID_TYPE' | TypeError | Thrown if `received` and `invalid` aren't of the same type and `code` is not provided. |
| 'ERR_INVALID_ARG_TYPE' | TypeError | Thrown if `received` and `invalid` aren't of the same type and `code` is given as 'ARG'. |
| 'ERR_INVALID_PROPERTY_TYPE' | TypeError | Thrown if `received` and `invalid` aren't of the same type and `code` is given as 'PROPERTY'. |
| 'ERR_INVALID_RETURN_TYPE' | TypeError | Thrown if `received` and `invalid` aren't of the same type and `code` is given as 'RETURN'. |
| 'ERR_INVALID_VALUE' | Error | Thrown if `received` and `invalid` are an equal value and `code` is not provided. |
| 'ERR_INVALID_ARG_VALUE' | Error | Thrown if `received` and `invalid` are an equal value and `code` is given as 'ARG'. |
| 'ERR_INVALID_PROPERTY_VALUE' | Error | Thrown if `received` and `invalid` are an equal value and `code` is given as 'PROPERTY'. |
| 'ERR_INVALID_RETURN_VALUE' | Error | Thrown if `received` and `invalid` are an equal value and `code` is given as 'RETURN'. |

#### History
| version | change |
| --- | --- |
| 0.0.1 | WIP |
*/
function isStrictlyNotEqual( input_options = {} ){
	const FUNCTION_NAME = 'isStrictlyNotEqual';
	const DEFAULT_OPTIONS = {
		noop: false, // Skip primary functionality.
		noDefaults: false, // Don't apply static default options.
		noDynamic: false, // Don't apply dynamic default options.
		received: null, // The value to be checked against `invalid`.
		invalid: null, // The test condition; same type as that of the expected value in `received` but a different value.
		code: null, // The sort of variable/property being checked, used to give more descriptive error messages; should be either 'ARG', 'PROPERTY', or 'RETURN'.
		name: null, // The name of the variable/property being checked, used to give more descriptive error messages; dynamically defaults to either 'value' or 'type' depending on which part of operation failed.
		value: null, // A string representation of `invalid`, used to give more descriptive error messages; dynamically defaults to `invalid` if not specified.
		expectedType: null, // A string representation of the type expected, used to give more descriptive error messages; dynamically defaults to `typeof(invalid)` if not specified.
		errorCallback: NOOP.returnUndefined
	};// Variables
	//var arguments_array = Array.from(arguments);
	var _return = false;
	var return_error = null;
	this?.logger?.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `received.`});
	// Parametre checks
	if( typeof(input_options) !== 'object' ){
		return_error = new TypeError('Param "input_options" is not of type object.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}

	// Options
	const { logFunction: log_function = this?.logger?.log, validationFunction: validation_function, ...options } = deriveOptions.call( this, input_options, DEFAULT_OPTIONS );
	if( options.noop !== true ){
		// Function
		try{
			Assert.assertStrictlyNotEqual( options.received, options.invalid, options.name, options.value, options.expectedType );
			_return = true;
		} catch( error ){
			options.errorCallback( error );
			_return = false;
		}
	} // noop
	// Return
	this?.logger?.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `returned: ${_return}`});
	return _return;
} // isStrictlyNotEqual
/**
### isNullOrEmpty
> Returns `true` if the a given `input_value` is either an empty string (`''`), `null`, or `undefined`.

#### Parametres
| name | type | description |
| --- | --- | --- |
| input_value | string|object | The value to check. |

#### Returns
| type | description |
| --- | --- |
| boolean | Returns `true` if `input_value` is an empty string, `null`, or `undefined`; `false` otherwise. |

#### History
| version | change |
| --- | --- |
| 0.0.3 | WIP |
*/
function isNullOrEmpty( input_value ){
	const FUNCTION_NAME = 'isNullOrEmpty';
	// Variables
	//var arguments_array = Array.from(arguments);
	var _return = false;
	var return_error = null;
	this?.logger?.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `received.`});
	// Parametre checks
	try{
		Assert.assertIsNullOrEmpty( input_Value );
		_return = true;
	} catch( error ){
		_return = false;
	}
	// Return
	this?.logger?.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `returned: ${_return}`});
	return _return;
} // isNullOrEmpty

// Exports

const NAMESPACE = {};
Object.defineProperties( NAMESPACE, {
	time: {
		value: Time,
		enumerable: true
	},
	utility: {
		value: Utility,
		enumerable: true
	},
	noop: {
		value: NOOP,
		enumerable: true
	},
	assert: {
		value: Assert,
		enumerable: true
	},
	deriveOptions: {
		value: deriveOptions,
		enumerable: true
	},
	isStrictlyNotEqual: {
		value: isStrictlyNotEqual,
		enumerable: true
	},
	isNullOrEmpty: {
		value: isNullOrEmpty,
		enumerable: true
	}
} );

export { NAMESPACE as default, isStrictlyNotEqual, isNullOrEmpty };
export * from './cno-time.js';
export * from './cno-utility.js';
export * from './cno-noop.js';
export * from './cno-options.js';
export * from './cno-assert.js';

// lib.js EOF

