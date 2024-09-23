// PIANO


const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const keyBindings = ['A', 'W', 'S', 'E', 'D', 'F', 'T', 'G', 'Y', 'H', 'U', 'J']; 
let keysPlayed = [];
// let computerTune = [];
let clickCount = 0;

// const tunes = [
//     "CDECCEDC",
//     "EFGEFG",
//     "GAGFECGAGFEC",
//     "CGCCGC"
// ];

const tunesSet = [
    // First click tunes
    [
        "CDECCEDC",
        "EFGEFG",
        "GAGFECGAGFEC",
        "CGCCGC"
    ],
    // Second click tunes
    [
        "EDCDEEE",  
        "DDDEDC",   
        "EDCDEEE",  
        "DDEDC"
    ],
    // Third click tunes
    [
        "CCGGAAG",
        "FFEEDDC",
        "GGFFEED",
        "GGFFEED",
        "CCGGAAG",
        "FFEEDDC"
    ],
    // Fourth click tunes
    [
        "EDC",
        "EDC",
        "CCCC",
        "DDDD",
        "EDC"
    ]
];

for (let index in keys) {
    let element = document.getElementById(`${keys[index]}`);
    element.addEventListener('click', e => {
        console.log(`${element.id}`);
        keysPlayed.push(`${element.id}`);
        document.getElementById(`${element.id}-audio`).load();
        document.getElementById(`${element.id}-audio`).play();

		// Colour change
		const originalColour = element.style.backgroundColor;
		element.style.backgroundColor = '#B10054';
		setTimeout(function () { element.style.backgroundColor = `${originalColour}` }, 175);
    });

}

document.addEventListener('keydown', e => {
    const keyIndex = keyBindings.indexOf(e.key.toUpperCase());
    if (keyIndex !== -1) {
        let note = keys[keyIndex];
        console.log(note);
        document.getElementById(`${note}-audio`).load();
        document.getElementById(`${note}-audio`).play();

		// Colour change
		const element = document.getElementById(note);
		const originalColour = element.style.backgroundColor;
		element.style.backgroundColor = '#B10054';
		setTimeout(function () { element.style.backgroundColor = `${originalColour}` }, 175);
    }
});

// function playTune(tune) {
//     let index = 0;
//     function playNote() {
//         if (index < tune.length) {
//             let note = tune[index];
//             document.getElementById(`${note}-audio`).load();
//             document.getElementById(`${note}-audio`).play();
//             index++;
//             setTimeout(playNote, 1000); 
//         }
//     }
//     playNote();
// }

function playNoteSequence(sequence, delay = 500) {
    sequence.forEach((note, index) => {
        setTimeout(() => {
            let element = document.getElementById(`${note}`);
            if (element) {
                document.getElementById(`${note}-audio`).load();
                document.getElementById(`${note}-audio`).play();

                // Colour change
                const originalColour = element.style.backgroundColor;
                element.style.backgroundColor = '#B10054';
                setTimeout(() => { element.style.backgroundColor = originalColour }, 300);
            }
        }, index * delay); // Delay each note
    });
}

function playTune(tune) {
    const sequence = tune.split(''); // Split the string into individual notes
    playNoteSequence(sequence);
}

document.getElementById('play-tune').addEventListener('click', () => {
    let delayBetweenTunes = 0;
    const currentTunes = tunesSet[clickCount % tunesSet.length];
    console.log(currentTunes);

    // Loop through each tune and play them with some delay between each
    currentTunes.forEach((tune, index) => {
        setTimeout(() => {
            playTune(tune);
        }, delayBetweenTunes);
        
        // Increase the delay for the next tune (500ms per note)
        delayBetweenTunes += tune.length * 500;
    });
    clickCount++;
});
// function generateTune(length = 5) {
//     computerTune = [];
//     for (let i = 0; i < length; i++) {
//         const randomIndex = Math.floor(Math.random() * keys.length);
//         computerTune.push(keys[randomIndex]);
//     }
// }




// document.getElementById('play-tune').addEventListener('click', () => {
//     generateTune();
//     console.log(computerTune);
//     playTune(computerTune);
// });

// GAMEPLAY

// Timer
function timer(play, pause, reset, clock) {
    let min = 0;
    let sec = 55;
    play.addEventListener('click', () => {
        x = setInterval(function() {
                let minDisplay = (min.toString().length > 1) ? min.toString() : '0' + min.toString();
                let secDisplay = (sec.toString().length > 1) ? sec.toString() : '0' + sec.toString();;
                clock.innerText = `${minDisplay}:${secDisplay}`;
                if (sec < 59) {
                    sec += 1; 
                } else {
                    sec = 0; 
                    min += 1; 
                };
            }, 1000);  
    });

    pause.addEventListener('click', () => {
        clearInterval(x);
    });
    
    reset.addEventListener('click', () => {
        clearInterval(x);
        min = 0;
        sec = 0;
        let minDisplay = (min.toString().length > 1) ? min.toString() : '0' + min.toString();
        let secDisplay = (sec.toString().length > 1) ? sec.toString() : '0' + sec.toString();;
        clock.innerText = `${minDisplay}:${secDisplay}`;
    });
}


timer(
    document.getElementById('record'), 
    document.getElementById('pause'), 
    document.getElementById('reset'), 
    document.getElementById('clock'),
);

// Tracker

// function tracker(status) {

// }

// LEADERBOARD

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

// MOBILE

//SWITCHES
document.getElementById('proModeSwitch').addEventListener('click', () => {
    if (document.getElementById('proModeSwitch').checked == true) {
        document.getElementById('keyLabelSwitch').checked = false
        for (let index in keys) {
            let element = document.getElementById(`${keys[index]}`);
            element.innerText = "";
        }
    } else {
        for (let index in keys) {
            document.getElementById('keyLabelSwitch').checked = false
            let element = document.getElementById(`${keys[index]}`);
            element.innerText = element.id;
        }
    }
});

document.getElementById('keyLabelSwitch').addEventListener('click', () => {
    if (document.getElementById('keyLabelSwitch').checked == true) {
        document.getElementById('proModeSwitch').checked = false
        for (let index in keys) {
            let element = document.getElementById(`${keys[index]}`);
            element.innerText = keyBindings[index];
        }
    } else if (document.getElementById('keyLabelSwitch').checked == false) {
        document.getElementById('proModeSwitch').checked = false
        for (let index in keys) {
            let element = document.getElementById(`${keys[index]}`);
            element.innerText = element.id;
        }
    }
});

// Profile Selection clicks 
// On click for level difficulty 
function selectDifficulty(selectedButton) {
    
    const buttons = document.querySelectorAll('.button-group .btn');
    buttons.forEach(button => button.classList.remove('active'));
    
    selectedButton.classList.add('active');
}

selectDifficulty(selectedButton);