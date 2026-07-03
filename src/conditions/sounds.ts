import { fisherYatesShuffle } from "./functions";

const abstractAudioNames = fisherYatesShuffle([
  "abs1.wav",
  "abs2.wav",
  "abs3.wav",
  "abs4.wav",
  "abs5.mp3",
  "abs6.mp3",
  "abs7.wav",
  "abs8.wav",
  "abs9.wav",
  "abs10.wav",
  "abs11.wav",
  "abs12.wav",
]);
const ABSTRACT_EFFECT_SOUND = "abs-lt-switch.wav";

export const abstractAudio = {
  parallel: {
    A: abstractAudioNames[0],
    B: abstractAudioNames[1],
    C: abstractAudioNames[2],
    D: abstractAudioNames[3],
    Y: ABSTRACT_EFFECT_SOUND,
  },
  chain: {
    A: abstractAudioNames[4],
    B: abstractAudioNames[5],
    C: abstractAudioNames[6],
    D: abstractAudioNames[7],
    Y: ABSTRACT_EFFECT_SOUND,
  },
  confound: {
    A: abstractAudioNames[8],
    B: abstractAudioNames[9],
    C: abstractAudioNames[10],
    D: abstractAudioNames[11],
    Y: ABSTRACT_EFFECT_SOUND,
  },
};

const socialHeySounds = fisherYatesShuffle([
  "hey-1.mp3",
  "hey-2.mp3",
  "hey-3.mp3",
  "hey-4.mp3",
  "hey-5.mp3",
  "hey-6.mp3",
  "hey-7.mp3",
  "hey-8.mp3",
  "hey-9.mp3",
]);
const socialHmmSounds = fisherYatesShuffle([
  "hmm-1.mp3",
  "hmm-2.mp3",
  "hmm-3.mp3",
]);
const SOCIAL_EFFECT_SOUND = "laugh.wav";
export const socialAudio = {
  parallel: {
    A: socialHeySounds[0],
    B: socialHeySounds[1],
    C: socialHeySounds[2],
    D: socialHmmSounds[0],
    Y: SOCIAL_EFFECT_SOUND,
  },
  chain: {
    A: socialHeySounds[3],
    B: socialHeySounds[4],
    C: socialHeySounds[5],
    D: socialHmmSounds[1],
    Y: SOCIAL_EFFECT_SOUND,
  },
  confound: {
    A: socialHeySounds[6],
    B: socialHeySounds[7],
    C: socialHeySounds[8],
    D: socialHmmSounds[2],
    Y: SOCIAL_EFFECT_SOUND,
  },
};

const NATURAL_EFFECT_SOUND = "nat-effect.mp3";

export const naturalAudio = {
  parallel: {
    A: "shine.mp3",
    B: "rain.mp3",
    C: "tool_switch.wav",
    D: "cat.wav",
    Y: NATURAL_EFFECT_SOUND,
  },
  chain: {
    A: "warm-shine.mp3",
    B: "boiling.mp3",
    C: "boat-wind.wav",
    D: "bird.mp3",
    Y: NATURAL_EFFECT_SOUND,
  },
  confound: {
    A: "winter-wind.mp3",
    B: "ice-forming.mp3",
    C: "cloudy-sun.mp3",
    D: "sea-grass.wav",
    Y: NATURAL_EFFECT_SOUND,
  },
};

export const familiarizationAudio = {
  A: "fam.wav",
  Y: "fam-1.wav"
}