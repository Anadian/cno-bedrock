#!/usr/bin/env node
/**
# [cno-assert.js](src/cno-assert.js)
> Custom assert functions.

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
	import { annotateThis } from './cno-utility.js'
	//## Standard
	import AssertNS from 'node:assert/strict';
	//## External
	import _ from 'lodash';
//# Constants
const FILENAME = 'cno-assert.js';
//## Errors

//# Global Variables
/**## Functions*/
function assertSameType( actual, expected, message = ''){
	var return_error = null;
	if( typeof(actual) !== typeof(expected) ){
		message ??= `Type of 'actual' (${typeof(actual)}) is not the same type as 'expected' (${typeof(expected)}).`;
		return_error = new AssertNS.AssertionError( { message: message, actual: actual, expected: expected, operator: 'SameType' } );
		return_error.code += '_SAMETYPE';
		annotateThis.call( return_error );
		throw return_error;
	}
}
function assertNonstrictNotEqual( actual, expected, message = '' ){
	var return_error = null;
	if( actual == expected ){
		message ??= `Value of 'actual' (${actual}) is equal to 'expected' (${expected}).`;
		return_error = new AssertNS.AssertionError( { message: message, actual: actual, expected: expected, operator: 'NonstrictNotEqual' } );
		return_error.code += '_NONSTRICTNOTEQUAL';
		annotateThis.call( return_error );
		throw return_error;
	}
}
function assertStrictlyNotEqual( actual, invalid, name = null, value = null, expectedType = null, message = '' ){
	var return_error = null;
	var cause_error = null;
	try{
		assertSameType( actual, invalid );
		try{
			assertNonstrictNotEqual( actual, invalid );
		} catch( error ){
			cause_error = error;
			message ??= `${name ?? 'Value'} must not be equal to ${value ?? invalid}.`;
		}
	} catch( error ){
		cause_error = error;
		message ??= `${name ?? 'Type of \'actual\''} must be the same type as ${value ?? invalid} (${expectedType ?? typeof(invalid)}).`;
	}
	if( cause_error ){
		return_error = new AssertNS.AssertionError( { message: message, actual: actual, expected: invalid, operator: 'StrictlyNotEqual' } );
		return_error.code += '_STRICTLYNOTEQUAL';
		return_error.cause = cause_error;
		annotateThis.call( return_error );
		throw return_error;
	}
}
function assertInstanceof( actual, expected, variable_name = '', constructor_name = '', message = '' ){
	var return_error = null;
	if( !( actual instanceof expected ) ){
		message ??= `${variable_name ?? 'Actual'} is not an instance of ${constructor_name ?? 'expected'}.`;
		return_error = new AssertNS.AssertionError( { message: message, actual: actual, expected: expected, operator: 'Instanceof' } );
		return_error.code += '_INSTANCEOF';
		annotateThis.call( return_error );
		throw return_error;
	}
}
function assertExpectedError( actual_error, expected_object, message = '' ){
	var return_error = null;
	var cause_error = null;
	try{
		assertInstanceof( actual_error, expected_object.constructor, 'Error \'actual\' ', expected_object.constructor_string ?? 'expected_object.constructor' );
		try{
			AssertNS.strictEqual( actual_error.code, expected_object.code );
		} catch( error ){
			cause_error = error;
		}
	} catch( error ){
		cause_error = error;
	}
	if( cause_error ){
		return_error = new AssertNS.AssertionError( { message: `'actual_error' didn't match the error specified by the 'expected_object'. Cause: ${cause_error.message}`, actual: actual_error, expected: expected_object, operator: 'ExpectedError' } );
		return_error.code += '_EXPECTEDERROR';
		return_error.cause = cause_error;
		annotateThis.call( return_error );
		throw return_error;
	}
}
function assertObjectsQuantitativelyEqual( actual, expected, message = '' ){
	var return_error = null;
	if( !_.isEqual( actual, expected ) ){
		message ??= `'actual' object (${inspThis.call( actual )}) doesn't strictly match 'expected' object (${inspThis.call( expected )}).`;
		return_error = new AssertNS.AssertionError( { message: message, actual: actual, expected: expected, operator: 'ObjectsQuantitativelyEqual' } );
		return_error.code += '_OBJECTSQUANTITAIVELYEQUAL';
		annotateThis.call( return_error );
		throw return_error;
	}
}

const NAMESPACE = { ...AssertNS };
Object.defineProperties( NAMESPACE, {
	assertSameType: {
		value: assertSameType,
		enumerable: true
	},
	assertNonstrictNotEqual: {
		value: assertNonstrictNotEqual,
		enumerable: true
	},
	assertStrictlyNotEqual: {
		value: assertStrictlyNotEqual,
		enumerable: true
	},
	assertInstanceof: {
		value: assertInstanceof,
		enumerable: true
	},
	assertExpectedError: {
		value: assertExpectedError,
		enumerable: true
	},
	assertObjectsQuantitativelyEqual: {
		value: assertObjectsQuantitativelyEqual,
		enumerable: true
	}
} );

export default NAMESPACE;

// cno-assert.js EOF

