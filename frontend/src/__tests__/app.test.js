// import { h } from 'preact';
import React from 'react';
import { render, wait, fireEvent, waitForElement } from '@testing-library/preact';
import App from '../app';
import { dealResponse, hitResponse, stayResponse } from '../mock-data';

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
