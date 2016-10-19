// card constructor

function PlayingCard (suit, value) {
  this.name = value + ' of ' + suit;
  this.suit = suit;
  this.value = value;
}

var card = new PlayingCard('spades', 'ace');
// console.log(card);

// die constructor
function randomNumber() {
  var r = Math.random();
  return Math.ceil(r*6);
}

function newValue() {
  //we need the context of this to be from die in this case
  return (this.value = randomNumber());
}

function Die(value, name) {
// the value needs to select itself from 1-6
  this.name = name;
  this.value = value;
  // when this method is applied the die should get a new value
  // to reset the paramaters of this
  this.roll = function () {
    return (this.value = newValue.call(Die));
    // return (this.value = newValue);
  };

}

var die1 = new Die(1, 'die1');
var die2 = new Die(2, 'die2');

// Proofing
// console.log(die);
// console.log(die2);
// console.log(die2.value);
// console.log(die2.roll());
// console.log(die2.value);
// console.log(die2);
// console.log(die.roll());

// console.log(die1.roll());
// console.log(die1.roll() + die2.roll());

// get Probabilities - will roll 2 die, 1000 times + returns an array of the number of sums (unique) for each die roll
// get 2 dice, each with a single value
// show how many times the sum the values of each dice

function getProbabilities(die1, die2) {
  var i = 0;
  var rolls = [];
  do {
    var sum = die1.roll() + die2.roll();
    rolls.push(sum);
    i++;
  } while (i < 100);

  console.log(rolls);

  var counter = {};
  var finalProbabilites = [];
	// go through one letter at a time
	rolls.map(function(roll, i, arr) {
		// if the sum is not in the counter
		if (!counter[roll]) {
			//write it down and give it value 1
			counter[roll] = 1;
		} else {
			// add 1 to its value
			counter[roll] = counter[roll] + 1;
		}
	});

  console.log(counter);

}

var finalProbabilites = getProbabilities(die1, die2);
console.log(finalProbabilites);
