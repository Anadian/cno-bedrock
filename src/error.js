#!/usr/bin/env node

// No-op functions.
function returnTrue(){
	return true;
}
function returnFalse(){
	return false;
}
function returnNull(){
	return null;
}
function strictlyNotEqual_Unsafe( actual, invalid, code = null, name = null, value = null, expectedType = null ){
	var _return = false;
	var return_error = null;
	if( typeof(received) === typeof(invalid) ){
		if( received == invalid ){
			return_error = new Error( `Error: invalid value; ${name ?? 'value'} cannot be ${value ?? invalid}` );
			return_error.code = `ERR_INVALID_${code?code+'_':''}VALUE`;
			throw return_error;
		} else{
			_return = true;
		}
	} else{
		return_error = new TypeError( `Error: ${name ?? 'type'} must be of type '${expectedType ?? typeof(invalid)}'` );
		return_error.code = `ERR_INVALID_${code?code+'_':''}TYPE`;
		throw return_error;
	}
	return _return;
}
/**
### strictlyNotEqual
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
function strictlyNotEqual( input_options = {} ){
	const FUNCTION_NAME = 'strictlyNotEqual';
	const DEFAULT_OPTIONS = {
		noop: false, // Skip primary functionality.
		noDefaults: false, // Don't apply static default options.
		noDynamic: false, // Don't apply dynamic default options.
		received: null, // The value to be checked against `invalid`.
		invalid: null, // The test condition; same type as that of the expected value in `received` but a different value.
		code: null, // The sort of variable/property being checked, used to give more descriptive error messages; should be either 'ARG', 'PROPERTY', or 'RETURN'.
		name: null, // The name of the variable/property being checked, used to give more descriptive error messages; dynamically defaults to either 'value' or 'type' depending on which part of operation failed.
		value: null, // A string representation of `invalid`, used to give more descriptive error messages; dynamically defaults to `invalid` if not specified.
		expectedType: null // A string representation of the type expected, used to give more descriptive error messages; dynamically defaults to `typeof(invalid)` if not specified.
	};// Variables
	var arguments_array = Array.from(arguments);
	var _return = null;
	var return_error = null;
	var options = {};
	this?.logger?.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `received: ${arguments_array}`});
	// Parametre checks
	if( typeof(input_options) !== 'object' ){
		return_error = new TypeError('Param "input_options" is not of type object.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}

	// Options
	if( input_options.noDefaults !== true ){
		if( input_options.noDynamic !== true ){
			var dynamic_defaults = {};
			options = Object.assign( {}, DEFAULT_OPTIONS, dynamic_defaults, input_options );
		} else{
			options = Object.assign( {}, DEFAULT_OPTIONS, input_options );
		} // noDynamic
	} else{
		options = Object.assign( {}, input_options );
	} // noDefaults
	if( options.noop !== true ){
		// Function
		_return = strictlyNotEqual_Unsafe( options.received, options.invalid, options.code, options.name, options.value, options.expectedType );
	} // noop
	// Return
	this?.logger?.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `returned: ${_return}`});
	return _return;
} // strictlyNotEqual
Object.defineProperties( strictlyNotEqual, {
	VAR_TYPES: {
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
} );

const NAMESPACE = {
	unsafe: {
		strictlyNotEqual: strictlyNotEqual_Unsafe
	},
	noop: {
		returnTrue: returnTrue,
		returnFalse: returnFalse,
		returnNull: returnNull
	},
	strictlyNotEqual: strictlyNotEqual
};
export { NAMESPACE as default, strictlyNotEqual };
