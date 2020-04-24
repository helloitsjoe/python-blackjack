const MINIKUBE_URL = 'http://192.168.64.2:32566/game';
const LOCAL_URL = 'http://0.0.0.0:5000/game';

export const getUrl = () => {
  if (typeof window !== 'undefined' && window.location.search) {
    const debugUrl = debugMinikubePort(window.location.search);
    if (debugUrl) {
      return debugUrl;
    }
  }

  return process.env.MINIKUBE ? MINIKUBE_URL : LOCAL_URL;
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
