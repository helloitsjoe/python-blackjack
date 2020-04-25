import { h } from 'preact';
import { render, wait, fireEvent } from '@testing-library/preact';
import App from '../src/app';

const two = { value: 2, face: '2', suit: 'club' };
const three = { value: 3, face: '3', suit: 'club' };
const four = { value: 4, face: '4', suit: 'club' };
const five = { value: 5, face: '5', suit: 'club' };

describe('Cards', () => {
  test('Renders no cards before deal', () => {
    const { queryByTestId } = render(<App />);
    expect(queryByTestId('card')).toBeFalsy();
  });

  test('Deals cards', async () => {
    const cards = { dealer_cards: [two, three], player_cards: [four, five], player_total: 9 };
    const send = jest.fn().mockResolvedValue(cards);
    const { debug, queryAllByTestId, queryByText, queryByLabelText } = render(<App send={send} />);
    fireEvent.click(queryByText(/deal/i));
    await wait(() => {
      expect(queryAllByTestId('card').length).toBe(4);
    });
    expect(queryByText(/you/i).textContent).toMatch('9');
    expect(queryByText(/dealer/i).textContent).toMatch('3');
  });
});
