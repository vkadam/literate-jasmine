# literate-jasmine [![Build Status](https://travis-ci.org/cymen/literate-jasmine.png?branch=master)](https://travis-ci.org/cymen/literate-jasmine)

    var PI;

[![NPM](https://nodei.co/npm/literate-jasmine.png?downloads=true&stars=true)](https://npmjs.org/package/literate-jasmine)

The idea is to write markdown that gets translated to Jasmine `describe` and
`it` blocks. Because we want to be able to annotate in between parts of what
would become a single `it`, we make use of markdown hierarchy to separate one
test from another and to give the `it` (and `describe` blocks names).

This README.md has a markdown structure (which includes the main header
above and the other parts below) that is parsed into a tree:

* literate-jasmine
  * Mathematices
    * add can add numbers (level 3 header)
    * add can add numbers
    * calculates the circumference of a circle
  * Strings
    * appending works with +

Which is then written to disk as `FILENAME_spec.js`. Take a look at `README_spec.js`
as an example -- it is generated using this README as input!

The command `literate-jasmine` is used to convert the markdown to JavaScript
(assuming you ran `npm install -g literate-jasmine`):

literate-jasmine README.md

(If you're working on this project, run `./bin/literate-jasmine` instead.)

Then run the jasmine tests: `jasmine-node README_spec.js`.

Take a close look at how scope works for globals. In the Mathematics section below, we
reference `PI` to reset it as a `beforeEach` so every test has `PI` reset to the correct
value. The actual declaration of `PI` as a variable happens on the third line of this
README. The root describe treats any code blocks after it as global setup.

## Mathematics

    PI = 22/7;

### add can add numbers

    var a = 1,
        b = 2;

    console.log(a, b, a + b);

    expect(a + b).toBe(3);

### can divide numbers

    var a = 6,
        b = 2;

And a comment here doesn't break things:

    expect(a/b).toBe(3);

### calculates the circumference of a circle
Note that we reference the variable PI below that is defined in the code
block at the top of this describe (so right under "Mathematics").

    var circumference = function(radius) {
      return 2 * PI * radius;
    };

    expect(circumference(5)).toBe(2 * 22/7 * 5);

## Strings
### appending works with +

    var text = "abc";

    expect(text + "d").toBe("abcd");
