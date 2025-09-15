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
/**
### assertSameType
> Throws if actual's type is not the same as expected's, according to a strict `typeof` comparison.

#### Parametres
| name | type | description |
| --- | --- | --- |
| actual | any | The actual value.  |
| expected | any | The expected value.  |
| message | string | A custom message for the assertion. \[default: ''\] |

#### Throws
| code | type | condition |
| --- | --- | --- |
| 'ERR_ASSERTION_SAMETYPE' | AssertionError | Thrown if `typeof(actual) !== typeof(expected)`. |

#### History
| version | change |
| --- | --- |
| 0.0.1 | WIP |
*/
function assertSameType( actual, expected, message = '' ){
	// Constants
	const FUNCTION_NAME = 'assertSameType';
	// Variables
	var return_error = null;
	// Function
	if( typeof(actual) !== typeof(expected) ){
		message ??= `Type of 'actual' (${typeof(actual)}) is not the same type as 'expected' (${typeof(expected)}).`;
		return_error = new AssertNS.AssertionError( { message: message, actual: actual, expected: expected, operator: 'SameType' } );
		return_error.code += '_SAMETYPE';
		annotateThis.call( return_error );
		throw return_error;
	}
} // assertSameType
/**
### assertNonstrictNotEqual
> Throws if actual and expected can be coerced to equal one another.

#### Parametres
| name | type | description |
| --- | --- | --- |
| actual | any | The actual value.  |
| expected | any | The expected value.  |
| message, | string | A custom message for the assertion. \[default: ''\] |

#### Throws
| code | type | condition |
| --- | --- | --- |
| 'ERR_ASSERTION_NONSTRICTNOTEQUAL' | AssertionError | Thrown if `actual == expected`. |

#### History
| version | change |
| --- | --- |
| 0.0.1 | WIP |
*/
function assertNonstrictNotEqual( actual, expected, message = '' ){
	// Constants
	const FUNCTION_NAME = 'assertNonstrictNotEqual';
	// Variables
	var return_error = null;
	// Function
	if( actual == expected ){
		message ??= `Value of 'actual' (${actual}) is equal to 'expected' (${expected}).`;
		return_error = new AssertNS.AssertionError( { message: message, actual: actual, expected: expected, operator: 'NonstrictNotEqual' } );
		return_error.code += '_NONSTRICTNOTEQUAL';
		annotateThis.call( return_error );
		throw return_error;
	}
} // assertNonstrictNotEqual
/**
### assertStrictlyNotEqual
> Throws if actual is not the same type as expected or is the value as expected.

#### Parametres
| name | type | description |
| --- | --- | --- |
| actual | any | The actual value.  |
| expected | any | The expected/invalid value.  |
| name | string | The name of variable as a string, for a more informative auto message. \[default: ''\] |
| value | string | The expected value as a string, for a more informative auto message. \[default: ''\] |
| expectedType | string | The expected's type as a string, for a more informative auto message. \[default: ''\] |
| message | string | A custom message for the assertion. \[default: ''\] |

#### Throws
| code | type | condition |
| --- | --- | --- |
| 'ERR_ASSERTION_STRICTLYNOTEQUAL' | AssertionError | Thrown if actual is not strictly-not-equal (`=!=`) to expected. |

#### History
| version | change |
| --- | --- |
| 0.0.1 | WIP |
*/
function assertStrictlyNotEqual( actual, expected, name = '', value = '', expectedType = '', message = '' ){
	// Constants
	const FUNCTION_NAME = 'assertStrictlyNotEqual';
	// Variables
	var return_error = null;
	var cause_error = null;
	// Function
	try{
		assertSameType( actual, expected );
		try{
			assertNonstrictNotEqual( actual, expected );
		} catch( error ){
			cause_error = error;
			message ??= `${name ?? 'Value'} must not be equal to ${value ?? expected}.`;
		}
	} catch( error ){
		cause_error = error;
		message ??= `${name ?? 'Type of \'actual\''} must be the same type as ${value ?? expected} (${expectedType ?? typeof(expected)}).`;
	}
	if( cause_error ){
		return_error = new AssertNS.AssertionError( { message: message, actual: actual, expected: expected, operator: 'StrictlyNotEqual' } );
		return_error.code += '_STRICTLYNOTEQUAL';
		return_error.cause = cause_error;
		annotateThis.call( return_error );
		throw return_error;
	}
} // assertStrictlyNotEqual
/**
### assertInstanceof
> Throws if actual is not an instance of (via `instanceof`) of expected.

#### Parametres
| name | type | description |
| --- | --- | --- |
| actual | any | The actual value.  |
| expected | any | The expected value.  |
| message | string | A custom message for the assertion. \[default: ''\] |

#### Throws
| code | type | condition |
| --- | --- | --- |
| 'ERR_ASSERTION_INSTANCEOF' | AssertionError | Thrown if actual is not an instance of expected. |

#### History
| version | change |
| --- | --- |
| 0.0.1 | WIP |
*/
function assertInstanceof( actual, expected, message = '' ){
	// Constants
	const FUNCTION_NAME = 'assertInstanceof';
	// Variables
	var return_error = null;
	// Function
	if( !( actual instanceof expected ) ){
		message ??= `${variable_name ?? 'Actual'} is not an instance of ${constructor_name ?? 'expected'}.`;
		return_error = new AssertNS.AssertionError( { message: message, actual: actual, expected: expected, operator: 'Instanceof' } );
		return_error.code += '_INSTANCEOF';
		annotateThis.call( return_error );
		throw return_error;
	}
} // assertInstanceof
/**
### assertExpectedError
> Throws if the actual error doesn't match the the object describe in expected.

#### Parametres
| name | type | description |
| --- | --- | --- |
| actual | any | The actual error.  |
| expected | any | An object with a the properties 'constructor' with the constructor function used to create the error and 'code' the expected code property of the error.  |
| message | string | A custom message for the assertion. \[default: ''\] |

#### Throws
| code | type | condition |
| --- | --- | --- |
| 'ERR_ASSERTION_EXPECTEDERROR' | AssertionError | Thrown if actual doesn't match the error described by expected. |

#### History
| version | change |
| --- | --- |
| 0.0.1 | WIP |
*/
function assertExpectedError( actual, expected, message = '' ){
	// Constants
	const FUNCTION_NAME = 'assertExpectedError';
	// Variables
	var return_error = null;
	var cause_error = null;
	// Function
	try{
		assertInstanceof( actual, expected.constructor, 'Error \'actual\' ', expected.constructor_string ?? 'expected.constructor' );
		try{
			AssertNS.strictEqual( actual.code, expected.code );
		} catch( error ){
			cause_error = error;
		}
	} catch( error ){
		cause_error = error;
	}
	if( cause_error ){
		return_error = new AssertNS.AssertionError( { message: `'actual' didn't match the error specified by the 'expected'. Cause: ${cause_error.message}`, actual: actual, expected: expected, operator: 'ExpectedError' } );
		return_error.code += '_EXPECTEDERROR';
		return_error.cause = cause_error;
		annotateThis.call( return_error );
		throw return_error;
	}
} // assertExpectedError
/**
### assertObjectsQuantitativelyEqual
> Throws if actual doesn't have the same properties and values as expected. Compared via [lodash's `_.isEqual`](https://lodash.com/docs/4.17.15#isEqual).

#### Parametres
| name | type | description |
| --- | --- | --- |
| actual | any | The actual object.  |
| expected | any | The expected object.  |
| message | string | A custom message for the assertion. \[default: ''\] |

#### Throws
| code | type | condition |
| --- | --- | --- |
| 'ERR_ASSERTION_OBJECTSQUANTITATIVELYEQUAL' | AssertionError | Thrown if `_.isEqual( actual, expected )` is not true. |

#### History
| version | change |
| --- | --- |
| 0.0.1 | WIP |
*/
function assertObjectsQuantitativelyEqual( actual, expected, message = '' ){

	// Constants
	const FUNCTION_NAME = 'assertObjectsQuantitativelyEqual';
	// Variables
	var return_error = null;
	// Function
	if( !_.isEqual( actual, expected ) ){
		message ??= `'actual' object (${inspThis.call( actual )}) doesn't strictly match 'expected' object (${inspThis.call( expected )}).`;
		return_error = new AssertNS.AssertionError( { message: message, actual: actual, expected: expected, operator: 'ObjectsQuantitativelyEqual' } );
		return_error.code += '_OBJECTSQUANTITAIVELYEQUAL';
		annotateThis.call( return_error );
		throw return_error;
	}
} // assertObjectsQuantitativelyEqual
/**
### assertNullOrFunction
> Throws if actual is neither `null` nor a function.

#### Parametres
| name | type | description |
| --- | --- | --- |
| actual | any | The actual object.  |
| message | string | A custom message for the assertion. \[default: ''\] |

#### Throws
| code | type | condition |
| --- | --- | --- |
| 'ERR_ASSERTION_NULLORFUNCTION' | AssertionError | Thrown if actual is neither `null` nor a function. |

#### History
| version | change |
| --- | --- |
| 0.0.1 | WIP |
*/
function assertNullOrFunction( actual, message = '' ){
	// Constants
	const FUNCTION_NAME = 'assertNullOrFunction';
	// Variables
	var return_error = null;
	// Function
	if( actual != null && typeof(actual) !== 'function' ){
		message ??= `'actual' (${inspThis.call( actual )}) is neither null nor a function.`;
		return_error = new AssertNS.AssertionError( { message: message, actual: actual, expected: expected, operator: 'NullOrFunction' } );
		return_error.code += '_NULLORFUNCTION';
		annotateThis.call( return_error );
		throw return_error;
	}
} // assertNullOrFunction

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
	},
	assertNullOrFunction: {
		value: assertNullOrFunction,
		enumerable: true
	}
} );

export default NAMESPACE;

// cno-assert.js EOF

