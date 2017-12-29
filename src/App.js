import React, { Component } from 'react';
import Card from './components/card/card';
import { cards } from './utils/cards';
import { sortBySuit } from './utils/sorting-functions';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hand: [],
      baseScore: 0,
      bonusScore: 0,
      penaltyScore: 0,
    };
    this.resetHand = this.resetHand.bind(this);
  }

  toggleToHand(card) {
    this.setState(prevState => {
        let newHand = [];
        if (prevState.hand.find(cardToFind => cardToFind.id === card.id)) {
          newHand = prevState.hand.filter(cardToFind => cardToFind.id !== card.id);
        } else {
          newHand = [...prevState.hand, {...card}];
        }
        newHand = this.doHandClears(newHand);
        newHand = this.doHandBlanks(newHand);
        return {
          hand: newHand,
        };
      },
      this.calculateHand
    );
  }

  resetHand() {
    this.setState(prevState => ({
        hand: [],
      }),
      this.calculateHand
    );
  }

  calculateHand() {
    this.setState(prevState => ({
      baseScore: this.getHandBaseScore(),
      bonusScore: this.getHandBonusScore(),
      penaltyScore: this.getHandPenaltyScore(),
    }));
  }

  getHandBaseScore() {
    return this.state.hand.reduce((sum, card) => {
      if (card.blanked) {
        return sum;
      }
      return sum + card.strength;
    }, 0);
  }

  getHandBonusScore() {
    return this.state.hand.reduce((sum, card) => {
      if (card.blanked) {
        return sum;
      }
      return sum + card.bonusScore(this.state.hand);
    }, 0);
  }

  // penalty counts should ignore blanked cards
  getHandPenaltyScore() {
    return this.state.hand.reduce((sum, card) => {
      if (card.blanked || card.cleared) {
        return sum;
      }
      return sum + card.penaltyScore(this.state.hand);
    }, 0);
  }

  doHandClears(hand) {
    let clearLogic = hand.map(card => card.clears.bind(card));
    hand.forEach(card => {
      card.cleared = clearLogic.some(func => func(hand, card));
    });
    return hand;
  }

  doHandBlanks(hand) {
    // Wildfire is not technically a penalty
    let blankLogic = hand.filter(card => !card.cleared || card.id === 16).map(card => card.blanks.bind(card));
    hand.forEach(card => {
      card.blanked = blankLogic.some(func => func(hand, card));
    });
    return hand;
  }

  doIslandChoice(cardToClearID) {
    this.setState(prevState => {
        let newHand = prevState.hand;
        newHand.find(card => card.id === 9).cardToClear = cardToClearID;
        newHand = this.doHandClears(newHand);
        newHand = this.doHandBlanks(newHand);
        return {
          hand: newHand,
        };
      },
      this.calculateHand
    );
  }

  doBookOfChangesChoice(cardToChangeID, suit) {
    if (cardToChangeID === null || suit === null) {
      return;
    }
    this.setState(prevState => {
        let newHand = prevState.hand;
        // TODO: Find more performant suit reset
        newHand.forEach(card => {
          card.suit = cards.find(originalCard => originalCard.id === card.id).suit;
        });
        newHand.find(card => card.id === cardToChangeID).suit = suit;
        newHand = this.doHandClears(newHand);
        newHand = this.doHandBlanks(newHand);
        return {
          hand: newHand,
        };
      },
      this.calculateHand
    );
  }

  doDopplegangerChoice(cardToImitateID) {
    this.setState(prevState => {
        let newHand = prevState.hand;
        let doppleganger = newHand.find(card => card.id === 53);
        let cardToImitate = cards.find(card => card.id === cardToImitateID)
        doppleganger.name = cardToImitate.name;
        doppleganger.strength = cardToImitate.strength;
        doppleganger.suit = cardToImitate.suit;
        doppleganger.penaltyScore = cardToImitate.penaltyScore;
        doppleganger.blanks = cardToImitate.blanks;
        newHand = this.doHandClears(newHand);
        newHand = this.doHandBlanks(newHand);
        return {
          hand: newHand,
        };
      },
      this.calculateHand
    );
  }

  doMirageChoice(cardToImitateID) {
    this.setState(prevState => {
        let newHand = prevState.hand;
        let mirage = newHand.find(card => card.id === 52);
        let cardToImitate = cards.find(card => card.id === cardToImitateID)
        mirage.name = cardToImitate.name;
        mirage.suit = cardToImitate.suit;
        newHand = this.doHandClears(newHand);
        newHand = this.doHandBlanks(newHand);
        return {
          hand: newHand,
        };
      },
      this.calculateHand
    );
  }

  doShapeshifterChoice(cardToImitateID) {
    this.setState(prevState => {
        let newHand = prevState.hand;
        let shapeshifter = newHand.find(card => card.id === 51);
        let cardToImitate = cards.find(card => card.id === cardToImitateID)
        shapeshifter.name = cardToImitate.name;
        shapeshifter.suit = cardToImitate.suit;
        newHand = this.doHandClears(newHand);
        newHand = this.doHandBlanks(newHand);
        return {
          hand: newHand,
        };
      },
      this.calculateHand
    );
  }

  render() {
    const handJSX = this.state.hand.map(card => {
      return (
        <Card
          card={card}
          hand={this.state.hand}
          key={`hand-${card.id}`}
          showScore={true}
          updateIslandCard={this.doIslandChoice.bind(this)}
          updateBookofchangesCard={this.doBookOfChangesChoice.bind(this)}
          updateDopplegangerCard={this.doDopplegangerChoice.bind(this)}
          updateMirageCard={this.doMirageChoice.bind(this)}
          updateShapeshifterCard={this.doShapeshifterChoice.bind(this)}
          removeCard={this.toggleToHand.bind(this, card)}
        />
      );
    });
    const deckJSX = cards.sort(sortBySuit).map(card => {
      return (
        <Card
          card={card}
          hand={this.state.hand}
          onClick={this.toggleToHand.bind(this, card)}
          key={`deck-${card.id}`}
        />
      );
    });

    return (
      <div>
        <div className="hand-header">
          <h1>
            Hand
            <button onClick={this.resetHand}>Reset</button>
          </h1>
          <div className="hand-header__score-row">
            <div>
              <h3>Base</h3>
              {this.state.baseScore}
            </div>
            +
            <div>
              <h3>Bonus</h3>
              {this.state.bonusScore}
            </div>
            +
            <div>
              <h3>Penalty</h3>
              {this.state.penaltyScore}
            </div>
            =
            <div>
              <h3>Total</h3>
              <strong>{this.state.baseScore + this.state.bonusScore + this.state.penaltyScore}</strong>
            </div>
          </div>
        </div>

        <div className="card-container">
          {handJSX}
        </div>

        <h1>Deck</h1>

        <div className="card-container">
          {deckJSX}
        </div>
      </div>
    );
  }
}

export default App;
