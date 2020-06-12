const two = { num: 2, value: 2, face: '2', suit: 'clubs' };
const three = { num: 3, value: 3, face: '3', suit: 'clubs' };
const four = { num: 4, value: 4, face: '4', suit: 'clubs' };
const five = { num: 5, value: 5, face: '5', suit: 'clubs' };
const six = { num: 6, value: 6, face: '6', suit: 'clubs' };

export const dealResponse = {
  dealer_cards: [two, three],
  player_cards: [four, five],
  balance: 100,
  player_total: 4 + 5,
  dealer_total: 2 + 3,
  status: 'PLAYING',
  deck: [1, 2, 3],
};

export const hitResponse = {
  ...dealResponse,
  player_cards: [four, five, six],
  player_total: 4 + 5 + 6,
};

export const stayResponse = {
  ...dealResponse,
  dealer_cards: [two, three, six],
  dealer_total: 2 + 3 + 6,
  status: 'LOSE',
};
