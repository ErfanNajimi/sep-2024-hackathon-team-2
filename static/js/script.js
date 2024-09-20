//reverb
const reverb = new Tone.Reverb().toDestination();
// Tone.Synth is a basic synthesizer with a single oscillator
const synth = new Tone.Synth();
// Set the tone to sine
synth.oscillator.type = "sine";
// connect it to the master output (your speakers)
synth.toMaster();

const piano = document.getElementById("piano");

piano.addEventListener("mousedown", e => {
  // fires off a note continously until trigger is released
  synth.triggerAttack(e.target.dataset.note);
});

piano.addEventListener("mouseup", e => {
  // stops the trigger
  synth.triggerRelease();
});

// handles keyboard events
document.addEventListener("keydown", e => {
  // e object has the key property to tell which key was pressed
  switch (e.key) {
    case "d":
      return synth.triggerAttack("C4", "8n");
    case "r":
      return synth.triggerAttack("C#4", "8n");
    case "f":
      return synth.triggerAttack("D4", "8n");
    case "t":
      return synth.triggerAttack("D#4", "8n");
    case "g":
      return synth.triggerAttack("E4", "8n");
    case "h":
      return synth.triggerAttack("F4", "8n");
    case "u":
      return synth.triggerAttack("F#4", "8n");
    case "j":
      return synth.triggerAttack("G4", "8n");
    case "i":
      return synth.triggerAttack("G#4", "8n");
    case "k":
      return synth.triggerAttack("A4", "8n");
    case "o":
      return synth.triggerAttack("A#4", "8n");
    case "l":
      return synth.triggerAttack("B4", "8n");
    default:
      return;
  }
});
// when the key is released, audio is released as well
document.addEventListener("keyup", e => {
  switch (e.key) {
    case "d":
    case "r":
    case "f":
    case "t":
    case "g":
    case "h":
    case "u":
    case "j":
    case "i":
    case "k":
    case "o":
    case "l":
       synth.triggerRelease(); 
  }
});
