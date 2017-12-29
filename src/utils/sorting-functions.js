export function sortByName(a, b) {
  let textA = a.name.toUpperCase();
  let textB = b.name.toUpperCase();
  return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
}

export function sortBySuit(a, b) {
  if (a.suit === 'wild') {
    return 1;
  } else if (b.suit === 'wild') {
    return -1;
  }
  return (+(a.suit > b.suit) || +(a.suit === b.suit) - 1) || (+(a.name > b.name) || +(a.name === b.name) - 1);
}
