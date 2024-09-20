/* Piano */

const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B' ];

for (index in keys) {
	let element = document.getElementById(`${keys[index]}`);
	element.addEventListener('click', e => {
	console.log(`${element.id}`);
    document.getElementById(`${element.id}-audio`).load();
    document.getElementById(`${element.id}-audio`).play();
	})
}

/* Gameplay stages */

/* Leaderboard */

// Function to filter/search player in the leaderboard
function searchPlayer() {
	// Get the seatch input
	const searchValue = document.getElementById('search-bar').value.toLowerCase();

	// Get all rows from the table body
	const rows = document.querySelectorAll("#leaderboard tbody tr");

	// Loop through the rows and hide those that don't match the search query
	rows.forEach(row => {
		const playerName = row.cells[1].textContent.toLowerCase();
		if (playerName.includes(searchValue)) {
			row.style.display = "";
		} else {
			row.style.display = "none";
		}
		
	});
}

/* Mobile */
