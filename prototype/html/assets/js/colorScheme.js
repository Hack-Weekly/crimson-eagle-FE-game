const bgLightColorPicker = document.getElementById('bg-light-colorpicker');
let bgLightColor = bgLightColorPicker.input;

const bgDarkColorPicker = document.getElementById('bg-dark-colorpicker');
let bgDarkColor = bgDarkColorPicker.input;

const pieceLightColorPicker = document.getElementById(
	'piece-light-colorpicker'
);
let pieceLightColor = pieceLightColorPicker.input;

const pieceDarkColorPicker = document.getElementById('piece-dark-colorpicker');
let pieceDarkColor = pieceDarkColorPicker.input;

const backgroundColorPicker = document.getElementById('background-colorpicker');
let backgroundColor = backgroundColorPicker.input;

// const texturePicker = document.getElementById('texture-select');
// let texture = texturePicker.input;

const container = document.querySelector('.container');

const openButton = document.getElementById('open-button');
openButton.addEventListener('click', () => {
	container.classList.remove('hidden');
	openButton.classList.add('hidden');
});

const closeButton = document.getElementById('close-button');

closeButton.addEventListener('click', () => {
	container.classList.add('hidden');
	openButton.classList.remove('hidden');
});

console.log(bgLightColorPicker.value);

bgLightColorPicker.addEventListener('change', () => {
	bgLightColor = bgLightColorPicker.value;
	console.log(bgLightColor);
});

bgDarkColorPicker.addEventListener('change', () => {
	bgDarkColor = bgDarkColorPicker.value;
});

pieceLightColorPicker.addEventListener('change', () => {
	pieceLightColor = pieceLightColorPicker.value;
});

pieceDarkColorPicker.addEventListener('change', () => {
	pieceDarkColor = pieceDarkColorPicker.value;
});

backgroundColorPicker.addEventListener('change', () => {
	backgroundColor = backgroundColorPicker.value;
});

// texturePicker.addEventListener('change', () => {
// 	texture = texturePicker.value;
// });

const colorScheme = {
	bgLightColor,
	bgDarkColor,
	pieceLightColor,
	pieceDarkColor,
	backgroundColor,
	//texture,
};
