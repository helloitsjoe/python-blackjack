import { h, Component } from 'preact';
import { forwardRef } from 'preact/compat';
import { useState, useRef, useEffect } from 'preact/hooks';
import { getUrl, handleKeypress, debugMinikubePort } from './utils';

console.log(`URL:`, getUrl());

const messages = {
  WAITING: 'WAITING...',
  PLAYING: 'PLAYING...',
  BUST: 'BUST!',
  BLACKJACK: 'BLACKJACK!',
  WIN: 'YOU WIN!',
  LOSE: 'YOU LOSE!',
  TIE: 'YOU TIE!',
};

const f = type => {
  return fetch(getUrl(), {
    method: 'POST',
    body: JSON.stringify({ type }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => res.json())
    .then(j => {
      if (j.message) {
        throw new Error(res.message);
      }
      console.log(j.data);
      return j.data || j;
    })
    .catch(console.error);
};

const getTotal = cards => cards.reduce((acc, curr) => acc + curr.value, 0);
const hide = cards => [{ ...cards[0], value: 0, face: '', suit: '' }, ...cards.slice(1)];

export default function App() {
  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [status, setStatus] = useState('WAITING');

  const dealButton = useRef();
  const hitButton = useRef();

  useEffect(
    () => {
      if (status === 'PLAYING') {
        hitButton.current.focus();
      } else {
        dealButton.current.focus();
      }
    },
    [status]
  );

  useEffect(() => {
    document.addEventListener('keypress', handleKeypress);
    return () => document.removeEventListener('keypress', handleKeypress);
  }, []);

  const deal = () =>
    f('DEAL').then(data => {
      setPlayerCards(data.player);
      setDealerCards(hide(data.dealer));
      setStatus('PLAYING');
    });

  const hit = () =>
    f('HIT').then(data => {
      setPlayerCards(c => [...c, data.card]);
      setStatus(data.status);
    });

  const stay = () =>
    f('STAY').then(data => {
      console.log(`data:`, data);
      setDealerCards(data.dealer_cards);
      setStatus(data.status);
    });

  return (
    <div className="app">
      <div className="controls">
        {/* TODO: Betting */}
        <Button onClick={deal} ref={dealButton}>
          Deal
        </Button>
        <Button ref={hitButton} disabled={status !== 'PLAYING'} onClick={hit}>
          Hit
        </Button>
        <Button disabled={status !== 'PLAYING'} onClick={stay}>
          Stay
        </Button>
        <h2>{messages[status]}</h2>
        {status !== 'WAITING' && (
          <table className="totals">
            <tr>
              <td>You:</td>
              <td className="totals-scores">{getTotal(playerCards)}</td>
            </tr>
            <tr>
              <td>Dealer:</td>
              <td className="totals-scores">{getTotal(dealerCards)}</td>
            </tr>
          </table>
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
  <button {...props} className="control-button" ref={ref}>
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
      <div className={`card card-${color}`}>
        <p>{face}</p>
        <h2>{icon}</h2>
      </div>
    </div>
  );
}
