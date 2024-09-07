<script>
  import * as Tone from "tone";

  let bpm = 120;
  let beat = 0;
  let isPlaying = false;

  ////////////////////////////////////////////////
  //Synths
  ////////////////////////////////////////////////

  const basesynths = [
    new Tone.Synth().toDestination(),
    new Tone.Synth().toDestination(),
    new Tone.Synth().toDestination(),
    new Tone.Synth().toDestination(),
    new Tone.Synth().toDestination(),
    new Tone.Synth().toDestination(),
    new Tone.Synth().toDestination(),
    new Tone.Synth().toDestination()
  ];

  const monosynths = [
    new Tone.MonoSynth().toDestination(),
    new Tone.MonoSynth().toDestination(),
    new Tone.MonoSynth().toDestination(),
    new Tone.MonoSynth().toDestination(),
    new Tone.MonoSynth().toDestination(),
    new Tone.MonoSynth().toDestination(),
    new Tone.MonoSynth().toDestination(),
    new Tone.MonoSynth().toDestination()
  ];

  const fmsynths = [
    new Tone.FMSynth().toDestination(),
    new Tone.FMSynth().toDestination(),
    new Tone.FMSynth().toDestination(),
    new Tone.FMSynth().toDestination(),
    new Tone.FMSynth().toDestination(),
    new Tone.FMSynth().toDestination(),
    new Tone.FMSynth().toDestination(),
    new Tone.FMSynth().toDestination()
  ];

  const amsynths = [
    new Tone.AMSynth().toDestination(),
    new Tone.AMSynth().toDestination(),
    new Tone.AMSynth().toDestination(),
    new Tone.AMSynth().toDestination(),
    new Tone.AMSynth().toDestination(),
    new Tone.AMSynth().toDestination(),
    new Tone.AMSynth().toDestination(),
    new Tone.AMSynth().toDestination()
  ];

  const metalsynths = [
    new Tone.MetalSynth().toDestination(),
    new Tone.MetalSynth().toDestination(),
    new Tone.MetalSynth().toDestination(),
    new Tone.MetalSynth().toDestination(),
    new Tone.MetalSynth().toDestination(),
    new Tone.MetalSynth().toDestination(),
    new Tone.MetalSynth().toDestination(),
    new Tone.MetalSynth().toDestination()
  ];

  const plucksynths = [
    new Tone.PluckSynth().toDestination(),
    new Tone.PluckSynth().toDestination(),
    new Tone.PluckSynth().toDestination(),
    new Tone.PluckSynth().toDestination(),
    new Tone.PluckSynth().toDestination(),
    new Tone.PluckSynth().toDestination(),
    new Tone.PluckSynth().toDestination(),
    new Tone.PluckSynth().toDestination()
  ];
  
  const instruments = [
    basesynths,
    monosynths,
    fmsynths,
    amsynths,
    metalsynths,
    plucksynths
  ];

  let synths = instruments[0];

  ////////////////////////////////////////////////
  //Scales
  ////////////////////////////////////////////////

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

  ////////////////////////////////////////////////
  //Row Init and Functions
  ////////////////////////////////////////////////

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
    
    // TODO: Need buttons to save their activity state when changing scales
  }

  const handleSynthChange = (synthIndex) => {
    synths = instruments[synthIndex];
  }

</script>

<svelte:head>
  <title> Sveltequencer </title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
  </style>
</svelte:head>

<div class = "label">
  <h> Sveltequencer </h>
</div>

<div class = "content">
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
      <button on:click = {handleStopClick} class = "playbtn">Stop</button>
    {:else}
      <button on:click = {handlePlayClick} class = "playbtn">Play</button>
    {/if}
  </div>

  <div class = "dropdown">
    <button class = "dropbtn">Scales</button>
    <div class = "dropdown-content">
      <button on:click = {() => handleScaleChange(0)} class = "cmajorbtn">C-major</button>
      <button on:click = {() => handleScaleChange(1)} class = "dmajorbtn">D-major</button>
      <button on:click = {() => handleScaleChange(2)} class = "emajorbtn">E-major</button>
      <button on:click = {() => handleScaleChange(3)} class = "fmajorbtn">F-major</button>
      <button on:click = {() => handleScaleChange(4)} class = "gmajorbtn">G-major</button>
      <button on:click = {() => handleScaleChange(5)} class = "amajorbtn">A-major</button>
      <button on:click = {() => handleScaleChange(6)} class = "bmajorbtn">B-major</button>
    </div>
  </div>

  <div class = "dropdown">
    <button class = "dropbtn">Synths</button>
    <div class = "dropdown-content">
      <button on:click = {() => handleSynthChange(0)} class = "basesynthbtn">Normal Synth</button>
      <button on:click = {() => handleSynthChange(1)} class = "monosynthbtn">Mono Synth</button>
      <button on:click = {() => handleSynthChange(2)} class = "fmsynthbtn">FM Synth</button>
      <button on:click = {() => handleSynthChange(3)} class = "amsynthbtn">AM Synth</button>
      <button on:click = {() => handleSynthChange(4)} class = "metalsynthbtn">Metal Synth</button>
      <button on:click = {() => handleSynthChange(5)} class = "plucksynthbtn">Pluck Synth</button>
    </div>
  </div>
</div>


<style>
  .label { 
    position: absolute;
    font-family: "press start 2p", system-ui;
    font-weight: 400;
    font-style: normal;
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
    border-radius: 0px;
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

  .buttons {
    margin-top: 10px;
  }

  .playbtn {
    border-radius: 0px;
    font-family: "press start 2p", system-ui;
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
  }
  
 .beat-indicator {
    width: 10px;
    height: 10px;
    border-radius: 0px;
    background: #555;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 0.5rem;
    margin: 0 auto;
  }

  .live {
    background: #05f18f;
  } 

  .dropdown {
    margin-top: 5px;
    display: inline-block;
  }

  .dropbtn {
    border-radius: 0px;
    font-family: "press start 2p", system-ui;
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
  }

  .dropdown-content {
    display: none;
    position: absolute;
  }

  .dropdown:hover .dropdown-content {display: block;}
  .dropdown:hover .dropdown-content {background-color: grey;}
</style>
