import { abstractAudio, familiarizationAudio, naturalAudio, socialAudio } from "./sounds";
import React, { Dispatch, SetStateAction } from "react";

export const playAudio = (audioFile: string, timeout: number = 0) => {
  const audio = new Audio(import.meta.env.BASE_URL + "sfx/" + audioFile);
  audio.volume = 1;
  setTimeout(() => {
    audio.play();
  }, timeout);
  return audio;
};

export const animateShapeColor = (
  el: SVGElement,
  propA: { cx?: number, cy?: number, fill?: string, opacity?: number, transform?: string },
  propB: { cx?: number, cy?: number, fill?: string, opacity?: number, transform?: string },
  parentNum: number,
  state: boolean,
  duration: number
) => {
  if (state) {

    el.animate([propA, propB], {
      delay: parentNum * duration,
      duration: duration,
      iterations: 1,
      fill: "forwards",
      easing: "linear",
    }).play();
  } else {
    // add no delay when turning off
    el.animate([propB, propA], {
      delay: 0,
      duration: 0,
      iterations: 1,
      fill: "forwards",
      easing: "linear",
    }).play();
  }
};

export const animateCustom = (
  el: SVGElement,
  propA: Keyframe,
  propB: Keyframe,
  state: boolean,
  duration: number,
  delay: number
) => {
  if (state) {
    el.animate([propA, propB], {
      delay: delay,
      duration: duration,
      iterations: 1,
      fill: "forwards",
      easing: "linear",
    }).play();
  } else {
    // add no delay when turning off
    el.animate([propB, propA], {
      delay: 0,
      duration: 0,
      iterations: 1,
      fill: "forwards",
      easing: "linear",
    }).play();
  }
};

export type NodeState = {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
  key: "A" | "B" | "C" | "D" | "Y";
};

export const useMultiState = (
  initialValues: Array<{ key: NodeState["key"]; value: boolean }>
): NodeState[] => {
  return initialValues.reduce((states: NodeState[], initialValue) => {
    const [state, setState] = React.useState(initialValue.value);
    return [...states, { state, setState, key: initialValue.key }];
  }, []);
};

export function fisherYatesShuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export type Touch = {
  x: number;
  y: number;
  node: string;
  timestamp: number;
  endNode1: string;
  endNode2: string;
  nodeAState: boolean;
  nodeBState: boolean;
  nodeCState: boolean;
  nodeDState: boolean;
  nodeYState: boolean;
};
export type Scenario = "Abstract" | "Social" | "Natural" | "Familiarization";
export type Graph = "Parallel" | "Chain" | "Confound" | "Familiarization";
const recordedTouches: Touch[] = [];

const allAudio = {
  Abstract: abstractAudio,
  Social: socialAudio,
  Natural: naturalAudio,
};

const convertGraphToAudioName = (graph: Graph) => {
  switch (graph) {
    case "Parallel":
      return "parallel";
    case "Chain":
      return "chain";
    case "Confound":
      return "confound";
    case "Familiarization":
      return "fam";
  }
};

type audioStruct = {
  A: string;
  B: string;
  C: string;
  D: string;
  Y: string;
};

export function recordTouch(
  node: string,
  scenario: Scenario,
  graph: Graph,
  endIndicies: number[],
  nodeArray: NodeState[],
  event: { pageX: number; pageY: number }
) {
  const x = event.pageX;
  const y = event.pageY;
  const timestamp = new Date().getTime();
  const [endIdx1, endIdx2, _] = endIndicies;
  const endNodes = ["A", "B", "C"];

  const endNode1 = endNodes[endIdx1],
    endNode2 = endNodes[endIdx2];

  const nodeAState = nodeArray[0].state,
    nodeBState = nodeArray[1].state,
    nodeCState = nodeArray[2].state,
    nodeDState = nodeArray[3].state,
    nodeYState = nodeArray[4].state;

  const graphAudioName = convertGraphToAudioName(graph);
  const audioName: audioStruct | undefined =
    graphAudioName !== "fam" && scenario !== "Familiarization"
      ? allAudio[scenario][graphAudioName]
      : undefined;

  const touch = {
    x,
    y,
    node,
    timestamp,
    scenario,
    graph,
    endNode1,
    endNode2,
    nodeAState,
    nodeBState,
    nodeCState,
    nodeDState,
    nodeYState,
    nodeAAudio: audioName ? audioName.A : familiarizationAudio.A,
    nodeBAudio: audioName ? audioName.B : "N/A",
    nodeCAudio: audioName ? audioName.C : "N/A",
    nodeDAudio: audioName ? audioName.D : "N/A",
    nodeYAudio: audioName ? audioName.Y : familiarizationAudio.Y,
  };
  recordedTouches.push(touch);
}

export function getAllTouches() {
  return recordedTouches;
}
