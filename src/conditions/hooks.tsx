import { useEffect } from "react";
import { Scenario, animateShapeColor, playAudio, recordTouch, useMultiState } from "./functions";

export const useParallelGraph = (variableIndicies: number[], scenario: Scenario, transitionDuration: number, resetDuration: number) => {

	const [nodeA, nodeB, nodeC] = useMultiState([{ key: 'A', value: false }, { key: 'B', value: false }, { key: 'C', value: false }]);
	const [nodeD, nodeY] = useMultiState([{ key: 'D', value: false }, { key: 'Y', value: false }]);
	const nodeArray = [nodeA, nodeB, nodeC, nodeD, nodeY];

	// record start of study for start timestamp
	useEffect(() => {
		recordTouch('Start', scenario, "Parallel", variableIndicies, nodeArray, { pageX: 0, pageY: 0 });
	}, []);

	// randomly choose three endogenous variables
	useEffect(() => {
		const [endoIdx1, endoIdx2] = variableIndicies;
		const variableNodes = [nodeA, nodeB, nodeC];
		const endoNode1 = variableNodes[endoIdx1];
		const endoNode2 = variableNodes[endoIdx2];

		if (endoNode1.state && endoNode2.state) {
			setTimeout(() => {
				nodeY.setState(true);
			}, transitionDuration)

		}

	}, [nodeA.state, nodeB.state, nodeC.state]);

	// reset all other nodes once node Y has been activated
	useEffect(() => {
		if (nodeY.state) {
			// reset all other elements
			setTimeout(() => {
				nodeA.setState(false);
				nodeB.setState(false);
				nodeC.setState(false);
				nodeD.setState(false);
				nodeY.setState(false);
			}, resetDuration);
		}

	}, [nodeY.state]);

	return nodeArray;
};

export const useChainGraph = (variableIndicies: number[], scenario: Scenario, transitionDuration: number, resetDuration: number) => {

	const [nodeA, nodeB, nodeC] = useMultiState([{ key: 'A', value: false }, { key: 'B', value: false }, { key: 'C', value: false }]);
	const [nodeD, nodeY] = useMultiState([{ key: 'D', value: false }, { key: 'Y', value: false }]);
	const nodeArray = [nodeA, nodeB, nodeC, nodeD, nodeY];

	// record start of study for start timestamp
	useEffect(() => {
		recordTouch('Start', scenario, "Chain", variableIndicies, nodeArray, { pageX: 0, pageY: 0 });
	}, []);

	// randomly choose three endogenous variables
	useEffect(() => {
		const [endoIdx1, endoIdx2] = variableIndicies
		const variableNodes = [nodeA, nodeB, nodeC]
		const endoNode1 = variableNodes[endoIdx1]
		const endoNode2 = variableNodes[endoIdx2]

		if (endoNode1.state) {
			setTimeout(() => {
				endoNode2.setState(true)
			}, transitionDuration * 2)

			setTimeout(() => {
				nodeY.setState(true)
			}, transitionDuration * 3)
		}

	}, [nodeA, nodeB, nodeC])

	// reset all other nodes once node Y has been activated
	useEffect(() => {
		if (nodeY.state) {
			// reset all other elements
			setTimeout(() => {
				nodeA.setState(false)
				nodeB.setState(false)
				nodeC.setState(false)
				nodeD.setState(false)
				nodeY.setState(false)
			}, resetDuration)
		}

	}, [nodeY.state])

	return nodeArray;
};

export const useConfoundGraph = (variableIndicies: number[], scenario: Scenario, transitionDuration: number, resetDuration: number) => {

	const [nodeA, nodeB, nodeC] = useMultiState([{ key: 'A', value: false }, { key: 'B', value: false }, { key: 'C', value: false }]);
	const [nodeD, nodeY] = useMultiState([{ key: 'D', value: false }, { key: 'Y', value: false }]);
	const nodeArray = [nodeA, nodeB, nodeC, nodeD, nodeY];

	// record start of study for start timestamp
	useEffect(() => {
		recordTouch('Start', scenario, "Confound", variableIndicies, nodeArray, { pageX: 0, pageY: 0 });
	}, []);

	// randomly choose three endogenous variables
	useEffect(() => {
		const [endoIdx1, endoIdx2] = variableIndicies
		const variableNodes = [nodeA, nodeB, nodeC]
		const endoNode1 = variableNodes[endoIdx1]
		const endoNode2 = variableNodes[endoIdx2]

		if (endoNode1.state) {
			setTimeout(() => {
				endoNode2.setState(true)
			}, transitionDuration * 2)

			setTimeout(() => {
				nodeY.setState(true)
			}, transitionDuration * 2)
		}
	}, [nodeA, nodeB, nodeC])

	// reset all other nodes once node Y has been activated
	useEffect(() => {
		if (nodeY.state) {
			// reset all other elements
			setTimeout(() => {
				nodeA.setState(false)
				nodeB.setState(false)
				nodeC.setState(false)
				nodeD.setState(false)
				nodeY.setState(false)
			}, resetDuration)
		}

	}, [nodeY.state])

	return nodeArray;
};


const ABSTRACT_DURATION = 500;

export const useAbstractTransition = (
	colorA: string,
	colorB: string,
	audio: string,
	ref: React.RefObject<SVGElement>,
	state: boolean,
	shapeChangeRef?: React.RefObject<SVGElement>,
) => {
	useEffect(() => {
		state && playAudio(audio);
	}, [state]);

	if (shapeChangeRef) {
		useEffect(() => {
			if (state && ref.current && shapeChangeRef.current) {
				animateShapeColor(shapeChangeRef.current, { opacity: 1 }, { opacity: 0 }, 0, state, ABSTRACT_DURATION)
				animateShapeColor(ref.current, { opacity: 0 }, { opacity: 1 }, 0, state, ABSTRACT_DURATION)
			} else if (!state && ref.current && shapeChangeRef.current) {
				animateShapeColor(shapeChangeRef.current, { opacity: 1 }, { opacity: 0 }, 0, state, ABSTRACT_DURATION)
				animateShapeColor(ref.current, { opacity: 0 }, { opacity: 0 }, 0, state, ABSTRACT_DURATION)
			}
		}, [ref, shapeChangeRef, state])
	} else {
		useEffect(() => {
			if (!ref.current) return;
			animateShapeColor(
				ref.current,
				{ fill: colorA },
				{ fill: colorB },
				0,
				state,
				ABSTRACT_DURATION
			);
		}, [ref, state]);
	}

};

const SOCIAL_DURATION = 500

export const useSocialTransition = (
	audio: string,
	ref: React.RefObject<SVGElement>,
	state: boolean,
	type: ("heyRight" | "heyLeft" | "eyes" | "laugh") = "heyRight",
	ref2?: React.RefObject<SVGElement>) => {

	useEffect(() => {
		if (!ref.current) return
		if (type === "heyRight") {
			animateShapeColor(ref.current, { transform: `rotate(${130}deg)` }, { transform: `rotate(${state ? 45 : 130}deg)` }, 0, state, SOCIAL_DURATION)
		} else if (type === "heyLeft") {
			animateShapeColor(ref.current, { transform: `rotate(${-130}deg)` }, { transform: `rotate(${state ? -45 : -130}deg)` }, 0, state, SOCIAL_DURATION)
		} else if (type === "eyes" && ref2?.current) {
			animateShapeColor(ref.current, { transform: "translate(7px,0px)" }, { transform: state ? "translate(9px,0px)" : "translate(9px,0px)" }, 0, state, SOCIAL_DURATION)
			animateShapeColor(ref2.current, { transform: "translate(7px,0px)"  }, {  transform: state ? "translate(9px,0px)" : "translate(7px,0px)" }, 0, state, SOCIAL_DURATION)
		} else if (type === "laugh" && ref2?.current) {
			if (state) {
				animateShapeColor(ref.current, { opacity: 1 }, { opacity: 0 }, 0, state, SOCIAL_DURATION)
				animateShapeColor(ref2.current, { opacity: 0 }, { opacity: 1 }, 0, state, SOCIAL_DURATION)
			} else {
				animateShapeColor(ref.current, { opacity: 1 }, { opacity: 0 }, 0, state, SOCIAL_DURATION)
				animateShapeColor(ref2.current, { opacity: 0 }, { opacity: 0 }, 0, state, SOCIAL_DURATION)
			}
		}
	}, [ref, ref2, state, type])

	useEffect(() => {
		state && playAudio(audio)
	}, [state])
}

const NATURAL_DURATION = 900

export const useNaturalSound = (state: boolean, audioFile: string) => {
  useEffect(() => {
		if (state) {
			const audio = playAudio(audioFile)
			setTimeout(() => {
				audio.pause()
			}, NATURAL_DURATION)
		}
	}, [state])
}
