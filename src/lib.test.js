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
	var benchmark = Bedrock.time.Benchmark( { clock: Bedrock.time.Clock() } );
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
	try{
		Bedrock.assert.assertStrictlyNotEqual( 1, false );
	} catch( error ){
		Bedrock.assert.assertExpectedError( error, { constructor: AssertionError, code: 'ERR_ASSERTION_STRICTLYNOTEQUAL' } );
	}
	benchmark.mark();
	Bedrock.assert.assertInstanceof( new TypeError(), Error ); // TypeError is an instance of Error
	try{
		Bedrock.assert.assertInstanceof( new Error(), TypeError );
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
		var error = new Error();
		error.code = 'NONE';
		Bedrock.assert.assertExpectedError( error, { constructor: TypeError, code: 'NONE' } );
	} catch( error ){
		Bedrock.assert.assertExpectedError( error, { constructor: AssertionError, code: 'ERR_ASSERTION_EXPECTEDERROR' } );
	}
	try{
		error = new Error();
		error.code = 'WRONG';
		Bedrock.assert.assertExpectedError( error, { constructor: Error, code: 'NONE' } );
	} catch( error ){
		Bedrock.assert.assertExpectedError( error, { constructor: AssertionError, code: 'ERR_ASSERTION_EXPECTEDERROR' } );
	}
	benchmark.end();
	console.log( benchmark.getIntervals() );
	console.log( 'Benchmark end: %s', Bedrock.time.getISOStringFromUnixTimestamp( Number(benchmark.duration) * benchmark.granularity ) );
	console.log( Bedrock.utility.inspThis.call( benchmark ) );
	// Improving coverage
	try{
		Bedrock.isStrictlyNotEqual( false );
	} catch( error ){
		Bedrock.assert.assertExpectedError( error, { constructor: TypeError, code: 'ERR_INVALID_ARG_TYPE' } );
	}
	Bedrock.assert.deepStrictEqual( Bedrock.isStrictlyNotEqual( { received: 1, invalid: 0 } ), true );
	Bedrock.assert.deepStrictEqual( Bedrock.isStrictlyNotEqual( { received: 0, invalid: 0 } ), false );
	var current_options = { a: 0 };
	var default_options = { a: 1 };
	var dynamic_function = ( options ) => {
		options.a = 5;
		return options;
	};
	Bedrock.assert.assertObjectsQuantitativelyEqual( Bedrock.deriveOptions( current_options, default_options, dynamic_function, false ), { a: 0 } );
	current_options = { noDefaults: true };
	Bedrock.assert.assertObjectsQuantitativelyEqual( Bedrock.deriveOptions( current_options, null ), { noDefaults: true } );
	try{
		Bedrock.utility.getAnnotatedObject( false );
	} catch( error ){
		Bedrock.assert.assertExpectedError( error, { constructor: TypeError, code: 'ERR_INVALID_ARG_TYPE' } );
	}
	var annotated_object = Bedrock.utility.getAnnotatedObject( current_options );
	Bedrock.assert.assertObjectsQuantitativelyEqual( current_options, { noDefaults: true } );
	Bedrock.assert.deepStrictEqual( Bedrock.time.getStringFromDurationOptions( { duration: 109210 } ), "30\u205fh\u200520\u205fmin\u200510\u205fs" );
	try{
		Bedrock.time.getStringFromDurationOptions( false );
	} catch( error ){
		Bedrock.assert.assertExpectedError( error, { constructor: TypeError, code: 'ERR_INVALID_ARG_TYPE' } );
	}
	//var new_benchmark = Bedrock.time.Benchmark( { clock: Bedrock.time.Clock() } );
	try{
		Bedrock.time.Clock( false );
	} catch( error ){
		Bedrock.assert.assertExpectedError( error, { constructor: TypeError, code: 'ERR_INVALID_ARG_TYPE' } );
	}
	try{
		Bedrock.time.Benchmark( false );
	} catch( error ){
		Bedrock.assert.assertExpectedError( error, { constructor: TypeError, code: 'ERR_INVALID_ARG_TYPE' } );
	}
	// v0.0.3
	Bedrock.assert.assertIsEmpty( [] );
	try{
		Bedrock.assert.assertIsEmpty( 'Not empty.' );
	} catch( error ){
		//console.log( error );
		Bedrock.assert.assertExpectedError( error, { constructor: AssertionError, code: 'ERR_ASSERTION_ISEMPTY' } );
	}
	Bedrock.assert.assertIsNullOrUndefined( null );
	try{
		Bedrock.assert.assertIsNullOrUndefined( 'Not empty.' );
	} catch( error ){
		//console.log( error );
		Bedrock.assert.assertExpectedError( error, { constructor: AssertionError, code: 'ERR_ASSERTION_ISNULLORUNDEFINED' } );
	}
	Bedrock.assert.assertIsNullOrEmpty( '' );
	Bedrock.assert.assertIsNullOrEmpty( null );
	try{
		Bedrock.assert.assertIsNullOrEmpty( 'Not empty.' );
	} catch( error ){
		//console.log( error );
		Bedrock.assert.assertExpectedError( error, { constructor: AssertionError, code: 'ERR_ASSERTION_ISNULLOREMPTY' } );
	}
	try{
		Bedrock.assert.assertIsNullOrEmpty( 1 );
	} catch( error ){
		//console.log( error );
		Bedrock.assert.assertExpectedError( error, { constructor: AssertionError, code: 'ERR_ASSERTION_ISNULLOREMPTY' } );
	}
	Bedrock.assert.assertNullOrFunction( Bedrock.noop.returnNull );
	Bedrock.assert.assertNullOrFunction( null );
	try{
		Bedrock.assert.assertNullOrFunction( 1 );
	} catch( error ){
		//console.log( error );
		Bedrock.assert.assertExpectedError( error, { constructor: AssertionError, code: 'ERR_ASSERTION_NULLORFUNCTION' } );
	}
	var e = Bedrock.isNullOrEmpty( '' );
	var n = Bedrock.isNullOrEmpty( null );
	var f = Bedrock.isNullOrEmpty( '0' );
	if( e !== true || n !== true || f !== false ){
		console.error( 'Something is wrong!', e, n, f );
	}
	var map = new Map();
	var maplike = {
		a: 'b',
		size: 1
	};
	Bedrock.assert.assertIsMap( map );
	try{
		Bedrock.assert.assertIsMap( maplike );
	} catch( error ){
		Bedrock.assert.assertExpectedError( error, { constructor: AssertionError, code: 'ERR_ASSERTION_ISMAP' } );
	}
}
main_test();

// lib.test.js EOF

