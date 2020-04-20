export const getUrl = () => {
  if (typeof window !== 'undefined' && window.location.search) {
    const debugUrl = debugMinikubePort(window.location.search);
    if (debugUrl) {
      return debugUrl;
    }
  }

  console.log(`process.env.MINIKUBE:`, process.env.MINIKUBE);
  return process.env.MINIKUBE ? 'http://192.168.64.2:32566/game' : 'http://0.0.0.0:5000/game';

  //   // Use minikube url if in production
  //   if (process.env.NODE_ENV === 'production' && process.env.PREACT_APP_MINIKUBE === 'true') {
  //     return 'http://192.168.64.2:31315/game';
  //   }

  //   return 'http://0.0.0.0:5000/game';
};

export function handleKeypress(e) {
  const buttons = document.querySelectorAll('button');
  const currIdx = Array.from(buttons).findIndex(el => e.target.isEqualNode(el));

  if (e.key === 'j') {
    const targetIdx = currIdx + 1;
    if (targetIdx < buttons.length) {
      buttons[targetIdx].focus();
    }
  }

  if (e.key === 'k') {
    const targetIdx = currIdx - 1;
    if (targetIdx > -1) {
      buttons[targetIdx].focus();
    }
  }
}

export const debugMinikubePort = search => {
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
