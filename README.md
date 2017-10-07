# js-tdd

A quick example of TDD in JS using Mocha & Chai for the tests and Knockout.js for the app.

## How to run it

- Clone the repo
- run "npm install" in the src directory to install dependencies
- run "npm run test" in the src directory to run the tests

## Further information

- [Mocha Test Runner](https://mochajs.org/)
- [Chai Assertion Library](http://chaijs.com/)
- [KnockoutJS](http://knockoutjs.com/)

## Ideas for tests & features

If you want to play around with the app / testing framwork, you can try one of the following suggestions:

- [ ] Write a test that ensures that all resulting numbers are rounded to two decimal points, then implement the rounding
- [ ] Write a test that ensures that all amounts in CHF are rounded to 5 rp., then implement the rounding
- [ ] Write some validations ensuring that the user inputs valid numbers and display an error message if they don't - write some tests for it first and then implement the code
- [ ] Try refactoring out the fees to a separate object instead of hardcoded if-statements and see if the tests still pass, e.g.
```javascript
var fees = [
	{
		from:         0.01,
		to:           30.00,
		percentage:   0.079,
		flatfee:      0.0
	} //...and so on
]
```
- [ ] Chai provides [different assertion styles](http://chaijs.com/guide/styles/) - try some others
