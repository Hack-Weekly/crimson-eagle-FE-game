// On document load, load these name spaces.

window.addEventListener('load', UnitTestGenerator.init) // starts the unit testing process in the console.
window.addEventListener('load', FEN_Display.init) // changes the FEN displayed on screen
// window.addEventListener('load', FEN_Pieces.init) // populates array based on FEN