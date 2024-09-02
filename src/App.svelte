<script>
  import * as Tone from "tone";

  let bpm = 120;
  let beat = 0;
  let isPlaying = false;

  let synths = [
    new Tone.Synth().toDestination(),
    new Tone.Synth().toDestination(),
    new Tone.Synth().toDestination(),
    new Tone.Synth().toDestination(),
    new Tone.Synth().toDestination(),
    new Tone.Synth().toDestination(),
    new Tone.Synth().toDestination(),
    new Tone.Synth().toDestination()
  ];

  const cmajor = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];
  const dmajor = ["D4", "E4", "F#4", "G4", "A4", "B4", "C#5", "D5"];
  const emajor = ["E4", "F#4,", "G#4", "A4", "B4", "C#5", "D#5", "E5"];
  const fmajor = ["F4", "G4", "A4", "Bb4", "C5", "D5", "E5", "F5"];
  const gmajor = ["G4", "A4", "B4", "C5", "D5", "E5", "F#5", "G5"];
  const amajor = ["A4", "B4", "C#5", "D5", "E5", "F#5", "G#5", "A5"];
  const bmajor = ["B4", "C#5", "D#5", "E5", "F#5", "G#5", "A#5", "B5"];
  
  const scales = [
    cmajor,
    dmajor,
    emajor,
    fmajor,
    gmajor,
    amajor,
    bmajor
  ];

  let scaleIndex = 0;

  let rows = [
    Array.from({length: 16}, (_, i) => ({note: scales[scaleIndex][7], active: false})),
    Array.from({length: 16}, (_, i) => ({note: scales[scaleIndex][6], active: false})),
    Array.from({length: 16}, (_, i) => ({note: scales[scaleIndex][5], active: false})),
    Array.from({length: 16}, (_, i) => ({note: scales[scaleIndex][4], active: false})),
    Array.from({length: 16}, (_, i) => ({note: scales[scaleIndex][3], active: false})),
    Array.from({length: 16}, (_, i) => ({note: scales[scaleIndex][2], active: false})),
    Array.from({length: 16}, (_, i) => ({note: scales[scaleIndex][1], active: false})),
    Array.from({length: 16}, (_, i) => ({note: scales[scaleIndex][0], active: false}))
  ];

  let beatIndicators = Array.from({ length: 16 }, (_, i) => i);

  Tone.Transport.scheduleRepeat(time => {
    rows.forEach((row, index) => {
      let synth = synths[index];
      let note = row[beat];
      if (note.active) synth.triggerAttackRelease(note.note, "16n", time);
    });
    beat = (beat + 1) % 16;
  }, "16n");


  const handleNoteClick = (rowIndex, noteIndex) => {
    rows[rowIndex][noteIndex].active = !rows[rowIndex][noteIndex].active;
  };

  const handlePlayClick = () => {
    if (!isPlaying) Tone.start();
    Tone.Transport.bpm.value = bpm;
    Tone.Transport.start();
    isPlaying = true; 
  };

  const handleStopClick = () => {
    Tone.Transport.stop();
    isPlaying = false;
  };

  $: if (isPlaying) {
    Tone.Transport.bpm.value = bpm;
  }

  const handleScaleChange = (scaleIndex) => {

    rows = [
      Array.from({length: 16}, (_, i) => ({note: scales[scaleIndex][7], active: false})),
      Array.from({length: 16}, (_, i) => ({note: scales[scaleIndex][6], active: false})),
      Array.from({length: 16}, (_, i) => ({note: scales[scaleIndex][5], active: false})),
      Array.from({length: 16}, (_, i) => ({note: scales[scaleIndex][4], active: false})),
      Array.from({length: 16}, (_, i) => ({note: scales[scaleIndex][3], active: false})),
      Array.from({length: 16}, (_, i) => ({note: scales[scaleIndex][2], active: false})),
      Array.from({length: 16}, (_, i) => ({note: scales[scaleIndex][1], active: false})),
      Array.from({length: 16}, (_, i) => ({note: scales[scaleIndex][0], active: false})) 
    ];
    
    /* want the buttons to keep their active/inactive state when changing scales:
    for(let i = 0; i < rows.length; i++) {
      for(let j = 0; j < rows.length[0]; j++) {
        rows[i][j].note = scales[scaleIndex][7-j];
      }
    }
    */
  }

</script>


<div class = "bpm-controls">
  <label for = "bpm">{bpm} BPM</label>
  <input type = "range" id = "bpm" min = "60" max = "240" bind:value = {bpm}/>
</div>

<div class = "sequencer">
  {#each beatIndicators as beatIndicator, bi}
    <div class="beat-indicator {bi === beat - 1 ? 'live' : ''}"></div>
  {/each}

  {#each rows as row, i}
    {#each row as note, j}
      <button on:click = {() => handleNoteClick(i, j)} class = "note {note.active ? 'active' : ''}"></button>
    {/each}  
  {/each}
</div>

<div class = "buttons"> 
  {#if isPlaying}
    <button on:click = {handleStopClick}>Stop</button>
    {:else}
      <button on:click = {handlePlayClick}>Play</button>
    {/if}
</div>

<div class = "dropdown">
  <button class = "dropbtn">Scales</button>
  <div class = "dropdown-content">
    <button on:click = {() => handleScaleChange(0)} class = "cmajorbtn">C-Major</button>
    <button on:click = {() => handleScaleChange(1)} class = "dmajorbtn">D-Major</button>
    <button on:click = {() => handleScaleChange(2)} class = "emajorbtn">E-Major</button>
    <button on:click = {() => handleScaleChange(3)} class = "fmajorbtn">F-Major</button>
    <button on:click = {() => handleScaleChange(4)} class = "gmajorbtn">G-Major</button>
    <button on:click = {() => handleScaleChange(5)} class = "amajorbtn">A-Major</button>
    <button on:click = {() => handleScaleChange(6)} class = "bmajorbtn">B-Major</button>
  </div>
</div>

<style>
  .sequencer {
    display: grid;
    grid-template-columns: repeat(16, 1fr);
    grid-gap: 3px;
    width: 100%;
  }

  .note {
    background: #ccc;
    width: 50px;
    height: 50px;
    border: 1px solid #ccc;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
  }

  .note.active {
    background: black;
    border: 1px solid black;
    color: black;
    border-radius: 2px;
  }

  .bpm-controls {
    margin-bottom: 10px;
  }

  .bpm-controls label {
    color: white;
  }

  .buttons {
    margin-top: 10px;
  }
  
 .beat-indicator {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #555;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 1.5rem;
    margin: 0 auto;
  }

  .live {
    background: #05f18f;
  } 

  .dropdown {
    margin-top: 5px;
    display: inline-block;
  }

  .dropdown-content {
    display: none;
    position: absolute;
  }

  .dropdown:hover .dropdown-content {display: block;}
  .dropdown:hover .dropdown-content {background-color: grey;}
</style>
