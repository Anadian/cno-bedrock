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

/*const ERROR_TYPE = {
	VALUE: { constructor: Error, message: 'value', code: 'VALUE' },
	TYPE: { constructor: TypeError, message: 'type', code: 'TYPE' },
	ASSERT: { constructor: AssertNS.AssertionError, message: 'Assertion:', code: 'ASSERTION' },
	AGGREGATE: { constructor: AggregateError, message: 'AggregateError: multiple errors ', code: 'AGGREGATE'}
};
const FAULT_TYPE = {
	RETURN: { constructor: Error, message: 'returned an unexpected value', code: 'RETURN' },
	CATCH: { constructor: Error, message: 'threw an error', code: 'CATCH' },
	REJECT: { constructor: Error, message: 'rejected with', code: 'REJECTION' },
	RECEIVE: { constructor: Error, message: 'received error', code: 'RECEIVED' },
	TIMEOUT: { message: 'process timedout with', code: 'TIMEOUT' },
	CRASH: { message: 'process crashed wtih', code: 'CRASH' }
};
const OPERATOR_TYPE = {
	EQUAL: { message: 'is equal to', code: '==' },
	NOTEQUAL: { message: 'is not equal to', code: '!=' },
	STRICTEQUAL: { message: 'is strictly equal to', code: '===' },
	NOTSTRICTEQUAL: { message: 'is not strictly equal to', code: '!==' },
	STRICTLYNOTEQUAL: { message: 'is strictly not equal to', code: '=!=' },
};
const VARIABLE_TYPE = {
	VARIABLE: { message: 'value', code: '' },
	ARG: { message: 'argument', code: 'ARG' },
	PROPERTY: { message: 'property', code: 'PROPERTY' },
	RETURN: { message: 'return', code: 'RETURN' },
	OBJECT: { message: 'in object', code: 'OBJECT' },
	ARRAY: { message: 'while interating array', code: 'ARRAY' },
	FUNCTION: { message: 'function', code: 'FUNCTION' },
	ASSERT: { message: 'Assertion: ', code: 'ASSERTION' }
};
function createError( arg_error_type, arg_variable_type, name, predicate ){
	var return_error = null;
	var message = '';
	var code = 'ERR_';
	var cause = null;
	const error_type = ERROR_TYPE[arg_error_type];
	const variable_type = VARIABLE_TYPE[arg_variable_type];
	if( arg_error_type === 'ASSERT' ){
		message += 'Assertion: '+predicate.message;
		cause = predicate;
		return_error = new error_type.constructor( { message: message } );
		return_error.cause = predicate;
	} else{
		if( arg_error_type === 'AGGREGATE' && predicate.length > 1 ){
			message += `AggregateError: Multiple errors ${variable_type.message} '${name}'`;
			cause = predicate;
		} else if( arg_error_type === 'VALUE' || arg_error_type === 'TYPE' ){
			code += 'INVALID_';
			message += `Error: invalid ${variable_type.message} ${error_type.message}; ${name} ${predicate}`;
		} else{ // RETURN/CATCH/REJECT/RECEIVE assume name is function and predicate is an error
			message += `Error: ${name} ${error_type.message}: ${predicate}`;
			cause = predicate;
		}
		return_error = new error_type.constructor( message, { cause: cause } );
	}
	code += variable_type.code+'_';
	code += error_type.code;
	return_error.code = code;
	return return_error;
}*/
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
/*Object.defineProperties( strictlyNotEqual, {
	ERROR_CODE_TYPES_ENUM: {
		value: {
			ARG: 'ARG',
			PROPERTY: 'PROPERTY',
			RETURN: 'RETURN'
		},
		properties: {
			configurable: false,
			writable: false
		}
	}
} );*/

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
	}
} );

export { NAMESPACE as default, isStrictlyNotEqual };
export * from './cno-time.js';
export * from './cno-utility.js';
export * from './cno-noop.js';
export * from './cno-options.js';
export * from './cno-assert.js';

// lib.js EOF

