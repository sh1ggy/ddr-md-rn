export interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
  types: [
    {
      slot: 1;
      type: [Object];
    }
  ];
}

export interface Type {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

// DDR Types

export interface Song {
  id: number;
  name: string;
  title: string;
  titletranslit: string;
  version: string;
  artist: string;
  bpm: number;
  sp: Difficulty;
  dp?: Difficulty;
}

export interface DetailedSong extends Song {
  ssc: boolean;
  songLength: number;
  perChart: boolean;
  charts: Chart[];
}

export interface Chart {
  dominant_bpm: number;
  trueMin: number;
  trueMax: number;
  bpmRange: string;
  bpms: BPM[];
  stops: Stop[];
}

export interface BPM {
  st: number;
  ed: number;
  val: number;
}

export interface Stop {
  st: number;
  dur: number;
  beats: Beat[];
}

export interface Beat {
  bpm: number;
  val: number;
}

export interface Difficulty {
  easy: number;
  medium: number;
  hard: number;
  challenge: number;
  beginner?: number;
}
