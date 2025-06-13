
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


## Functions

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

