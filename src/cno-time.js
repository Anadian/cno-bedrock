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
	import deriveOptions from './cno-options.js';
	//## Standard
	//## External
	import * as MathJS from 'mathjs';
//# Constants
const FILENAME = 'cno-time.js';
	
//## Errors

//# Global Variables
/**## Functions*/
/**
### getNowISO
> Returns 'now' as an ISO 8601 string.

#### Returns
| type | description |
| --- | --- |
| string | The ISO8601/RFC3339-formatted string. |

#### History
| version | change |
| --- | --- |
| 0.0.1 | WIP |
*/
function getNowISO(){
	var _return = new Date();
	return _return.toISOString();
} // getNowISO
/**
### getDateFromUnixTimestamp
> Returns a new [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) from a Unix-style millisecond timestamp.

#### Parametres
| name | type | description |
| --- | --- | --- |
| unix_timestamp | number | Timestamp in milliseconds.  |

#### Returns
| type | description |
| --- | --- |
| Date | The new Date object. |

#### History
| version | change |
| --- | --- |
| 0.0.1 | WIP |
*/
function getDateFromUnixTimestamp( unix_timestamp ){
	var _return = new Date( unix_timestamp * 1000 );
	return _return;
} // getDateFromUnixTimestamp
/**
### getISOStringFromUnixTimestamp
> Returns an ISO string from a Unix-style millisecond timestamp.

#### Parametres
| name | type | description |
| --- | --- | --- |
| unix_timestamp | number | Timestamp in milliseconds.  |

#### Returns
| type | description |
| --- | --- |
| string | The ISO8601/RFC3339 string. |

#### History
| version | change |
| --- | --- |
| 0.0.1 | WIP |
*/
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
	var { logFunction: log_function = this?.logger?.log, validationFunction: validation_function, ...options } = deriveOptions( input_options, DEFAULT_OPTIONS );
	if( validation_function( options ) === true ){
		if( options.noop !== true ){
			// Function
			Object.defineProperties( this, {
				getFunction: {
					value: options.getFunction,
					enumerable: true
				},
				granularity: {
					value: options.granularity,
					enumerable: true
				}
			} );
		} // noop
	} // validation_function
	// Return
	this?.logger?.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `returned: ${_return}`});
	return _return;
} // Clock

// Benmark
function Benchmark( options = null ){
	if( !new.target ){
		return new Benchmark( options );
	}
	this.clock ??= options?.clock ?? new Clock();
	this.now ??= options?.now ?? this.clock.getFunction;
	this.granularity ??= options?.granularity ?? this.clock.granularity;
	this.marks ??= options?.marks ?? 0;
	this.intervals ??= options?.intervals ?? 0;
	this.markArray ??= options?.mark_array ?? [];
	this.duration ??= options?.duration ?? 0;
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
| duration | number | Number.NaN | The duration; assumed to be in seconds unless 'duration_unit' is specified. |
| unit_seperator | string|boolean | "\u205f" | A string to place between a number and its unit or a non-truthy value to omit units entirely from the formatted string. |
| split_separator | string|boolean | "\u2005" | A string to put between each order of magnitude or a non-truthy value to omit separation altogether. |
| duration_unit | object\|string | `MathJS.unit('s')` | A valid [MathJS unit object](https://mathjs.org/docs/datatypes/units.html#units) such as the one returned from the `unit` function, or a string to be passed to said function. | 
| split_units | Array | `[ 'h', 'min', 's' ]` | An array to be passed to [`splitUnit`](https://mathjs.org/docs/datatypes/units.html#unitsplitunitparts). See [MathJS](https://mathjs.org/docs/datatypes/units.html#reference) for available units. |

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
		//seconds_per_unit: 1, // The base of scale for `duration`; for example: `1` mean duration is specified in seconds, `0.001` means duration is in milliseconds, `60` means duration is in minutes.
		//units_per_second: 1, // The inverse of `seconds_per_unit` which can also be used to derive `seconds_per_unit` via taking the reciprocal (1/`units_per_second`); ignored if `seconds_per_unit` is specified.
		unit_separator: "\u205f", // A string to place between a number and its unit or a non-truthy value to omit units entirely from the formatted string.
		split_separator: "\u2005", // A string to put between each order of magnitude or a non-truthy value to omit separation altogether.
		//applied_units: { hours: 'h', minutes: 'min', seconds: 's' }, // An object whose properties indicate which units should be included with the property value indicating a preferred unit symbol. See [MathJS](https://mathjs.org/docs/datatypes/units.html#reference) for available units.
		duration_unit: MathJS.unit('s'),
		split_units: [ 'h', 'min', 's' ]
	};// Variables
	var _return = '';
	var return_error = null;
	var options = {};
	// Parametre checks
	if( typeof(input_options) !== 'object' ){
		return_error = new TypeError('Param "input_options" is not of type object.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}

	// Options
	var { logFunction: log_function = this?.logger?.log, validationFunction: validation_function, ...options } = deriveOptions( input_options, DEFAULT_OPTIONS, ( options ) => {
		/* c8 ignore start */
		/*if( !Number.isFinite( options.seconds_per_unit ) ){
			if( Number.isFinite( options.units_per_second ) ){
				options.seconds_per_unit = 1/options.units_per_second;
			}
		}*/
		if( typeof(options.duration_unit) === 'string' ){
			options.duration_unit = MathJS.unit( options.duration_unit );
		}
		/* c8 ignore stop */
		return options;
	} );
	if( validation_function( options ) === true ){
		if( options.noop !== true ){
			// Function
			var working_duration_unit = MathJS.unit( options.duration, options.duration_unit );
			var split_array = working_duration_unit.splitUnit( options.split_units );
			var output_array = [];
			for( var part_unit of split_array ){
				var part_string = part_unit.toString();
				//console.log( part_string );
				if( options.unit_separator ){
					//console.log( 'unit_separator truthy' );
					part_string = part_string.replace( ' ', options.unit_separator );
				}
				//console.log( "Fixed? part_string: %s", part_string );
				output_array.push( part_string );
			}
			if( options.split_separator ){
				_return = output_array.join( options.split_separator );
			} else /* c8 ignore start */ {
				_return = output_array.join('');
			} /* c8 ignore stop */
			/*var sorted_units = [];
			for( const unit_key of Object.keys(options.applied_units) ){
				var unit_value = MathJS.unit(1, unit_key);
				unit_value.to('s');
			}*/

		} // noop
	} // validation_function
	// Return
	this?.logger?.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `returned: ${_return}`});
	return _return;
} // getStringFromDurationOptions

const NAMESPACE = {};
Object.defineProperties( NAMESPACE, {
	getNowISO: {
		value: getNowISO,
		enumerable: true
	},
	getDateFromUnixTimestamp: {
		value: getDateFromUnixTimestamp,
		enumerable: true
	},
	getISOStringFromUnixTimestamp: {
		value: getISOStringFromUnixTimestamp,
		enumerable: true
	},
	Clock: {
		value: Clock,
		enumerable: true
	},
	Benchmark: {
		value: Benchmark,
		enumerable: true
	},
	getStringFromDurationOptions: {
		value: getStringFromDurationOptions,
		enumerable: true
	}
} );

export { NAMESPACE as default, getNowISO, getDateFromUnixTimestamp, getISOStringFromUnixTimestamp, Clock, Benchmark, getStringFromDurationOptions };

// lib.js EOF

