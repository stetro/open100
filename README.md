Open100 [![Build Status](https://travis-ci.org/stetro/open100.svg?branch=master)](https://travis-ci.org/stetro/open100)
=======

Multi core assembler interpreter written in TypeScript. 

This is a learning project for Angular2 and TypeScript development. 
The assembler is inspired by Zachtronics game [TIS 100](http://www.zachtronics.com/tis-100/).

[Try it yourself!](http://stetro.github.io/open100/)

![Screencast](open100.gif)

### Commands

* `MOV` - moves a value or a register content to another register
* `ADD` `SUB` `NEG` - operation on ACC register
* `SAV` - copy `ACC` to `BAK`
* `SWP` - swap `ACC` with `BAK`
* `JMP` - jump to a label ending with a `:` (e.g. `LOOP:`)
* `JEZ` `JGZ` `JLZ` `JNZ` - conditional `ACC` jump to a label (equal zero, greater zero, lower zero, not zero)

### Register

* `UP` `DOWN` `LEFT` `RIGHT` - communication register to other nodes
* `ACC` - calculation register
* `BAK` - backup register (accessible with `SWP` and `SAV`)

