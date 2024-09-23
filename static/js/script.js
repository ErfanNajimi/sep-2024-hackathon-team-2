// PIANO

const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const keyBindings = ['A', 'W', 'S', 'E', 'D', 'F', 'T', 'G', 'Y', 'H', 'U', 'J']; 
let keysPlayed = [];

// TEST
const correctTune = [
    "CDECCEDC",
    "EFGEFG",
    "GAGFECGAGFEC",
    "CGCCGC"
];

let clickCount = 0;

// Retrieving tunes from database
const tunesSetRaw = document.getElementById('tunes').innerText;
// Hide data after retrieval 
document.getElementById('tunes').innerText = '{{ tunes }}';

// Processing raw string data
let tunesSetProcessing = tunesSetRaw.replaceAll('[','');
tunesSetProcessing = tunesSetProcessing.replaceAll(']','');
tunesSetProcessing = tunesSetProcessing.replaceAll('"','');
tunesSetProcessing = tunesSetProcessing.replaceAll(',','');
tunesSetProcessing = tunesSetProcessing.split(" ");

for (let i in tunesSetProcessing) {
    tunesSetProcessing[i] = tunesSetProcessing[i].split("/");
}

const tunesSet = tunesSetProcessing

for (let index in keys) {
    let element = document.getElementById(`${keys[index]}`);
    element.addEventListener('click', e => {
        keysPlayed.push(`${element.id}`);
        document.getElementById(`${element.id}-audio`).load();
        document.getElementById(`${element.id}-audio`).play();

        //add note to music sheet
        musicSheet()

		// Colour change
            element.style.backgroundColor = '#B10054'
            setTimeout(function () {
                if (element.id.includes('#')) {
                element.style.backgroundColor = 'black'
                } else {
                    element.style.backgroundColor = '#FFFFF0'
            } }, 175);
    });

}

document.addEventListener('keydown', e => {
    const keyIndex = keyBindings.indexOf(e.key.toUpperCase());
    if (keyIndex !== -1) {
        let note = keys[keyIndex];
        keysPlayed.push(note);
        document.getElementById(`${note}-audio`).load();
        document.getElementById(`${note}-audio`).play();

        //add note to music sheet
        musicSheet()

		// Colour change
		const element = document.getElementById(note);
		// Colour change
            element.style.backgroundColor = '#B10054'
            setTimeout(function () {
                if (element.id.includes('#')) {
                element.style.backgroundColor = 'black'
                } else {
                    element.style.backgroundColor = '#FFFFF0'
            } }, 175);
    }
});

function playNoteSequence(sequence, delay = 500) {
    sequence.forEach((note, index) => {
        setTimeout(() => {
            let element = document.getElementById(`${note}`);
            if (element) {
                document.getElementById(`${note}-audio`).load();
                document.getElementById(`${note}-audio`).play();

                //add note to music sheet
                musicSheet()

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
// GAMEPLAY

// Timer
let firstClick = true;
let stopTime = 0;
let numberOfResets = 0;

function timer(play, pause, stop, reset, clock) {
    let min = 0;
    let sec = 0;
    play.addEventListener('click', () => {
        if (firstClick) {
            keysPlayed = [];
            firstClick = false;
        };
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

    stop.addEventListener('click', () => {
        stopTime = (min*60) + sec - 1;
        clearInterval(x);
        min = 0;
        sec = 0;
    });
    
    reset.addEventListener('click', () => {
        numberOfResets += 1;
        stopTime = 0;
        keysPlayed = [];
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
    document.getElementById('stop'), 
    document.getElementById('reset'), 
    document.getElementById('clock'),
);


function calculateScore(timeSpent, numberOfResets, correctTune, keysPlayed) {
    let score = 0;

    let strComputer = "";
    for (let i in correctTune) {
        strComputer += correctTune[i];
    };

    let listComputer = strComputer.split("");
    for (let i in listComputer) {
        if (listComputer[i] == keysPlayed[i]) {
            score += 10;
        }
    };

    numberOfResets += 1;
    score += Math.round(score / numberOfResets);
    numberOfResets -= 1;

    score -= Math.round(timeSpent / 10);

    if (score > 0 && stopTime !== 0) {
        return score;
    } else {
        return 0;
    };
}

calculateScore(stopTime, numberOfResets, correctTune, keysPlayed);
document.getElementById('review').addEventListener('click', () => {
    const score = calculateScore(stopTime, numberOfResets, correctTune, keysPlayed);
    document.getElementById('tune-name').innerText = 'Result';
    document.getElementById('time-spent').innerText = `Time: ${stopTime}`;
    document.getElementById('number-of-resets').innerText = `Resets: ${numberOfResets}`;
    document.getElementById('scored').innerText = `You scored: ${score}`;
    document.getElementById('id_score').setAttribute('value', `${score}`);
});

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

//MUSIC SHEET
function musicSheet(e) {
    const lastTenNotes = keysPlayed.slice(-10);

    let sheetCol = document.getElementsByClassName("sheet-col")
    
    for (let i = 0; i < lastTenNotes.length; i++){
        lastTenNotes[i] = lastTenNotes[i].toLowerCase()
        lastTenNotes[i] = lastTenNotes[i].replace("#", "sharp")
        sheetCol[i].innerHTML = `<div class="note-${lastTenNotes[i]}"><svg><g transform="translate(-525.000000, -622.000000)" fill="#000000"> <path d="M539.992,622 C539.031,622 538.984,623.002 538.984,623.002 L538.984,639.363 C536.748,637.715 533.058,637.713 529.788,639.589 C525.725,641.922 523.982,646.27 525.616,649.3 C527.279,652.384 532.097,652.896 536.16,650.563 C539.316,648.751 541.007,645.807 541,643 L541,623 C540.982,622.462 540.537,622 539.992,622"></path></g></svg></div>`
    }
}

