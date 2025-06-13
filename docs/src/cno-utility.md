
# [cno-utility.js](src/cno-utility.js)
> Various utilities for debugging and common tasks.

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

### annotateThis
> Adds some basic information, UID and creation time, to `this`, useful for debugging.

#### History
| version | change |
| --- | --- |
| 0.0.1 | WIP |


### inspThis
> [Inspects](https://nodejs.org/api/util.html#utilinspectobject-options) `this` with some more concise defaults.

#### Parametres
| name | type | description |
| --- | --- | --- |
| options | object | Overwrite options to pass to inspect. \[default: null\] |

#### History
| version | change |
| --- | --- |
| 0.0.1 | WIP |


### getAnnotatedObject
> [`annotateThis`](#annotateThis) but modifies and returns a copy of the given input object.

#### Parametres
| name | type | description |
| --- | --- | --- |
| input_object | object | The object to add the properties to. \[default: null\] |

#### Returns
| type | description |
| --- | --- |
| object | The freshly-annotated object. |

#### Throws
| code | type | condition |
| --- | --- | --- |
| 'ERR_INVALID_ARG_TYPE' | TypeError | Thrown if a given argument isn't of the correct type. |

#### History
| version | change |
| --- | --- |
| 0.0.1 | WIP |

