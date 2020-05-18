// const MINIKUBE_URL = 'http://192.168.64.2:32566';
const LOCAL_URL = 'http://0.0.0.0:5000';

export const getUrl = () => {
  if (typeof window !== 'undefined' && window.location.search) {
    const debugUrl = debugMinikubePort(window.location.search);
    if (debugUrl) {
      return debugUrl;
    }
  }

  if (process.env.MINIKUBE) {
    return '/game';
  }

  return `${LOCAL_URL}/game`;
};

export const sendCommand = ({
  type,
  balance,
  bet,
  playerCards: player_cards,
  dealerCards: dealer_cards,
  deck,
}) => {
  return fetch(getUrl(), {
    method: 'POST',
    body: JSON.stringify({ type, balance, bet, player_cards, dealer_cards, deck }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => res.json())
    .then(j => {
      if (j.message) {
        throw new Error(j.message);
      }
      console.log(j.data);
      return j.data || j;
    })
    .catch(console.error);
};

export function handleKeypress(e) {
  const buttons = document.querySelectorAll('button');
  const currIdx = Array.from(buttons).findIndex(el => e.target.isEqualNode(el));

  // j moves to next button
  if (e.key === 'j') {
    const targetIdx = currIdx + 1;
    if (targetIdx < buttons.length) {
      buttons[targetIdx].focus();
    }
  }

  // k moves to previous button
  if (e.key === 'k') {
    const targetIdx = currIdx - 1;
    if (targetIdx > -1) {
      buttons[targetIdx].focus();
    }
  }
}

const debugMinikubePort = search => {
  const { host, port } = search
    .replace('?', '')
    .split('&')
    .reduce((acc, curr) => {
      const [key, value] = curr.split('=');
      acc[key] = value;
      return acc;
    }, {});

  return host && port && `http://${host}:${port}/game`;
};
