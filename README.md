# Hastilude

>Command Line Tool for playing around with JWT tokens.

## Installing

`yarn global add hastilude`

## Usage

*Generate*

`hastilude generate -s mysecret -p mypayload.json`

A token will be displayed to the console.

*Dismantle*

`hastilude dismantle -t <token>`

Token contents will be displayed to the console.

#### Changelog

0.0.2 - Added `dismantle`
0.0.1 - First version; Added `generate`
