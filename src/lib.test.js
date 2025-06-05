#!/usr/bin/env node
/**
# [lib.test.js](src/lib.test.js)
> Simple practical test for CNO-Bedrock.

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
	import Bedrock from './lib.js';
	//## Standard
	import { AssertionError } from 'node:assert/strict';
	//## External
//# Constants
const FILENAME = 'lib.test.js';
//## Errors

//# Global Variables
/**## Functions*/
function main_test(){
	console.log( 'Testing starting at %s', Bedrock.time.getNowISO() );
	var benchmark = Bedrock.time.Benchmark();
	Bedrock.utility.annotateThis.call( benchmark );
	benchmark.begin();
	Bedrock.assert.deepStrictEqual( Bedrock.noop.returnNull(), null );
	Bedrock.assert.deepStrictEqual( Bedrock.noop.returnTrue(), true );
	Bedrock.assert.deepStrictEqual( Bedrock.noop.returnFalse(), false );
	Bedrock.assert.deepStrictEqual( Bedrock.noop.returnUndefined(), undefined );
	benchmark.mark();
	Bedrock.assert.assertSameType( 1, 0 );
	try{
		Bedrock.assert.assertSameType( '1', 0 );
	} catch( error ){
		Bedrock.assert.assertExpectedError( error, { constructor: AssertionError, code: 'ERR_ASSERTION_SAMETYPE' } );
	}
	benchmark.mark();
	Bedrock.assert.assertNonstrictNotEqual( '1', 0 );
	try{
		Bedrock.assert.assertNonstrictNotEqual( false, 0 );
	} catch( error ){
		Bedrock.assert.assertExpectedError( error, { constructor: AssertionError, code: 'ERR_ASSERTION_NONSTRICTNOTEQUAL' } );
	}
	benchmark.mark();
	Bedrock.assert.assertStrictlyNotEqual( 1, 0 );
	try{
		Bedrock.assert.assertStrictlyNotEqual( 1, 1 );
	} catch( error ){
		Bedrock.assert.assertExpectedError( error, { constructor: AssertionError, code: 'ERR_ASSERTION_STRICTLYNOTEQUAL' } );
	}
	benchmark.mark();
	Bedrock.assert.assertInstanceof( new Error(), Error );
	try{
		Bedrock.assert.assertInstanceof( new TypeError(), Error );
	} catch( error ){
		Bedrock.assert.assertExpectedError( error, { constructor: AssertionError, code: 'ERR_ASSERTION_INSTANCEOF' } );
	}
	benchmark.mark();
	Bedrock.assert.assertObjectsQuantitativelyEqual( { noop: false, noDefaults: false, noDynamic: false, logFunction: Bedrock.noop.returnNull, validationFunction: Bedrock.noop.returnTrue }, Bedrock.deriveOptions.STANDARD_OPTIONS );
	try{
		Bedrock.assert.assertObjectsQuantitativelyEqual( { a: 3 }, { b: 3 } );
	} catch( error ){
		Bedrock.assert.assertExpectedError( error, { constructor: AssertionError, code: 'ERR_ASSERTION_OBJECTSQUANTITAIVELYEQUAL' } );
	}
	benchmark.mark();
	try{
		var error = new TypeError();
		error.code = 'NONE';
		Bedrock.assert.assertExpectedError( error, { constructor: Error, code: 'NONE' } );
	} catch( error ){
		Bedrock.assert.assertExpectedError( error, { constructor: AssertionError, code: 'ERR_ASSERTION_EXPECTEDERROR' } );
	}
	benchmark.end();
	console.log( benchmark.getIntervals() );
	console.log( 'Benchmark end: %s', Bedrock.time.getISOStringFromUnixTimestamp( Number(benchmark.duration) * benchmark.granularity ) );
	console.log( Bedrock.utility.inspThis.call( benchmark ) );
}
main_test();

// lib.test.js EOF

