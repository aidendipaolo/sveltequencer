<script>
  import * as Tone from "tone";
  import { instruments } from "./lib/synths.js";
  import { scales } from "./lib/scales.js";

  let bpm = 120;
  let beat = 0;
  let isPlaying = false;
  let synths = instruments[0];
  let currScale = 0;
  let currSynth = 0;

  let rows = [
    Array.from({length: 16}, (_, i) => ({note: scales[currScale][7], active: false})),
    Array.from({length: 16}, (_, i) => ({note: scales[currScale][6], active: false})),
    Array.from({length: 16}, (_, i) => ({note: scales[currScale][5], active: false})),
    Array.from({length: 16}, (_, i) => ({note: scales[currScale][4], active: false})),
    Array.from({length: 16}, (_, i) => ({note: scales[currScale][3], active: false})),
    Array.from({length: 16}, (_, i) => ({note: scales[currScale][2], active: false})),
    Array.from({length: 16}, (_, i) => ({note: scales[currScale][1], active: false})),
    Array.from({length: 16}, (_, i) => ({note: scales[currScale][0], active: false}))
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

  const handleResetClick = () => {
    rows = [
      Array.from({length: 16}, (_, i) => ({note: scales[currScale][7], active: false})),
      Array.from({length: 16}, (_, i) => ({note: scales[currScale][6], active: false})),
      Array.from({length: 16}, (_, i) => ({note: scales[currScale][5], active: false})),
      Array.from({length: 16}, (_, i) => ({note: scales[currScale][4], active: false})),
      Array.from({length: 16}, (_, i) => ({note: scales[currScale][3], active: false})),
      Array.from({length: 16}, (_, i) => ({note: scales[currScale][2], active: false})),
      Array.from({length: 16}, (_, i) => ({note: scales[currScale][1], active: false})),
      Array.from({length: 16}, (_, i) => ({note: scales[currScale][0], active: false}))
    ];
    beat = 0;
  }

  const handleIndicatorClick = (bi) => {
    beat = bi;
  }

  const handleStopClick = () => {
    Tone.Transport.stop();
    isPlaying = false;
  };

  $: if (isPlaying) {
    Tone.Transport.bpm.value = bpm;
  }

  const handleScaleChange = (scaleIndex) => {
    currScale = scaleIndex;

    for(let i = 0, j = 7; i < rows.length; i++, j--) {
      for(let obj of rows[i]) {
        obj.note = scales[currScale][j];
      }
    }
  }

  const handleSynthChange = (synthIndex) => {
    currSynth = synthIndex;
    synths = instruments[currSynth];
  }
</script>

<svelte:head>
  <title> Sveltequencer </title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
  </style>
</svelte:head>

<nav class = "navbar">
  <ul>
    <li>
      <div class = "label">
        <h> Sveltequencer </h>
      </div>
    </li>
    <li>
      <a class = "scales" href="#">Scales</a>
      <ul>
        <li><button on:click = {() => handleScaleChange(0)} class = "scalesbtn {0 === currScale ? 'toggled' : ''}">C-major</button></li>
        <li><button on:click = {() => handleScaleChange(1)} class = "scalesbtn {1 === currScale ? 'toggled' : ''}">D-major</button></li>
        <li><button on:click = {() => handleScaleChange(2)} class = "scalesbtn {2 === currScale ? 'toggled' : ''}">E-major</button></li>
        <li><button on:click = {() => handleScaleChange(3)} class = "scalesbtn {3 === currScale ? 'toggled' : ''}">F-major</button></li>
        <li><button on:click = {() => handleScaleChange(4)} class = "scalesbtn {4 === currScale ? 'toggled' : ''}">G-major</button></li>
        <li><button on:click = {() => handleScaleChange(5)} class = "scalesbtn {5 === currScale ? 'toggled' : ''}">A-major</button></li>
        <li><button on:click = {() => handleScaleChange(6)} class = "scalesbtn {6 === currScale ? 'toggled' : ''}">B-major</button></li>
        <li><button on:click = {() => handleScaleChange(7)} class = "scalesbtn {7 === currScale ? 'toggled' : ''}">C-minor</button></li>
        <li><button on:click = {() => handleScaleChange(8)} class = "scalesbtn {8 === currScale ? 'toggled' : ''}">D-minor</button></li>
        <li><button on:click = {() => handleScaleChange(9)} class = "scalesbtn {9 === currScale ? 'toggled' : ''}">E-minor</button></li>
        <li><button on:click = {() => handleScaleChange(10)} class = "scalesbtn {10 === currScale ? 'toggled' : ''}">F-minor</button></li>
        <li><button on:click = {() => handleScaleChange(11)} class = "scalesbtn {11 === currScale ? 'toggled' : ''}">G-minor</button></li>
        <li><button on:click = {() => handleScaleChange(12)} class = "scalesbtn {12 === currScale ? 'toggled' : ''}">A-minor</button></li>
        <li><button on:click = {() => handleScaleChange(13)} class = "scalesbtn {13 === currScale ? 'toggled' : ''}">B-minor</button></li>
      </ul>
    </li>
    <li>
      <a class = "synths" href="#">Synths</a>
      <ul>
        <li><button on:click = {() => handleSynthChange(0)} class = "synthsbtn {0 === currSynth ? 'toggled' : ''}">Normal Synth</button></li>
        <li><button on:click = {() => handleSynthChange(1)} class = "synthsbtn {1 === currSynth ? 'toggled' : ''}">Mono Synth</button></li>
        <li><button on:click = {() => handleSynthChange(2)} class = "synthsbtn {2 === currSynth ? 'toggled' : ''}">FM Synth</button></li>
        <li><button on:click = {() => handleSynthChange(3)} class = "synthsbtn {3 === currSynth ? 'toggled' : ''}">AM Synth</button></li>
        <li><button on:click = {() => handleSynthChange(4)} class = "synthsbtn {4 === currSynth ? 'toggled' : ''}">Metal Synth</button></li>
        <li><button on:click = {() => handleSynthChange(5)} class = "synthsbtn {5 === currSynth ? 'toggled' : ''}">Pluck Synth</button></li>
      </ul>
    </li>
  </ul>
</nav>

<div class = "bpm-controls">
  <label for = "bpm">{bpm} BPM</label>
  <input class = "bpm-slider" type = "range" id = "bpm" min = "60" max = "240" bind:value = {bpm}/>
</div>

<div class = "sequencer">
  {#each beatIndicators as beatIndicator, bi} 
    <div class="beat-indicator {bi === beat ? 'live' : ''}">
      <button on:click = {() => handleIndicatorClick(bi)} class="bibtn"></button>
    </div>
  {/each}

  {#each rows as row, i}
    {#each row as note, j}
      <button on:click = {() => handleNoteClick(i, j)} class = "note {note.active ? 'active' : ''}"></button>
    {/each}  
  {/each}
</div>

<div class = "buttons"> 
  {#if isPlaying}
    <button on:click = {handleStopClick} class = "playbtn">Stop</button>
  {:else}
    <button on:click = {handlePlayClick} class = "playbtn">Play</button>
  {/if}
  <button on:click = {handleResetClick} class = "resetbtn">Reset</button>
</div>


<style>
  .navbar {
    background-color: #1d1c1c;
    position: absolute;
    width: 100%;
    z-index: 999;
    text-align: left;
    top: 0px;
    left: 0px;
  }

  .navbar ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .navbar li {
    display: inline-block;
  }

  .navbar li a {
    color: white;
    display: block;
    padding: 10px 20px;
    text-decoration: none;
  }

  .navbar ul ul {
    position: absolute;
    top: 100%;
    display: none;
  }

  .navbar ul ul li {
    display: block;
  }

  .navbar ul ul li button{
    width: 150px;
    height:30px;
    text-align: left;
    font-family: "press start 2p", system-ui;
    font-weight: 400;
    font-style: normal;
    font-size: 10px;
  }

  .toggled {
    background: #838383;
  } 

  .navbar li:hover ul {
    display: block;
  }

  .label { 
    margin-left: 10px;
    font-family: "press start 2p", system-ui;
    font-weight: 400;
    font-style: normal;
  }

  .scales {
    font-family: "press start 2p", system-ui;
    font-weight: 400;
    font-style: normal;
    font-size: 13.5px;
  }

  .synths {
    font-family: "press start 2p", system-ui;
    font-weight: 400;
    font-style: normal;
    font-size: 13.5px;
  }

  .sequencer {
    display: grid;
    grid-template-columns: repeat(16, 1fr);
    grid-gap: 5px;
    width: 100%;
  }

  .note {
    background: #ccc;
    width: 50px;
    height: 50px;
    border: 1px solid #ccc;
    display: flex;
    border-radius: 0px;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }

  .note.active {
    background: black;
    border: 1px solid black;
    color: black;
  }

  .bpm-controls {
    margin-bottom: 10px;
  }

  .bpm-controls label {
    color: white;
    font-family: "press start 2p", system-ui;
    font-weight: 400;
    font-style: normal;
    font-size: 13.5px;
  }

  .bpm-controls input {
    width: 240px;
  }

  .buttons {
    margin-top: 10px;
  }

  .buttons button {
    font-family: "press start 2p", system-ui;
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
  }
  
 .beat-indicator {
    width: 10px;
    height: 10px;
    background: #555;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 0.2rem;
    margin: 0 auto;
  }

  .beat-indicator button {
    margin-left: -20px;
    margin-right: -20px;
    width: 40px;
    height: 40px;
    background: transparent;
  }

  .beat-indicator button:hover {
    border-color: transparent;
  }

  .live {
    background: #ff0000;
  } 
</style>
