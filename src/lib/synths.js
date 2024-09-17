import * as Tone from "tone";

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

export const instruments = [
    basesynths,
    monosynths,
    fmsynths,
    amsynths,
    metalsynths,
    plucksynths
];