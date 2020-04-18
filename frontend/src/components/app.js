import { h, Component } from 'preact';
import { forwardRef } from 'preact/compat';
import { useState, useRef, useEffect } from 'preact/hooks';

const URL = 'http://0.0.0.0:5000/game';

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
  return fetch(URL, {
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

  const deal = () =>
    f('DEAL').then(data => {
      setPlayerCards(data.player);
      setDealerCards(data.dealer);
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
          <>
            <p>You: {getTotal(playerCards)}</p>
            <p>Dealer: {getTotal(dealerCards)}</p>
          </>
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

  const icon = {
    clubs: '♣',
    spades: '♠',
    diamonds: '♦',
    hearts: '♥',
  }[suit];

  return (
    <div className="card-space">
      <div className={`card ${color}`}>
        <p>{face}</p>
        <h2>{icon}</h2>
      </div>
    </div>
  );
}
