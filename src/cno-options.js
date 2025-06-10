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
/**
### deriveOptions
> Derives and returns the final runtime options.

#### Parametres
| name | type | description |
| --- | --- | --- |
| input_options | object | Run-time options.  |
| default_options | object | The default options to be derived against.  |
| dynamic_function | function | A function which receives an options object as an argument and returns a modified options object; used for dynamic defaults derived from other options. \[default: null\] |
| standard_options | boolean | Whether to include the defaults for the standard options \(see below\). \[default: true\] |

##### Stanard Options
> Available via `deriveOptions.STANDARD_OPTIONS`.
| name | type | default | description |
| --- | --- | --- | --- |
| noop | boolean | false | Skip primary functionality. |
| noDefaults | boolean | false | Don't apply static default options. |
| noDynamic | boolean | false | Don't apply dynamic default options. |
| logFunction | function | [returnNull](#returnNull) | A function to use for logging. \[Default: [returnNULL](#returnNull)\] |
| validationFunction | function | [returnTrue](#returnTrue) | A function for validating the contents of the final options, returning `true` meaning things proceed. \[Default: [returnTrue](#returnTrue)\] |

#### Returns
| type | description |
| --- | --- |
| object | Returns the final options object. |

#### History
| version | change |
| --- | --- |
| 0.0.1 | WIP |
*/
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
	_return = options;
	return _return;
} // deriveOptions
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

