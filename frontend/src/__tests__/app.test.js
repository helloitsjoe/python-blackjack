// import { h } from 'preact';
import React from 'react';
import { render, wait, fireEvent, waitForElement } from '@testing-library/preact';
import App from '../app';

const two = { num: 2, value: 2, face: '2', suit: 'clubs' };
const three = { num: 3, value: 3, face: '3', suit: 'clubs' };
const four = { num: 4, value: 4, face: '4', suit: 'clubs' };
const five = { num: 5, value: 5, face: '5', suit: 'clubs' };
const six = { num: 6, value: 6, face: '6', suit: 'clubs' };

const dealResponse = {
  dealer_cards: [two, three],
  player_cards: [four, five],
  balance: 100,
  player_total: 4 + 5,
  dealer_total: 2 + 3,
  status: 'PLAYING',
  deck: [1, 2, 3],
};

const hitResponse = {
  ...dealResponse,
  player_cards: [four, five, six],
  player_total: 4 + 5 + 6,
};

const stayResponse = {
  ...dealResponse,
  dealer_cards: [two, three, six],
  dealer_total: 2 + 3 + 6,
  status: 'LOSE',
};

describe('Cards', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Renders no cards before deal', () => {
    const { queryByTestId, queryByText } = render(<App />);
    expect(queryByText(/deal/i)).toBeTruthy();
    expect(queryByTestId('card')).toBeFalsy();
  });

  test('Deals cards', async () => {
    const send = jest.fn().mockResolvedValue(dealResponse);
    const { queryAllByTestId, queryByText } = render(<App send={send} />);
    fireEvent.click(queryByText(/deal/i));
    await wait(() => {
      expect(queryAllByTestId('card').length).toBe(4);
    });
    expect(queryByText(/you/i).textContent).toMatch('9');
    expect(queryByText(/dealer/i).textContent).toMatch('3');
  });

  test('Stay', async () => {
    const send = jest.fn().mockResolvedValueOnce(dealResponse).mockResolvedValueOnce(stayResponse);
    const { queryByTestId, findAllByTestId, queryByText, findByText } = render(<App send={send} />);
    expect(queryByTestId('card')).toBeNull();
    fireEvent.click(queryByText(/deal/i));
    await findAllByTestId('card');
    fireEvent.click(queryByText(/stay/i));
    await findByText('6');
    expect(queryByText(/you:/i).textContent).toMatch('9');
    expect(queryByText(/dealer:/i).textContent).toMatch('11');
  });

  test('Hit', async () => {
    const send = jest.fn().mockResolvedValueOnce(dealResponse).mockResolvedValueOnce(hitResponse);
    const { queryByTestId, findAllByTestId, queryByText, findByText } = render(<App send={send} />);
    expect(queryByTestId('card')).toBeNull();
    fireEvent.click(queryByText(/deal/i));
    await findAllByTestId('card');
    fireEvent.click(queryByText(/hit/i));
    await findByText('6');
    expect(queryByText(/you:/i).textContent).toMatch('15');
    expect(queryByText(/dealer:/i).textContent).toMatch('3');
  });

  test('Double down', async () => {
    const send = jest.fn().mockResolvedValueOnce(dealResponse).mockResolvedValueOnce(hitResponse);
    const { queryByTestId, findAllByTestId, queryByText, findByText } = render(<App send={send} />);
    expect(queryByTestId('card')).toBeNull();
    fireEvent.click(queryByText(/deal/i));
    await findAllByTestId('card');
    fireEvent.click(queryByText(/double/i));
    await findByText('6');
    expect(queryByText(/you:/i).textContent).toMatch('15');
    expect(queryByText(/dealer:/i).textContent).toMatch('5');
  });
});
