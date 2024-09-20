/* Piano */

const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B' ];

for (index in keys) {
	let element = document.getElementById(`${keys[index]}`);
	element.addEventListener('click', e => {
	console.log(`${element.id}`)
	})
}