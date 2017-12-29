import React, { Component } from 'react';
import {
  cards,
  ARMY,
  ARTIFACT,
  BEAST,
  FLAME,
  FLOOD,
  LAND,
  LEADER,
  WEAPON,
  WEATHER,
  WILD,
  WIZARD,
} from '../../utils/cards'
import './card.scss';

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookOfChangesCard: null,
      bookOfChangesSuit: null,
    };
  }

  integerChangeHandler(func, event) {
    func(parseInt(event.target.value, 10));
  }

  islandDropdown() {
    const eligableCards = this.props.hand.reduce((filtered, card) => {
      if ((card.suit === FLAME || card.suit === FLOOD) && card.id !== 9) {
        filtered.push(<option value={card.id} key={`island-select-${card.id}`}>{card.name}</option>);
      }
      return filtered;
    }, []);

    return (
      <select onChange={this.integerChangeHandler.bind(this, this.props.updateIslandCard)}>
        <option value={null}>-- Choose a Card --</option>
        {eligableCards}
      </select>
    );
  }

  bookOfChangesDropdown() {
    const otherCards = this.props.hand.reduce((filtered, card) => {
      if (card.id !== 49) {
        filtered.push(<option value={card.id} key={`bookofchanges-select-${card.id}`}>{card.name}</option>);
      }
      return filtered;
    }, []);

    return (
      <div>
        <select value={this.state.bookOfChangesCard} onChange={this.bookOfChangesCardHandler.bind(this)}>
          <option value={null}>-- Choose a Card --</option>
          {otherCards}
        </select>
        <select className="capitalize" value={this.state.bookOfChangesSuit} onChange={this.bookOfChangesSuitHandler.bind(this)}>
          <option value={null}>-- Choose a Suit --</option>
          <option value={ARMY}>{ARMY}</option>
          <option value={ARTIFACT}>{ARTIFACT}</option>
          <option value={BEAST}>{BEAST}</option>
          <option value={FLAME}>{FLAME}</option>
          <option value={FLOOD}>{FLOOD}</option>
          <option value={LAND}>{LAND}</option>
          <option value={LEADER}>{LEADER}</option>
          <option value={WEAPON}>{WEAPON}</option>
          <option value={WEATHER}>{WEATHER}</option>
          <option value={WILD}>{WILD}</option>
          <option value={WIZARD}>{WIZARD}</option>
        </select>
      </div>
    );
  }

  bookOfChangesCardHandler(event) {
    const cardID = parseInt(event.target.value, 10);
    this.setState({
        bookOfChangesCard: cardID,
        bookOfChangesSuit: null,
      },
      this.props.updateBookofchangesCard(cardID, null)
    );
  }

  bookOfChangesSuitHandler(event) {
    const suit = event.target.value;
    this.setState({
        bookOfChangesSuit: suit,
      },
      this.props.updateBookofchangesCard(this.state.bookOfChangesCard, suit)
    );
  }

  dopplegangerDropdown() {
    const otherCards = cards.reduce((filtered, card) => {
      if (card.id !== 53) {
        filtered.push(<option value={card.id} key={`doppleganger-select-${card.id}`}>{card.name}</option>);
      }
      return filtered;
    }, []);

    return (
      <select onChange={this.integerChangeHandler.bind(this, this.props.updateDopplegangerCard)}>
        <option value={53}>-- Choose a Card --</option>
        {otherCards}
      </select>
    );
  }

  mirageDropdown() {
    const otherCards = cards.reduce((filtered, card) => {
      if (card.suit === ARMY || card.suit === LAND || card.suit === WEATHER || card.suit === FLOOD || card.suit === FLAME) {
        filtered.push(<option value={card.id} key={`mirage-select-${card.id}`}>{card.name}</option>);
      }
      return filtered;
    }, []);

    return (
      <select onChange={this.integerChangeHandler.bind(this, this.props.updateMirageCard)}>
        <option value={52}>-- Choose a Card --</option>
        {otherCards}
      </select>
    );
  }

  shapeshifterDropdown() {
    const otherCards = cards.reduce((filtered, card) => {
      if (card.suit === ARTIFACT || card.suit === LEADER || card.suit === WIZARD || card.suit === WEAPON || card.suit === BEAST) {
        filtered.push(<option value={card.id} key={`shapeshifter-select-${card.id}`}>{card.name}</option>);
      }
      return filtered;
    }, []);

    return (
      <select onChange={this.integerChangeHandler.bind(this, this.props.updateShapeshifterCard)}>
        <option value={51}>-- Choose a Card --</option>
        {otherCards}
      </select>
    );
  }

  render() {
    const cardBonus = this.props.card.blanked ? 0 : this.props.card.bonusScore(this.props.hand);
    const cardPenalty = this.props.card.blanked || this.props.card.cleared ? 0 : this.props.card.penaltyScore(this.props.hand);

    let cssClass = 'card';
    if (this.props.showScore) {
      cssClass += ' card--in-hand';
    }
    if (this.props.hand.find(cardToFind => cardToFind.id === this.props.card.id)) {
      cssClass += ' card--selected';
    }
    if (this.props.card.cleared) {
      cssClass += ' card--cleared';
    }
    if (this.props.card.blanked) {
      cssClass += ' card--blanked';
    }
    cssClass += ` card--${this.props.card.suit}`;

    return (
      <div className={cssClass} onClick={this.props.onClick}>
        {this.props.showScore && <div className="card__close" onClick={this.props.removeCard}>&times;</div>}
        <h3>{this.props.card.name}</h3>
        {this.props.showScore &&
          <table className="card__score-table">
            <tr>
              <td>Base</td>
              <td>{this.props.card.strength}</td>
            </tr>
            <tr>
              <td>Bonus</td>
              <td>{cardBonus}</td>
            </tr>
            <tr>
              <td className="card__score-table__penalty-score">Penalty</td>
              <td>{cardPenalty}</td>
            </tr>
            <tr className="card__score-table__total-score">
              <td>Total</td>
              <td>{this.props.card.strength + cardBonus + cardPenalty}</td>
            </tr>
          </table>
        }
        {this.props.showScore && this.props.card.id === 9 && this.islandDropdown()}
        {this.props.showScore && this.props.card.id === 49 && this.bookOfChangesDropdown()}
        {this.props.showScore && this.props.card.id === 53 && this.dopplegangerDropdown()}
        {this.props.showScore && this.props.card.id === 52 && this.mirageDropdown()}
        {this.props.showScore && this.props.card.id === 51 && this.shapeshifterDropdown()}
        <div className="card__id">{this.props.card.id}</div>
      </div>
    )
  }
}
