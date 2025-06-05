#!/usr/bin/env node
/**
# [cno-options.js](src/cno-options.js)
> Implements functions and defaults for `input_options`-type parametres.

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
	import NOOP from './cno-noop.js'
	//## Standard
	//## External
//# Constants
const FILENAME = 'cno-options.js';
//## Errors

//# Global Variables
/**## Functions*/
// Options
function deriveOptions( input_options, default_options, dynamic_function = null, standard_options = true ){
	var _return = null;
	var options = {};
	if( standard_options !== false ){
		options = Object.assign( options, deriveOptions.STANDARD_OPTIONS, input_options );
	}
	if( input_options.noDefaults !== true && default_options != null ){
		options = Object.assign( options, default_options, input_options );
		if( input_options.noDynamic !== true && typeof(dynamic_function) === 'function' && dynamic_function != null ){
			options = Object.assign( options, dynamic_function.call( this, options ), input_options );
		} // noDynamic
	} else{
		options = Object.assign( {}, input_options );
	} // noDefaults
	_return = { options: options, log_function: options.logFunction ?? this?.logger?.log ?? returnNull, validation_function: options.validationFunction ?? returnTrue };
	return _return;
}
Object.defineProperties( deriveOptions, {
	STANDARD_OPTIONS: {
		value: {
			noop: false,
			noDefaults: false,
			noDynamic: false,
			logFunction: NOOP.returnNull,
			validationFunction: NOOP.returnTrue
		},
		enumerable: true
	}
} );

export default deriveOptions;

// cno-options.js EOF

