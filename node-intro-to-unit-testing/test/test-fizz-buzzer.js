const expect = require('chai').expect;
const fizzBuzzer = require('../fizzBuzzer');

describe('fizzBuzzer', function(){

	it('it should return "fizz-buzz" for multiples of 15', function(){
    [15, 30, 45].forEach(function(input){
      expect(fizzBuzzer(input)).to.equal('fizz-buzz');
    })
	})

	it('it should return "buzz" for multiples of 5', function(){
    [5, 10, 20].forEach(function(input){
      expect(fizzBuzzer(input)).to.equal('buzz');
    })
	})

	it('it should return "fizz" for multiples of 3', function(){
		[3, 6, 9].forEach(function(input){
      expect(fizzBuzzer(input)).to.equal('fizz');
    })
	})

	it('it should return the number if not multiples of 3 or 5', function(){
    [1, 4, 16].forEach(function(input){
      expect(fizzBuzzer(input)).to.equal(input);
    })
	})

	it('it should show an error if the input is not a number', function(){
    const badInputs = ['apple', true, false, [1, 2, 3], function(){}]
    badInputs.forEach(function(input) {
      expect(function() {
        fizzBuzzer(input);
      }).to.throw(Error);
    });
	})
})
