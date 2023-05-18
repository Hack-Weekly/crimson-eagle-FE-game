const fen = 'qrknbbnr/pppppppp/8/8/8/8/PPPPPPPP/QRKNBBNR w - - 0 1';

const fenDisplay = document.querySelector("#fenDisplay");

fenDisplay.dataset.fen = fen;
fenDisplay.textContent = fenDisplay.dataset.fen;

if (fenDisplay.textContent === fen) alert("works");