import { h, Component } from 'preact';
import { forwardRef, Fragment } from 'preact/compat';
import { useState, useRef, useEffect } from 'preact/hooks';
import { getUrl, handleKeypress, sendCommand } from './utils';

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

const getTotal = cards => cards.reduce((acc, curr) => acc + curr.value, 0);
const hide = cards => [{ ...cards[0], value: 0, face: '', suit: '' }, ...cards.slice(1)];

export default function App({ send = sendCommand }) {
  const [playerCards, setPlayerCards] = useState([]);
  const [playerTotal, setPlayerTotal] = useState(0);
  const [dealerCards, setDealerCards] = useState([]);
  const [dealerTotal, setDealerTotal] = useState(0);
  const [status, setStatus] = useState('WAITING');
  const [balance, setBalance] = useState(1000);
  const [bet, setBet] = useState(25);

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
    send('DEAL', balance, bet).then(data => {
      const hiddenDealer = hide(data.dealer_cards);
      setPlayerCards(data.player_cards);
      setPlayerTotal(data.player_total);
      setDealerCards(hide(data.dealer_cards));
      setDealerTotal(getTotal(hiddenDealer));
      setStatus('PLAYING');
      setBalance(b => b - bet);
    });

  const hit = () =>
    send('HIT').then(data => {
      setPlayerCards(c => [...c, data.card]);
      setPlayerTotal(data.total);
      setStatus(data.status);
    });

  const stay = () =>
    send('STAY').then(data => {
      console.log(`data:`, data);
      setDealerCards(data.dealer_cards);
      setDealerTotal(data.dealer_total);
      setStatus(data.status);
      setBalance(data.balance);
    });

  return (
    <div className="app">
      <div className="controls">
        <h2>${balance}</h2>
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
