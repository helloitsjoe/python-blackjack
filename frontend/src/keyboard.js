export default function handleKeypress(e) {
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
