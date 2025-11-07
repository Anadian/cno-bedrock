
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


## Functions

### assertSameType
> Throws if actual's type is not the same as expected's, according to a strict `typeof` comparison.

#### Parametres
| name | type | description |
| --- | --- | --- |
| actual | any | The actual value.  |
| expected | any | The expected value.  |

#### Throws
| code | type | condition |
| --- | --- | --- |
| 'ERR_ASSERTION_SAMETYPE' | AssertionError | Thrown if `typeof(actual) !== typeof(expected)`. |

#### History
| version | change |
| --- | --- |
| 0.0.3 | Removed message parametre. |
| 0.0.1 | WIP |


### assertNonstrictNotEqual
> Throws if actual and expected can be coerced to equal one another.

#### Parametres
| name | type | description |
| --- | --- | --- |
| actual | any | The actual value.  |
| expected | any | The expected value.  |

#### Throws
| code | type | condition |
| --- | --- | --- |
| 'ERR_ASSERTION_NONSTRICTNOTEQUAL' | AssertionError | Thrown if `actual == expected`. |

#### History
| version | change |
| --- | --- |
| 0.0.3 | Redone |
| 0.0.1 | WIP |


### assertIsEmpty
> Throws if `actual` is not empty.

#### Parametres
| name | type | description |
| --- | --- | --- |
| actual | any | The actual value.  |

#### Throws
| code | type | condition |
| --- | --- | --- |
| 'ERR_ASSERTION_ISEMPTY' | AssertionError | Thrown if `actual` is not empty. |

#### History
| version | change |
| --- | --- |
| 0.0.3 | WIP |


### assertIsNullOrUndefined
> Throws if `actual` is neither `null` nor `undefined`.

#### Parametres
| name | type | description |
| --- | --- | --- |
| actual | any | The actual value.  |

#### Throws
| code | type | condition |
| --- | --- | --- |
| 'ERR_ASSERTION_ISNULLORUNDEFINED' | AssertionError | Thrown if `actual` is neither `null` nor `undefined`. |

#### History
| version | change |
| --- | --- |
| 0.0.3 | WIP |


### assertIsNullOrEmpty
> Throws if `actual` is neither an empty string, `null`, nor `undefined`.

#### Parametres
| name | type | description |
| --- | --- | --- |
| actual | any | The actual value.  |

#### Throws
| code | type | condition |
| --- | --- | --- |
| 'ERR_ASSERTION_ISNULLOREMPTY' | AssertionError | Thrown if `actual` is neither an empty string, `null`, nor `undefined`. |

#### History
| version | change |
| --- | --- |
| 0.0.3 | WIP |


### assertStrictlyNotEqual
> Throws if actual is not the same type as expected or is the value as expected.

#### Parametres
| name | type | description |
| --- | --- | --- |
| actual | any | The actual value.  |
| expected | any | The expected/invalid value.  |
| name | string | The name of variable as a string, for a more informative auto message. \[default: `null`\] |
| value | string | The expected value as a string, for a more informative auto message. \[default: `null`\] |
| expectedType | string | The expected's type as a string, for a more informative auto message. \[default: `null`\] |

#### Throws
| code | type | condition |
| --- | --- | --- |
| 'ERR_ASSERTION_STRICTLYNOTEQUAL' | AssertionError | Thrown if actual is not strictly-not-equal (`=!=`) to expected. |

#### History
| version | change |
| --- | --- |
| 0.0.3 | Removed message parametre. |
| 0.0.1 | WIP |


### assertInstanceof
> Throws if actual is not an instance of (via `instanceof`) of expected.

#### Parametres
| name | type | description |
| --- | --- | --- |
| actual | any | The actual value.  |
| expected | any | The expected value.  |

#### Throws
| code | type | condition |
| --- | --- | --- |
| 'ERR_ASSERTION_INSTANCEOF' | AssertionError | Thrown if actual is not an instance of expected. |

#### History
| version | change |
| --- | --- |
| 0.0.3 | Removed message parametre. |
| 0.0.1 | WIP |


### assertExpectedError
> Throws if the actual error doesn't match the the object describe in expected.

#### Parametres
| name | type | description |
| --- | --- | --- |
| actual | any | The actual error.  |
| expected | any | An object with a the properties 'constructor' with the constructor function used to create the error and 'code' the expected code property of the error.  |

#### Throws
| code | type | condition |
| --- | --- | --- |
| 'ERR_ASSERTION_EXPECTEDERROR' | AssertionError | Thrown if actual doesn't match the error described by expected. |

#### History
| version | change |
| --- | --- |
| 0.0.1 | WIP |


### assertObjectsQuantitativelyEqual
> Throws if actual doesn't have the same properties and values as expected. Compared via [lodash's `_.isEqual`](https://lodash.com/docs/4.17.15#isEqual).

#### Parametres
| name | type | description |
| --- | --- | --- |
| actual | any | The actual object.  |
| expected | any | The expected object.  |

#### Throws
| code | type | condition |
| --- | --- | --- |
| 'ERR_ASSERTION_OBJECTSQUANTITATIVELYEQUAL' | AssertionError | Thrown if `_.isEqual( actual, expected )` is not true. |

#### History
| version | change |
| --- | --- |
| 0.0.3 | Removed message parametre. |
| 0.0.1 | WIP |


### assertNullOrFunction
> Throws if actual is neither `null` nor a function.

#### Parametres
| name | type | description |
| --- | --- | --- |
| actual | any | The actual object.  |

#### Throws
| code | type | condition |
| --- | --- | --- |
| 'ERR_ASSERTION_NULLORFUNCTION' | AssertionError | Thrown if actual is neither `null` nor a function. |

#### History
| version | change |
| --- | --- |
| 0.0.3 | Removed message parametre. |
| 0.0.1 | WIP |

