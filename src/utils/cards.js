const suits = [
  'army',
  'artifact',
  'beast',
  'flame',
  'flood',
  'land',
  'leader',
  'weapon',
  'weather',
  'wild',
  'wizard',
];

export const [
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
] = suits;

let none = () => {};
let zero = () => 0;

function countOfSuit(hand, suit, cardToExclude = { id: -1 }) {
  return hand.filter(filterCard => {
    return !filterCard.blanked && filterCard.id !== cardToExclude.id && filterCard.suit === suit;
  }).length;
}

function hasSuit(hand, suit) {
  return countOfSuit(...arguments) > 0;
}

function hasCard(hand, cardID) {
  const cardNameToMatch = cards.find(card => card.id === cardID).name;
  return hand.filter(card => card.name === cardNameToMatch).length > 0;
}

export const cards = [
  {
    id: 15,
		name: 'Air Elemental',
		suit: WEATHER,
		strength: 4,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: none,
    bonusScore: function(hand) {
      return 15 * countOfSuit(hand, WEATHER, this);
    },
    penaltyScore: zero,
  },
  {
    id: 37,
		name: 'Basilisk',
		suit: BEAST,
		strength: 35,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: function(hand, card) {
      return (
        card.id !== this.id &&
        (
          (card.suit === ARMY && !hasCard(hand, 25)) ||
          card.suit === LEADER ||
          card.suit === BEAST
        )
      );
    },
    bonusScore: zero,
    penaltyScore: zero,
  },
  {
    id: 27,
		name: 'Beastmaster',
		suit: WIZARD,
		strength: 9,
		cleared: false,
		blanked: false,
    clears: function(hand, card) {
      return card.suit === BEAST;
    },
    blanks: none,
    bonusScore: function(hand) {
      return 9 * countOfSuit(hand, BEAST);
    },
    penaltyScore: zero,
  },
  {
    id: 3,
		name: 'Bell Tower',
		suit: LAND,
		strength: 8,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: none,
    bonusScore: function(hand) {
      return hasSuit(hand, WIZARD) ? 15 : 0;
    },
    penaltyScore: zero,
  },
  {
    id: 12,
		name: 'Blizzard',
		suit: WEATHER,
		strength: 30,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: function(hand, card) {
      return card.suit === FLOOD;
    },
    bonusScore: zero,
    penaltyScore: function(hand) {
      const leaders = countOfSuit(hand, LEADER);
      const beasts = countOfSuit(hand, BEAST);
      const flames = countOfSuit(hand, FLAME);
      const armies = hasCard(hand, 25) ? 0 : countOfSuit(hand, ARMY);
      return -5 * (leaders + beasts + flames + armies);
    },
  },
  {
    id: 49,
		name: 'Book of Changes',
		suit: ARTIFACT,
		strength: 3,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: none,
    bonusScore: zero,
    penaltyScore: zero,
  },
  {
    id: 17,
		name: 'Candle',
		suit: FLAME,
		strength: 2,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: none,
    bonusScore: function(hand) {
      return hasCard(hand, 49) && hasCard(hand, 3) && hasSuit(hand, WIZARD) ? 100 : 0;
    },
    penaltyScore: zero,
  },
  {
    id: 2,
		name: 'Cavern',
		suit: LAND,
		strength: 6,
		cleared: false,
		blanked: false,
    clears: function(hand, card) {
      return card.suit === WEATHER;
    },
    blanks: none,
    bonusScore: function(hand) {
      return hasCard(hand, 24) || hasCard(hand, 39) ? 25 : 0;
		},
    penaltyScore: zero,
  },
  {
    id: 26,
		name: 'Collector',
		suit: WIZARD,
		strength: 7,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: none,
    bonusScore: function(hand) {
      let suitCounts = suits.map(suit => countOfSuit(hand, suit));
      let maxOfAKind = Math.max(...suitCounts);
      if (maxOfAKind === 3) {
        return 10;
      } else if (maxOfAKind === 4) {
        return 40;
      } else if (maxOfAKind >= 5) {
        return 100;
      } else {
        return 0;
      }
    },
    penaltyScore: zero,
  },
  {
    id: 53,
		name: 'Doppelganger',
		suit: WILD,
		strength: 0,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: none,
    bonusScore: zero,
    penaltyScore: zero,
  },
  {
    id: 39,
		name: 'Dragon',
		suit: BEAST,
		strength: 30,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: none,
    bonusScore: zero,
    penaltyScore: function(hand) {
      return hasSuit(hand, WIZARD) ? 0 : -40;
    },
  },
  {
    id: 24,
		name: 'Dwarvish Infantry',
		suit: ARMY,
		strength: 15,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: none,
    bonusScore: zero,
    penaltyScore: function(hand) {
      return hasCard(hand, 25) ? 0 : -2 * countOfSuit(hand, ARMY, this);
    },
  },
  {
    id: 5,
		name: 'Earth Elemantal',
		suit: LAND,
		strength: 4,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: none,
    bonusScore: function(hand) {
      return 15 * countOfSuit(hand, LAND, this);
    },
    penaltyScore: zero,
  },
  {
    id: 22,
		name: 'Elven Archers',
		suit: ARMY,
		strength: 10,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: none,
    bonusScore: function(hand) {
      return hasSuit(hand, WEATHER) ? 0 : 5;
    },
    penaltyScore: zero,
  },
  {
    id: 44,
		name: 'Elven Longbow',
		suit: WEAPON,
		strength: 3,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: none,
    bonusScore: function(hand) {
			return hasCard(hand, 22) || hasCard(hand, 34) || hasCard(hand, 27) ? 30 : 0;
		},
    penaltyScore: zero,
  },
  {
    id: 35,
		name: 'Empress',
		suit: LEADER,
		strength: 15,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: none,
    bonusScore: function(hand) {
			return 10 * countOfSuit(hand, ARMY);
		},
    penaltyScore: function(hand) {
			return -5 * countOfSuit(hand, LEADER, this);
    },
  },
  {
    id: 30,
		name: 'Enchantress',
		suit: WIZARD,
		strength: 5,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: none,
    bonusScore: function(hand) {
      let suitsCount = [LAND, WEATHER, FLOOD, FLAME].reduce((sum, suit) => {
        return sum + countOfSuit(hand, suit);
      }, 0);
			return 5 * suitsCount;
		},
    penaltyScore: zero,
  },
  {
    id: 20,
		name: 'Fire Elemental',
		suit: FLAME,
		strength: 4,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: none,
    bonusScore: function(hand) {
			return 15 * countOfSuit(hand, FLAME, this);
		},
    penaltyScore: zero,
  },
  {
    id: 4,
		name: 'Forest',
		suit: LAND,
		strength: 7,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: none,
    bonusScore: function(hand) {
			return 12 * (countOfSuit(hand, BEAST) + (hasCard(hand, 22) ? 1 : 0));
		},
    penaltyScore: zero,
  },
  {
    id: 18,
		name: 'Forge',
		suit: FLAME,
		strength: 9,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: none,
    bonusScore: function(hand) {
			return 9 * (countOfSuit(hand, WEAPON) + countOfSuit(hand, ARTIFACT));
		},
    penaltyScore: zero,
  },
  {
    id: 6,
		name: 'Fountain of Life',
		suit: FLOOD,
		strength: 1,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: none,
    bonusScore: function(hand) {
      let cardStrengths = hand.map(card => {
        return [WEAPON, FLOOD, FLAME, LAND, WEATHER].includes(card.suit) && card.id !== 6 ? card.strength : 0;
      });
      return Math.max(...cardStrengths);
    },
    penaltyScore: zero,
  },
  {
    id: 47,
		name: 'Gem of Order',
		suit: ARTIFACT,
		strength: 5,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: none,
    bonusScore: function(hand) {
      let strengths = hand.map(card => card.strength).sort((a, b) => a - b);

      let counts = [];
      let count = 0;
      for (let i = 0; i <= 40; i++) {
        if (strengths.includes(i)) {
          counts.push(++count);
        } else {
          count = 0;
        }
      }
      let maxRun = Math.max(...counts);

      if (maxRun === 3) {
        return 10;
      } else if (maxRun === 4) {
        return 30;
      } else if (maxRun === 5) {
        return 60;
      } else if (maxRun === 6) {
        return 100;
      } else if (maxRun >= 7) {
        return 150;
      } else {
        return 0;
      }
    },
    penaltyScore: zero,
  },
  {
    id: 8,
		name: 'Great Flood',
		suit: FLOOD,
		strength: 32,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: function(hand, card) {
      return (card.suit === ARMY && !hasCard(hand, 25) && !hasCard(hand, 41)) ||
        (card.suit === LAND && card.id !== 1) ||
        (card.suit === FLAME && card.id !== 19);
		},
    bonusScore: zero,
    penaltyScore: zero,
  },
  {
    id: 40,
		name: 'Hydra',
		suit: BEAST,
		strength: 12,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: none,
    bonusScore: function(hand) {
			return hasCard(hand, 7) ? 28 : 0;
		},
    penaltyScore: zero,
  },
  {
    id: 9,
		name: 'Island',
		suit: FLOOD,
		strength: 14,
		cleared: false,
		blanked: false,
    clears: function(hand, card) {
      return card.id === this.cardToClear;
		},
    blanks: none,
    bonusScore: zero,
    penaltyScore: zero,
    cardToClear: null,
  },
  {
    id: 31,
		name: 'King',
		suit: LEADER,
		strength: 8,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: none,
    bonusScore: function(hand) {
			return (hasCard(hand, 32) ? 20 : 5) * countOfSuit(hand, ARMY);
		},
    penaltyScore: zero,
  },
  {
    id: 21,
		name: 'Knights',
		suit: ARMY,
		strength: 20,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: none,
    bonusScore: zero,
    penaltyScore: function(hand) {
			return hasSuit(hand, LEADER) ? 0 : -8;
    },
  },
  {
    id: 23,
		name: 'Light Cavalry',
		suit: ARMY,
		strength: 17,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: none,
    bonusScore: zero,
    penaltyScore: function(hand) {
			return -2 * countOfSuit(hand, LAND);
		},
  },
  {
    id: 19,
		name: 'Lightning',
		suit: FLAME,
		strength: 11,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: none,
    bonusScore: function(hand) {
			return hasCard(hand, 11) ? 30 : 0;
		},
    penaltyScore: zero,
  },
  {
    id: 42,
		name: 'Magic Wand',
		suit: WEAPON,
		strength: 1,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: none,
    bonusScore: function(hand) {
			return hasSuit(hand, WIZARD) ? 25 : 0;
		},
    penaltyScore: zero,
  },
  {
    id: 1,
		name: 'Mountain',
		suit: LAND,
		strength: 9,
		cleared: false,
		blanked: false,
    clears: function(hand, card) {
      return card.suit === FLOOD;
		},
    blanks: none,
    bonusScore: function(hand) {
			return (hasCard(hand, 13) && hasCard(hand, 16)) ? 50 : 0;
		},
    penaltyScore: zero,
  },
  {
    id: 52,
		name: 'Mirage',
		suit: WILD,
		strength: 0,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: none,
    bonusScore: zero,
    penaltyScore: zero,
  },
  {
    id: 28,
		name: 'Necromancer',
		suit: WIZARD,
		strength: 3,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: none,
    bonusScore: zero,
    penaltyScore: zero,
  },
  {
    id: 33,
		name: 'Princess',
		suit: LEADER,
		strength: 2,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: none,
    bonusScore: function(hand) {
			return 8 * (countOfSuit(hand, ARMY) + countOfSuit(hand, WIZARD) + countOfSuit(hand, LEADER, this));
		},
    penaltyScore: zero,
  },
  {
    id: 50,
		name: 'Protection Rune',
		suit: ARTIFACT,
		strength: 1,
		cleared: false,
		blanked: false,
    clears: function(hand, card) {
      return true;
		},
    blanks: none,
    bonusScore: zero,
    penaltyScore: zero,
  },
  {
    id: 32,
		name: 'Queen',
		suit: LEADER,
		strength: 6,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: none,
    bonusScore: function(hand) {
			return (hasCard(hand, 31) ? 20 : 5) * countOfSuit(hand, ARMY);
		},
    penaltyScore: zero,
  },
  {
    id: 11,
		name: 'Rainstorm',
		suit: WEATHER,
		strength: 8,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: function(hand, card) {
      return card.suit === FLAME && card.id !== 19;
		},
    bonusScore: function(hand) {
			return 10 * countOfSuit(hand, FLOOD);
		},
    penaltyScore: zero,
  },
  {
    id: 25,
		name: 'Rangers',
		suit: ARMY,
		strength: 5,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: none,
    bonusScore: function(hand) {
			return 10 * countOfSuit(hand, LAND);
		},
    penaltyScore: zero,
  },
  {
    id: 51,
		name: 'Shapeshifter',
		suit: WILD,
		strength: 0,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: none,
    bonusScore: zero,
    penaltyScore: zero,
  },
  {
    id: 46,
		name: 'Shield of Keth',
		suit: ARTIFACT,
		strength: 4,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: none,
    bonusScore: function(hand) {
			return hasSuit(hand, LEADER) ? hasCard(hand, 43) ? 40 : 15 : 0;
		},
    penaltyScore: zero,
  },
  {
    id: 13,
		name: 'Smoke',
		suit: WEATHER,
		strength: 27,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: function(hand, card) {
      return card.id === this.id && !hasSuit(hand, FLAME);
		},
    bonusScore: zero,
    penaltyScore: zero,
  },
  {
    id: 7,
		name: 'Swamp',
		suit: FLOOD,
		strength: 18,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: none,
    bonusScore: zero,
    penaltyScore: function(hand) {
			return -3 * ((hasCard(hand, 25) || hasCard(hand, 41) ? 0 : countOfSuit(hand, ARMY)) + countOfSuit(hand, FLAME));
		},
  },
  {
    id: 43,
		name: 'Sword of Keth',
		suit: WEAPON,
		strength: 7,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: none,
    bonusScore: function(hand) {
			return hasSuit(hand, LEADER) ? hasCard(hand, 46) ? 40 : 10 : 0;
		},
    penaltyScore: zero,
  },
  {
    id: 36,
		name: 'Unicorn',
		suit: BEAST,
		strength: 9,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: none,
    bonusScore: function(hand) {
			return hasCard(hand, 33) ? 30 : (hasCard(hand, 32) || hasCard(hand, 35) || hasCard(hand, 30)) ? 15 : 0;
		},
    penaltyScore: zero,
  },
  {
    id: 45,
		name: 'War Dirigible',
		suit: WEAPON,
		strength: 35,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: function(hand, card) {
      return card.id === this.id && (!hasSuit(hand, ARMY) || hasSuit(hand, WEATHER));
		},
    bonusScore: zero,
    penaltyScore: zero,
  },
  {
    id: 38,
		name: 'Warhorse',
		suit: BEAST,
		strength: 6,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: none,
    bonusScore: function(hand) {
			return hasSuit(hand, LEADER) || hasSuit(hand, WIZARD) ? 14 : 0;
		},
    penaltyScore: zero,
  },
  {
    id: 29,
		name: 'Warlock Lord',
		suit: WIZARD,
		strength: 25,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: none,
    bonusScore: zero,
    penaltyScore: function(hand) {
			return -10 * (countOfSuit(hand, LEADER) + countOfSuit(hand, WIZARD, this));
		},
  },
  {
    id: 34,
		name: 'Warlord',
		suit: LEADER,
		strength: 4,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: none,
    bonusScore: function(hand) {
      return hand.reduce((sum, card) => {
        return sum + (card.suit === ARMY ? card.strength : 0);
      }, 0);
    },
    penaltyScore: zero,
  },
  {
    id: 41,
		name: 'Warship',
		suit: WEAPON,
		strength: 23,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: function(hand, card) {
      return card.id === this.id && !hasSuit(hand, FLOOD);
		},
    bonusScore: zero,
    penaltyScore: zero,
  },
  {
    id: 10,
		name: 'Water Elemental',
		suit: FLOOD,
		strength: 4,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: none,
    bonusScore: function(hand) {
			return 15 * countOfSuit(hand, FLOOD, this);
		},
    penaltyScore: zero,
  },
  {
    id: 14,
		name: 'Whirlwind',
		suit: WEATHER,
		strength: 13,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: none,
    bonusScore: function(hand) {
			return hasCard(hand, 11) && (hasCard(hand, 12) || hasCard(hand, 8)) ? 40 : 0;
		},
    penaltyScore: zero,
  },
  {
    id: 16,
		name: 'Wildfire',
		suit: FLAME,
		strength: 40,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: function(hand, card) {
      return !([FLAME, WIZARD, WEATHER, WEAPON, ARTIFACT].includes(card.suit) || [1, 8, 9, 36, 39].includes(card.id));
		},
    bonusScore: zero,
    penaltyScore: zero,
  },
  {
    id: 48,
		name: 'World Tree',
		suit: ARTIFACT,
		strength: 2,
		cleared: false,
		blanked: false,
    clears: none,
    blanks: none,
    bonusScore: function(hand) {
      const handSuits = hand.map(card => card.suit);
      return (new Set(handSuits)).size === handSuits.length && handSuits.length >= 7 ? 50 : 0;
    },
    penaltyScore: zero,
  },
];
