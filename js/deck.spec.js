'use strict';

var expect = require( 'chai' ).expect;
var proxyquire = require( 'proxyquire' );

// Use a seeded random number generator to remove randomness from the tests
var seededRandomNumber = require( './lib/seeded-random-number' );
var Deck = proxyquire( './deck', {
  './lib/random-number': seededRandomNumber.makeMock( 'deck.spec.js' )
});

describe( 'Deck', function() {
  var deck;

  it( 'exists', function() {
    expect( Deck ).to.exist;
  });

  it( 'is a function', function() {
    expect( Deck ).to.be.a( 'function' );
  });

  it( 'is a Constructor', function() {
    deck = new Deck();
    expect( deck instanceof Deck ).to.be.true;
  });

  it( 'can take an array argument that is used to set the cards in the deck', function() {
    deck = new Deck([ 'a', 'b', 'c' ]);
    expect( deck.top( 3 ) ).to.deep.equal([ 'a', 'b', 'c' ]);
  });


  describe( 'method .cards()', function() {

    it( 'exists', function() {
      expect( deck ).to.have.property( 'cards' );
    });

    it( 'is a function', function() {
      expect( deck.cards ).to.be.a( 'function' );
    });

    it( 'populates the deck with an array of cards', function() {
      deck.cards([ 'a', 'b', 'c', 'd' ]);
      expect( deck.remaining() ).to.equal( 4 );
      expect( deck.top( 4 ) ).to.deep.equal([ 'a', 'b', 'c', 'd' ]);
    });

    it( 'replaces the previous cards in the deck', function() {
      deck.cards([ 'a', 'b', 'c', 'd' ]);
      deck.cards([ 'e', 'f', 'g' ]);
      expect( deck.remaining() ).to.equal( 3 );
      expect( deck.top( 3 ) ).to.deep.equal([ 'e', 'f', 'g' ]);
    });

    it( 'can empty the deck if an empty array is provided', function() {
      deck.cards([ 'a', 'b', 'c', 'd' ]);
      deck.cards([]);
      expect( deck.remaining() ).to.equal( 0 );
    });

    it( 'has no effect if a non-array argument is provided', function() {
      deck.cards([ 'a', 'b', 'c', 'd' ]);
      deck.cards( 'lali puna' );
      expect( deck.remaining() ).to.equal( 4 );
      expect( deck.top( 4 ) ).to.deep.equal([ 'a', 'b', 'c', 'd' ]);
    });

    it( 'is chainable', function() {
      expect( deck.cards() ).to.equal( deck );
    });

  });

  describe( 'method', function() {

    beforeEach(function() {
      deck = new Deck();
      deck.cards([ 'a', 'b', 'c', 'd', 'e' ]);
    });

    describe( '.shuffle()', function() {

      it( 'exists', function() {
        expect( deck ).to.have.property( 'shuffle' );
      });

      it( 'is a function', function() {
        expect( deck.shuffle ).to.be.a( 'function' );
      });

      it( 'shuffles the order of the cards within the deck', function() {
        // Seeded (predictable) randomness
        deck.shuffle();
        expect( deck.top( 5 ) ).to.deep.equal([ 'a', 'd', 'c', 'e', 'b' ]);
      });

      it( 'is chainable', function() {
        expect( deck.shuffle() ).to.equal( deck );
      });

    });

    describe( '.remaining', function() {

      it( 'exists', function() {
        expect( deck ).to.have.property( 'remaining' );
      });

      it( 'is a function', function() {
        expect( deck.remaining ).to.be.a( 'function' );
      });

      it( 'returns the number of cards remaining in the deck', function() {
        expect( deck.remaining() ).to.equal( 5 );
        deck.cards([]);
        expect( deck.remaining() ).to.equal( 0 );
        deck.cards([ 6, 7 ]);
        expect( deck.remaining() ).to.equal( 2 );
      });

    });

    describe( '.draw()', function() {

      it( 'exists', function() {
        expect( deck ).to.have.property( 'draw' );
      });

      it( 'is a function', function() {
        expect( deck.draw ).to.be.a( 'function' );
      });

      it( 'draws (returns) one card object when called with no arguments', function() {
        expect( deck.draw() ).to.equal( 'a' );
      });

      it( 'removes the drawn card from the deck', function() {
        deck.draw();
        expect( deck.remaining() ).to.equal( 4 );
        expect( deck.top() ).to.equal( 'b' );
      });

      it( 'draws (returns) an array of n cards when called with a number n', function() {
        expect( deck.draw( 2 ) ).to.deep.equal([ 'a', 'b' ]);
        expect( deck.draw( 3 ) ).to.deep.equal([ 'c', 'd', 'e' ]);
      });

      it( 'removes the drawn n cards from the deck', function() {
        deck.draw( 3 );
        expect( deck.remaining() ).to.equal( 2 );
        expect( deck.top( 2 ) ).to.deep.equal([ 'd', 'e' ]);
      });

      it( 'cannot draw more than the remaining number of cards', function() {
        expect( deck.draw( 1337 ) ).to.deep.equal([ 'a', 'b', 'c', 'd', 'e' ]);
        expect( deck.remaining() ).to.equal( 0 );
      });

    });

    describe( '.drawFromBottom()', function() {

      it( 'exists', function() {
        expect( deck ).to.have.property( 'drawFromBottom' );
      });

      it( 'is a function', function() {
        expect( deck.drawFromBottom ).to.be.a( 'function' );
      });

      it( 'draws (returns) one card object from the bottom of the deck' );

      it( 'removes the drawn card from the deck' );

      it( 'draws (returns) an array of n cards from the bottom of the deck' );

      it( 'removes the drawn n cards from the deck' );

      it( 'cannot draw more than the remaining number of cards' );

    });

    describe( '.drawWhere()', function() {

      it( 'exists', function() {
        expect( deck ).to.have.property( 'drawWhere' );
      });

      it( 'is a function', function() {
        expect( deck.drawWhere ).to.be.a( 'function' );
      });

      it( 'draws (returns) the next card in the deck that passes a filter function' );

      it( 'removes the drawn card from the deck' );

      it( 'draws (returns) an array of the next n cards passing a filter function' );

      it( 'removes the drawn n cards from the deck' );

      it( 'cannot draw more than the remaining number of cards' );

    });

    describe( '.drawRandom()', function() {

      it( 'exists', function() {
        expect( deck ).to.have.property( 'drawRandom' );
      });

      it( 'is a function', function() {
        expect( deck.drawRandom ).to.be.a( 'function' );
      });

      it( 'draws (returns) a random card in the deck' );

      it( 'removes the drawn card from the deck' );

      it( 'draws (returns) an array of n cards chosen randomly from the deck' );

      it( 'removes the drawn n cards from the deck' );

      it( 'cannot draw more than the remaining number of cards' );

    });

    describe( '.discardToBottom()', function() {

      it( 'exists', function() {
        expect( deck ).to.have.property( 'discardToBottom' );
      });

      it( 'is a function', function() {
        expect( deck.discardToBottom ).to.be.a( 'function' );
      });

      it( 'returns a card object to the bottom of the deck' );

      it( 'returns an array of cards to the bottom of the deck in order' );

    });

    describe( '.shuffleToBottom()', function() {

      it( 'exists', function() {
        expect( deck ).to.have.property( 'shuffleToBottom' );
      });

      it( 'is a function', function() {
        expect( deck.shuffleToBottom ).to.be.a( 'function' );
      });

      it( 'returns a card object to the bottom of the deck', function() {
        deck.shuffleToBottom( 'bottomcard' );
        var bottomCard = deck.bottom();
        expect( bottomCard ).to.equal( 'bottomcard' );
      });

      it( 'returns an array of cards to the bottom of the deck in random order' );

    });

    describe( '.discardToTop()', function() {

      it( 'exists', function() {
        expect( deck ).to.have.property( 'discardToTop' );
      });

      it( 'is a function', function() {
        expect( deck.discardToTop ).to.be.a( 'function' );
      });

      it( 'returns a card object to the top of the deck', function() {
        deck.discardToTop( 'topcard' );
        var topCard = deck.top();
        expect( topCard ).to.equal( 'topcard' );
      });

      it( 'returns an array of cards to the top of the deck in order' );

    });

    describe( '.shuffleToTop()', function() {

      it( 'exists', function() {
        expect( deck ).to.have.property( 'shuffleToTop' );
      });

      it( 'is a function', function() {
        expect( deck.shuffleToTop ).to.be.a( 'function' );
      });

      it( 'returns a card object to the top of the deck', function() {
        deck.shuffleToTop( 'topcard' );
        expect( deck.top() ).to.equal( 'topcard' );
      });

      it( 'returns an array of cards to the top of the deck in random order' );

    });

    describe( '.discardRandom()', function() {

      it( 'exists', function() {
        expect( deck ).to.have.property( 'discardRandom' );
      });

      it( 'is a function', function() {
        expect( deck.discardRandom ).to.be.a( 'function' );
      });

      it( 'returns a card object to a random location within the deck' );

      it( 'returns an array of cards to random locations within the deck' );

    });

    describe( '.top', function() {

      it( 'exists', function() {
        expect( deck ).to.have.property( 'top' );
      });

      it( 'is a function', function() {
        expect( deck.top ).to.be.a( 'function' );
      });

      it( 'returns the top card on the deck', function() {
        expect( deck.top() ).to.equal( 'a' );
      });

      it( 'does not remove the returned card from the deck', function() {
        deck.top();
        expect( deck.remaining() ).to.equal( 5 );
      });

      it( 'returns the top n cards on the deck', function() {
        expect( deck.top( 2 ) ).to.deep.equal([ 'a', 'b' ]);
        expect( deck.top( 4 ) ).to.deep.equal([ 'a', 'b', 'c', 'd' ]);
      });

      it( 'does not remove the returned n cards from the deck', function() {
        deck.top( 4 );
        expect( deck.remaining() ).to.equal( 5 );
      });

      it( 'returns undefined if the deck is empty', function() {
        deck.cards([]);
        expect( deck.top() ).to.be.undefined;
      });

    });

    describe( '.bottom', function() {

      it( 'exists', function() {
        expect( deck ).to.have.property( 'bottom' );
      });

      it( 'is a function', function() {
        expect( deck.bottom ).to.be.a( 'function' );
      });

      it( 'returns the bottom card on the deck', function() {
        expect( deck.bottom() ).to.equal( 'e' );
      });

      it( 'does not remove the returned card from the deck', function() {
        deck.bottom();
        expect( deck.remaining() ).to.equal( 5 );
      });

      it( 'returns the bottom n cards on the deck', function() {
        expect( deck.bottom( 2 ) ).to.deep.equal([ 'e', 'd' ]);
        expect( deck.bottom( 4 ) ).to.deep.equal([ 'e', 'd', 'c', 'b' ]);
      });

      it( 'does not remove the returned n cards from the deck', function() {
        deck.bottom( 2 );
        expect( deck.remaining() ).to.equal( 5 );
      });

      it( 'returns undefined if the deck is empty', function() {
        deck.cards([]);
        expect( deck.bottom() ).to.be.undefined;
      });

    });

    describe( '.random', function() {

      it( 'exists', function() {
        expect( deck ).to.have.property( 'random' );
      });

      it( 'is a function', function() {
        expect( deck.random ).to.be.a( 'function' );
      });

      it( 'returns a random card in the deck' );

      it( 'does not remove the returned card from the deck' );

      it( 'returns n random cards in the deck' );

      it( 'does not remove the returned n cards from the deck' );

      it( 'returns undefined if the deck is empty', function() {
        deck.cards([]);
        expect( deck.random() ).to.be.undefined;
      });

    });

  });

});