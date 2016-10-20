// card constructor

function PlayingCard(suit, value) {
  this.name = value + ' of ' + suit;
  this.suit = suit;
  this.value = value;
}

var card = new PlayingCard('spades', 'ace');
// console.log(card);

function Deck() {
  'use strict';

  var container = $('.container');

  //CREATE Deck
  var suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
  var cardValues = [2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 , 10 , 'Jack' , 'Queen' , 'King' , 'Ace'];

  this.allCards = [];

  var suitImages = [
    {
      suit: 'Hearts',
      image: 'images/heart.png'
    },{
      suit: 'Spades',
      image: 'images/spade.png'
    },{
      suit: 'Clubs',
      image: 'images/club.png'
    },{
      suit: 'Diamonds',
      image: 'images/diamond.png'
    }
  ];

  for(var i = 0; i < suits.length; i++) {
    for(var v = 0; v < cardValues.length; v++) {
      this.allCards.push(new PlayingCard(suits[i], cardValues[v]));
    }
  }

  //PICK random card
  function getRandomCard (cards) {
    var r = Math.random();
    return Math.ceil(r * cards);
  }

  //SHUFFLE should grab a random card, move that to a new deck, then pick another++ until there are no new cards, it will then return it back as allCards so we can continue to use this for other functions
  this.shuffle = function () {
    var newOrder = [];
    var i=0;
    do {
      var pickedCard = this.allCards[getRandomCard(this.allCards.length)];
      var cardLocation = this.allCards.indexOf(pickedCard);
      newOrder.push(this.allCards.splice(cardLocation, 1));
    } while ( newOrder.length < 52);
    // console.log(newOrder[0].concat(newOrder[1]));
    var newDeck = newOrder.map(function(card, i, arr) {
      return card[0];
    });
    // return newDeck;
    this.allCards = newDeck;
    return this.allCards;
  };

  //DRAW should take the top card and adjust allCards to only display what is left
  this.draw = function () {
    var topCard = this.allCards[0];
    var cardImage;
    // console.log(topCard);
    this.allCards.splice(topCard, 1);
    // var $createCard = ('<li>' + topCard.value + ' of ' + topCard.suit + '</li>');
    suitImages.forEach(function(image, i, arr) {
      if (image.suit === topCard.suit) {
        cardImage = image.image;
      }
    });
    var $createCard = ('<li><h2>' + topCard.value + '</h2><img src=" ' + cardImage + '" /img>' + '</li>');
    container.append($createCard);
    return topCard;
  };

  // define other factors of what a deck is

}

var deck = new Deck();
var deck2 = new Deck();
var container = $('.container');
console.log(deck2);
console.log(deck.shuffle());
console.log(deck.draw());
// container.append(deck.draw());


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
  } while (i < 1000);

  // console.log(rolls);

  var counter = [];
	// go through one letter at a time
	rolls.forEach(function(roll, i, arr) {
		// if the sum is not in the counter
		if (!counter[roll-2]) {
			//write it down and give it value 1
			counter[roll-2] = 1;
		} else {
			// add 1 to its value
			counter[roll-2] = counter[roll-2] + 1;
		}
    // return counter;
	});
  return counter;

}

var finalProbabilites = getProbabilities(die1, die2);
// console.log(finalProbabilites);
