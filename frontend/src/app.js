import React, { forwardRef, Fragment, useState, useRef, useEffect, useReducer } from 'react';
import { getUrl, handleKeypress, sendCommand } from './utils';

console.log(`URL:`, getUrl());

const HIT = 'HIT';
const DEAL = 'DEAL';
const STAY = 'STAY';
const DOUBLE = 'DOUBLE';

const messages = {
  WAITING: 'WAITING...',
  PLAYING: 'PLAYING...',
  BUST: 'BUST!',
  BLACKJACK: 'BLACKJACK!',
  WIN: 'YOU WIN!',
  LOSE: 'YOU LOSE!',
  TIE: 'YOU TIE!',
};

const getTotal = cards => cards.reduce((acc, curr) => acc + curr.value, 0);
const hide = cards => [{ ...cards[0], value: 0, face: '', suit: '' }, ...cards.slice(1)];

const gameReducer = (s, a) => {
  console.log(`data:`, a.data);
  const {
    player_cards: playerCards,
    player_total: playerTotal,
    dealer_cards: dealerCards,
    dealer_total: dealerTotal,
    card,
    status,
    balance,
  } = a.data;

  switch (a.type) {
    case DEAL: {
      const hiddenDealer = hide(dealerCards);
      return {
        ...s,
        playerCards,
        playerTotal,
        dealerCards: hiddenDealer,
        dealerTotal: getTotal(hiddenDealer),
        balance: s.balance - s.bet,
        status: 'PLAYING',
      };
    }
    case HIT: {
      return { ...s, playerCards: [...s.playerCards, card], playerTotal, status };
    }
    case STAY: {
      return { ...s, dealerCards, dealerTotal, balance, status };
    }
    case DOUBLE: {
      const playerCards = [...s.playerCards, card];
      return { ...s, playerCards, dealerCards, dealerTotal, playerTotal, balance, status };
    }
    default:
      return s;
  }
};

export default function App({ send = sendCommand }) {
  const [
    { playerCards, playerTotal, dealerCards, dealerTotal, status, balance, bet },
    dispatch,
  ] = useReducer(gameReducer, {
    playerCards: [],
    dealerCards: [],
    playerTotal: 0,
    dealerTotal: 0,
    status: 'WAITING',
    balance: 1000,
    bet: 50,
  });

  const dealButton = useRef();
  const hitButton = useRef();

  useEffect(() => {
    if (status === 'PLAYING') {
      hitButton.current.focus();
    } else {
      dealButton.current.focus();
    }
  }, [status]);

  useEffect(() => {
    document.addEventListener('keypress', handleKeypress);
    return () => document.removeEventListener('keypress', handleKeypress);
  }, []);

  const deal = () =>
    send(DEAL, balance, bet).then(data => {
      dispatch({ type: DEAL, data });
    });

  const hit = () =>
    send(HIT).then(data => {
      dispatch({ type: HIT, data });
    });

  const stay = () =>
    send(STAY).then(data => {
      dispatch({ type: STAY, data });
    });

  const doubleDown = () =>
    send(DOUBLE).then(data => {
      dispatch({ type: DOUBLE, data });
    });

  const changeBet = e => {
    e.preventDefault();
    deal();
  };

  return (
    <div className="app">
      <div className="controls">
        <h2>${balance}</h2>
        <form onSubmit={changeBet}>
          <label className="controls-bet">
            <span>Bet: $</span>
            <input
              className="controls-betInput"
              type="number"
              step={25}
              onChange={e => setBet(e.target.value)}
              value={bet}
            />
          </label>
        </form>
        <Button onClick={deal} ref={dealButton}>
          Deal
        </Button>
        <Button ref={hitButton} disabled={status !== 'PLAYING'} onClick={hit}>
          Hit
        </Button>
        <Button disabled={status !== 'PLAYING'} onClick={stay}>
          Stay
        </Button>
        <Button disabled={status !== 'PLAYING'} onClick={doubleDown}>
          Double Down
        </Button>
        <h2>{messages[status]}</h2>
        {status !== 'WAITING' && (
          <div className="totals">
            <label>
              You: <span className="totals-scores">{playerTotal}</span>
            </label>
            <label>
              Dealer: <span className="totals-scores">{dealerTotal}</span>
            </label>
          </div>
        )}
      </div>
      <div className="game">
        <Cards cards={playerCards} />
        <Cards cards={dealerCards} />
      </div>
    </div>
  );
}

const Button = forwardRef((props, ref) => (
  <button {...props} className="controls-button" ref={ref}>
    {props.children}
  </button>
));

function Cards({ cards }) {
  return (
    <div className="cards">
      {cards.map(card => (
        <div key={card}>
          <Card {...card} />
        </div>
      ))}
    </div>
  );
}

function Card({ face = 'King', suit = 'Clubs' }) {
  const color = {
    clubs: 'black',
    spades: 'black',
    diamonds: 'red',
    hearts: 'red',
  }[suit];

  const icon =
    {
      clubs: '♣',
      spades: '♠',
      diamonds: '♦',
      hearts: '♥',
    }[suit] || '?';

  return (
    <div className="card-space">
      <div data-testid="card" className={`card card-${color}`}>
        <p>{face}</p>
        <h2>{icon}</h2>
      </div>
    </div>
  );
}
