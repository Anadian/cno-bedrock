#!/usr/bin/env node
/**
# [cno-time.js](src/cno-time.js)
> `cno-time`: A micropackage with time-related utilities.

Author: Anadian

Code license: MIT
```
	Copyright 2025 Anadian
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
	import deriveOptions from 'cno-options.js';
	//## Standard
	//## External
	import MathJS from 'mathjs';
//# Constants
const FILENAME = 'cno-time.js';
/* const DURATION_UNITS = {
	year: {
		units: [ 'yr', 'a' ],
		duration: 31557600 // 60*60*24*365.25
	},
	week: {
		units: [ 'wk', 'w' ],
		duration: 604800 //60*60*24*7
	},
	day: {
		units: [ 'd' ],
		duration: 86400 //60*60*24
	},
	hour: {
		units: [ 'hr', 'h' ],
		duration: 3600 //60*60
	},
	minute: {
		units: [ 'min', 'm' ],
		duration: 60
	},
	second: {
		units: [ 's' ],
		duration: 1 //just for consistency
	},
	jiffy: {
		units: [ 'j', 'f' ],
		duration: 1/60
	}
}; */
	
//## Errors

//# Global Variables
/**## Functions*/
function getNowISO(){
	var _return = new Date();
	return _return.toISOString();
}
function getDateFromUnixTimestamp( unix_timestamp ){
	var _return = new Date( unix_timestamp * 1000 );
	return _return;
}
function getISOStringFromUnixTimestamp( unix_timestamp ){
	return getDateFromUnixTimestamp( unix_timestamp ).toISOString();
}
/**
### Clock
> Creates a new clock object.

#### Parametres
| name | type | description |
| --- | --- | --- |
| input_options | object | Run-time options. \[default: {}\] |

##### `options` Properties
| name | type | default | description |
| --- | --- | --- | --- |
| getFunction | function | process.hrtime.bigint | The function to use to get the current timestamp. |
| granularity | number | 0.000000001 | A number representing the precision of the clock get function relative to seconds. |

#### Returns
| type | description |
| --- | --- |
| object | Returns the new Clock object. |

#### Throws
| code | type | condition |
| --- | --- | --- |
| 'ERR_INVALID_ARG_TYPE' | TypeError | Thrown if a given argument isn't of the correct type. |

#### History
| version | change |
| --- | --- |
| 0.0.1 | WIP |
*/
function Clock( input_options = {} ){
	if( !new.target ){
		return new Clock(input_options, );
	}
	const FUNCTION_NAME = 'Clock';
	const DEFAULT_OPTIONS = {
		getFunction: process.hrtime.bigint, // The function to use to get the current timestamp.
		granularity: 0.000000001, // A number representing the precision of the clock get function relative to seconds.
	};// Variables
	var _return = null;
	var return_error = null;
	var options = {};
	// Parametre checks
	if( typeof(input_options) !== 'object' ){
		return_error = new TypeError('Param "input_options" is not of type object.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}

	// Options
	var { options, log_function = this?.logger?.log, validation_function } = deriveOptions( input_options, DEFAULT_OPTIONS );
	if( validation_function( options ) === true ){
		if( options.noop !== true ){
			// Function
		} // noop
	} // validation_function
	// Return
	this?.logger?.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `returned: ${_return}`});
	return _return;
} // Clock

// Benmark
function Benchmark( options = null ){
	if( !(this instanceof Benchmark) ){
		return new Benchmark( options );
	}
	this.clock ??= options.clock ?? new Clock();
	this.now ??= options.now ?? this.clock.getFunction;
	this.granularity ??= options.granularity ?? this.clock.granularity;
	this.marks ??= options.marks ?? 0;
	this.intervals ??= options.intervals ?? 0;
	this.markArray ??= options.mark_array ?? [];
	this.duration ??= options.duration ?? 0;
	return this;
}
Benchmark.prototype.begin = function(){
	this.markArray = [];
	this.marks = 1;
	this.markArray.push( this.now() );
}
Benchmark.prototype.mark = function(){
	this.markArray.push( this.now() );
	this.marks++;
}
Benchmark.prototype.end = function(){
	this.mark();
	this.intervals = this.marks - 1;
	this.duration = this.markArray[this.intervals] - this.markArray[0];
}
Benchmark.prototype.getIntervals = function(){
	var _return = [];
	for( var i = 0; i < this.intervals; i++ ){
		_return.push( this.markArray[i+1] - this.markArray[i] );
	}
	return _return;
}
// Duration
/**
### getStringFromDurationOptions
> Returns a formatted string depending on the options specified.

#### Parametres
| name | type | description |
| --- | --- | --- |
| input_options | object | Run-time options. \[default: {}\] |

##### `options` Properties
| name | type | default | description |
| --- | --- | --- | --- |
| duration | number | Number.NaN | The duration; assumed to be in seconds unless `base` is specified. |
| seconds_per_unit | number | 1 | The base of scale for `duration`; for example: `1` mean duration is specified in seconds, `0.001` means duration is in milliseconds, `60` means duration is in minutes. |
| units_per_second | number | 1 | The inverse of `seconds_per_unit` which can also be used to derive `seconds_per_unit` via taking the reciprocal (1/`units_per_second`); ignored if `seconds_per_unit` is specified. |
| units | string|boolean | "\u205f" | A string to place between a number and its unit or a non-truthy value to omit units entirely from the formatted string. |
| separator | string|boolean | "\u2005" | A string to put between each order of magnitude or a non-truthy value to omit separation altogether. |
| applied_units | object | { hours: 'h', minutes: 'min', seconds: 's' } | An object whose properties indicate which units should be included with the property value indicating a preferred unit symbol. See [MathJS](https://mathjs.org/docs/datatypes/units.html#reference) for available units. |

#### Returns
| type | description |
| --- | --- |
| string | The formatted duration string. |

#### Throws
| code | type | condition |
| --- | --- | --- |
| 'ERR_INVALID_ARG_TYPE' | TypeError | Thrown if a given argument isn't of the correct type. |

#### History
| version | change |
| --- | --- |
| 0.0.1 | WIP |
*/
function getStringFromDurationOptions( input_options = {} ){

	const FUNCTION_NAME = 'getStringFromDurationOptions';
	const DEFAULT_OPTIONS = {
		duration: Number.NaN, // The duration; assumed to be in seconds unless `base` is specified.
		seconds_per_unit: 1, // The base of scale for `duration`; for example: `1` mean duration is specified in seconds, `0.001` means duration is in milliseconds, `60` means duration is in minutes.
		units_per_second: 1, // The inverse of `seconds_per_unit` which can also be used to derive `seconds_per_unit` via taking the reciprocal (1/`units_per_second`); ignored if `seconds_per_unit` is specified.
		units: "\u205f", // A string to place between a number and its unit or a non-truthy value to omit units entirely from the formatted string.
		separator: "\u2005", // A string to put between each order of magnitude or a non-truthy value to omit separation altogether.
		applied_units: { hours: 'h', minutes: 'min', seconds: 's' }, // An object whose properties indicate which units should be included with the property value indicating a preferred unit symbol. See [MathJS](https://mathjs.org/docs/datatypes/units.html#reference) for available units.
	};// Variables
	var _return = null;
	var return_error = null;
	var options = {};
	// Parametre checks
	if( typeof(input_options) !== 'object' ){
		return_error = new TypeError('Param "input_options" is not of type object.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}

	// Options
	var { options, log_function = this?.logger?.log, validation_function } = deriveOptions( input_options, DEFAULT_OPTIONS, ( options ) => {
		if( !Number.isFinite( options.seconds_per_unit ) ){
			if( Number.isFinite( options.units_per_second ) ){
				options.seconds_per_unit = 1/options.units_per_second;
			}
		}
		return options;
	} );
	if( validation_function( options ) === true ){
		if( options.noop !== true ){
			// Function
			var working_duration = options.duration * options.seconds_per_unit;
		} // noop
	} // validation_function
	// Return
	this?.logger?.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `returned: ${_return}`});
	return _return;
} // getStringFromDurationOptions


/**
### Duration
> Constructs a new duration object.

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
| toStringFunction | function | null | The function to use for stringifying the duration object; dynamically defaults depending on the value of `stringStyleEnum`. |
| stringStyleEnum | STRING_STYLE_ENUM:number | STRING_STYLE_ENUM.CONCISE_TEXT | Determines how the duration will be stringified; see [STRING_STYLE_ENUM](#STRING_STYLE_ENUM). |
| setFromSecondsFunction | function | null | A function to be used for setting the value of the duration object. |

#### Returns
| type | description |
| --- | --- |
| Duration:object | The created instance. |

#### Throws
| code | type | condition |
| --- | --- | --- |
| 'ERR_INVALID_ARG_TYPE' | TypeError | Thrown if a given argument isn't of the correct type. |

#### History
| version | change |
| --- | --- |
| 0.0.1 | WIP |

function Duration( input_options = {} ){
	if( !new.target ){
		return new Duration( input_options );
	}
	const FUNCTION_NAME = 'Duration';
	const DEFAULT_OPTIONS = {
		noop: false, // Skip primary functionality.
		noDefaults: false, // Don't apply static default options.
		noDynamic: false, // Don't apply dynamic default options.
		logFunction: null,
		validationFunction: null,
		toStringFunction: null, // The function to use for stringifying the duration object; dynamically defaults depending on the value of `stringStyleEnum`.
		stringStyleEnum: STRING_STYLE_ENUM.CONCISE_TEXT, // Determines how the duration will be stringified; see [STRING_STYLE_ENUM](#STRING_STYLE_ENUM).
		setFromSecondsFunction: null, // A function to be used for setting the value of the duration object.
		deltaSeconds: 0,
		year: 0,
		day: 0,
		hour: 0,
		minute: 0,
		second: 0,
		zeroDate: null,
		oneDate: null
	};// Variables
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
	Object.defineProperties( {
		seconds: {
			get(){
				return this.deltaSeconds;
			},
			set( seconds ){
				this.setFromSeconds( seconds );
			}
		},
		unitObject: {
			get(){
				var unit_entries = Object.entries( this.usedUnits );
				var sorted_units = this.usedUnits.toSorted( ( a, b ) => {


	} );
	// Options
	var { options, log_function, validation_function } = Bedrock.deriveOptions( input_options, DEFAULT_OPTIONS );
	if( validation_function( options ) ){
		if( options.noop !== true ){
			// Function
		} // noop
	}
	// Return
	log_function({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `returned: ${_return}`});
	return _return;
} // Duration

function Duration( input_options ){ //In static languages it'd be Duration<u64|f64>()
	if( !( this instanceof Duration ) ){
		return new Duration( input_options );
	}
	const DEFAULT_OPTIONS = {
		toStringFunction: null,
		stringStyleEnum: STRING_STYLE_ENUM.CONCISE_TEXT
	};
	return this;
}
Duration.isDuration = function( input_object ){
	//if( CNOMath.isNonNegativeReal( input_object.year ) )
}
Duration.createFromSeconds = function( seconds ){
	var remaining_duration = seconds;
	var duration = new Duration();
	for( const unit_key of Object.keys(this.usedUnits) ){
		const unit = this.usedUnits[unit_key];
		if( remaining_duration >= unit.duration ){
			const quotient = remaining_duration / unit.duration;
			this[unit_key] = Math.floor( quotient );
			remaining_duration = (quotient - this[unit_key]) * unit.duration;
		} else{
			this[unit_key] = 0;
		}
	}
}
Duration.createFromDatetimeDifference = function( difference_date ){
	return Duration.createFromSeconds( difference_date / 1000 );
}
Duration.createFromObject
function getAnnotatedStringFromDuration( duration_s = 0 ){
	*/

const NAMESPACE = {
	getNowISO: getNowISO,
	getDateFromUnixTimestamp: getDateFromUnixTimestamp,
	getISOStringFromUnixTimestamp: getISOStringFromUnixTimestamp,
	Benchmark: Benchmark
};

export { NAMESPACE as default, getNowISO, getDateFromUnixTimestamp, getISOStringFromUnixTimestamp, Benchmark };

// lib.js EOF

