import React, { useRef } from 'react'
import { NodeState, fisherYatesShuffle, recordTouch } from './functions';
import { useConfoundGraph, useSocialTransition } from './hooks';
import { socialAudio } from './sounds';

const DURATION = 500;
const SCENARIO = "Social"
const GRAPH = "Confound"

const variableIndicies = fisherYatesShuffle([0, 1]).slice(0, 1).concat([2])
const confoundMiddleNode = ["A", "B", "C"][variableIndicies[1]]

const confoundRecordTouch = (node: NodeState, nodeArray: NodeState[]) => (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
	if (node.key !== 'Y' && node.key !== confoundMiddleNode) {
		node.setState(true)
	}
	recordTouch(node.key, SCENARIO, GRAPH, variableIndicies, nodeArray, e)
}
export default function SocialConfound() {
	const nodeArray = useConfoundGraph(variableIndicies, SCENARIO, DURATION, DURATION * 5)
	const [nodeA, nodeB, nodeC, nodeD, nodeY] = nodeArray


	return (
		<div className="w-full">
			<svg className="w-full h-screen mx-auto" style={{ backgroundColor: "#ede9fe" }} viewBox="0 0 100 150">
				<AlienA state={nodeA.state} onClick={confoundRecordTouch(nodeA, nodeArray)} x={-30} y={0} />
				<AlienB state={nodeB.state} onClick={confoundRecordTouch(nodeB, nodeArray)} x={5} y={10} />
				<AlienC state={nodeC.state} onClick={confoundRecordTouch(nodeC, nodeArray)} x={60} y={20} />
				<AlienD state={nodeD.state} onClick={confoundRecordTouch(nodeD, nodeArray)} x={100} y={30} />
				<AlienY state={nodeY.state} onClick={confoundRecordTouch(nodeY, nodeArray)} x={50} y={-30} />
			</svg>

		</div>
	);
}

const AlienA: React.FC<GroupComponent> = (props) => {
	const ref = useRef<SVGRectElement>(null)
	let { state } = props

	useSocialTransition(socialAudio.confound.A, ref, state)

	return <g className="cursor-pointer" onClick={props.onClick} transform={`translate(${props.x},${props.y})`} fill="#65a30d">
		<g>
			<ellipse cx={4} cy={45} rx={5} ry={10} />
			<ellipse cx={10} cy={48} rx={5} ry={10} />
			<ellipse cx={16} cy={45} rx={5} ry={10} />
			<ellipse cx={14} cy={60} rx={6} ry={6} />
			<ellipse cx={6} cy={60} rx={6} ry={6} />
		</g>
		<g id="eyes">
			<g>
				<circle fill="white" r={1.5} cx={8} cy={40} />
				<circle fill="black" r={0.7} cx={8} cy={40.2} />
			</g>
			<g transform={`translate(4,0)`}>
				<circle fill="white" r={1.5} cx={8} cy={40} />
				<circle fill="black" r={0.7} cx={8} cy={40.2} />
			</g>
		</g>
		<rect rx={0.8} ry={0.8} x={13} y={60} height={10} width={3} />
		<rect rx={0.8} ry={0.8} x={4} y={60} height={10} width={3} />
		<rect fill="black" rx={0.8} ry={0.8} x={5.5} y={45} height={0.5} width={9} />

		<g>
			<rect rx={1.5} ry={1.5} transform={`rotate(45)`} x={35} y={34} height={10} width={2} />
			<rect ref={ref} rx={1.5} ry={1.5} style={{ transformOrigin: "bottom", transformBox: "fill-box" }} x={17.5} y={39} height={10} width={2} />
		</g>
	</g>
}

const AlienB: React.FC<GroupComponent> = (props) => {
	const fill = "#fb923c"

	const ref = useRef<SVGRectElement>(null)
	let { state } = props

	useSocialTransition(socialAudio.confound.B, ref, state)

	return <g className="cursor-pointer" onClick={props.onClick} transform={`translate(${props.x},${props.y})`} fill={fill}>
		<g>
			<ellipse cx={10} cy={40} rx={8} ry={8} />
			<ellipse cx={10} cy={45} rx={7} ry={4} />
			<ellipse cx={5} cy={50} rx={5} ry={7} />
			<ellipse cx={10} cy={50} rx={5} ry={4} />
			<ellipse cx={15} cy={50} rx={5} ry={7} />
			<ellipse cx={10} cy={55} rx={4} ry={4} />
			<ellipse cx={10} cy={56} rx={8} ry={7} />
		</g>
		<g id="eyes">
			<g>
				<circle fill="white" r={1} cx={8} cy={40} />
				<circle fill="black" r={0.5} cx={8} cy={40} />
			</g>
			<g transform={`translate(4,0)`}>
				<circle fill="white" r={1} cx={8} cy={40} />
				<circle fill="black" r={0.5} cx={8} cy={40} />
			</g>
		</g>
		<rect rx={0.8} ry={0.8} x={13} y={60} height={10} width={3} />
		<rect rx={0.8} ry={0.8} x={4} y={60} height={10} width={3} />
		<rect fill="black" rx={0.8} ry={0.8} x={5.5} y={45} height={0.5} width={9} />
		<g>
			<rect rx={1.5} ry={1.5} transform={`rotate(45)`} x={35} y={34} height={10} width={2} />
			<rect ref={ref} rx={1.5} ry={1.5} style={{ transformOrigin: "bottom", transformBox: "fill-box" }} x={17} y={39} height={10} width={2} />

		</g>
	</g>
}

const AlienY: React.FC<GroupComponent> = (props) => {
	const ref2 = useRef<SVGPathElement>(null)
	const ref1 = useRef<SVGEllipseElement>(null)

	useSocialTransition(socialAudio.confound.Y, ref1, props.state, "laugh", ref2)

	return <g transform={`translate(${props.x},${props.y})`} fill="#7dd3fc">
		<g>
			<ellipse cx={7} cy={40} rx={3} ry={3} />
			<ellipse cx={13} cy={40} rx={3} ry={3} />
			<ellipse cx={10} cy={47} rx={10} ry={6} />
			<ellipse cx={10} cy={52} rx={10} ry={5} />
			<ellipse cx={10} cy={57} rx={8} ry={6} />
		</g>
		<g id="eyes">
			<g>
				<circle fill="white" r={1} cx={8} cy={40} />
				<circle fill="black" r={0.5} cx={8} cy={40} />
			</g>
			<g transform={`translate(4,0)`}>
				<circle fill="white" r={1} cx={8} cy={40} />
				<circle fill="black" r={0.5} cx={8} cy={40} />
			</g>
		</g>
		<rect rx={0.8} ry={0.8} x={13} y={60} height={10} width={3} />
		<rect rx={0.8} ry={0.8} x={4} y={60} height={10} width={3} />
		{/* {props.haveHandsUp ?
			<path id="smile" transform={`translate(11.8, 50) scale(0.05) rotate(180)`} d="M125,85 a60,60 0 1,0 -180,0" fill="black" /> :
			<ellipse fill="black" cx={10} cy={47} rx={5} ry={0.8} />
			// <path id="frown" transform={`translate(8.5, 46) scale(0.05) rotate(0)`} d="M125,85 a60,60 0 1,0 -180,0" fill="black" />
		} */}
		<path ref={ref2} opacity={0} id="smile" transform={`translate(11.8, 50) scale(0.05) rotate(180)`} d="M125,85 a60,60 0 1,0 -180,0" fill="black" />
		<ellipse ref={ref1} opacity={1} id="frown" fill="black" cx={10} cy={47} rx={5} ry={0.8} />
		<g>
			<rect rx={1.5} ry={1.5} transform={`rotate(45)`} x={35} y={34} height={10} width={2} />
			<rect rx={1.5} ry={1.5} transform={`rotate(-45)`} x={-23} y={48} height={10} width={2} />
		</g>
	</g>
}

const AlienC: React.FC<GroupComponent> = (props) => {

	const ref = useRef<SVGRectElement>(null)
	let { state } = props

	useSocialTransition(socialAudio.confound.C, ref, state, "heyLeft")

	return <g onClick={props.onClick} className="cursor-pointer" transform={`translate(${props.x},${props.y})`} fill="#f9a8d4">
		<g>
			<ellipse rx={8} ry={5} cy={40} cx={10} />
			<ellipse rx={6} ry={5} cy={45} cx={10} />
			<ellipse rx={10} ry={4} cy={50} cx={10} />
			<ellipse rx={10} ry={4} cy={54} cx={10} />
			<ellipse rx={10} ry={8} cy={55} cx={10} />
		</g>
		<g id="eyes">
			<g>
				<circle fill="white" r={1} cx={8} cy={40} />
				<circle fill="black" r={0.5} cx={8} cy={40} />
			</g>
			<g transform={`translate(4,0)`}>
				<circle fill="white" r={1} cx={8} cy={40} />
				<circle fill="black" r={0.5} cx={8} cy={40} />
			</g>
		</g>
		<rect rx={0.8} ry={0.8} x={13} y={60} height={10} width={3} />
		<rect rx={0.8} ry={0.8} x={4} y={60} height={10} width={3} />
		{/* <path transform={`translate(11.5, 50) scale(0.05) rotate(180)`} d="M125,85 a60,60 0 1,0 -180,0" fill="black" /> */}
		<rect fill="black" rx={0.8} ry={0.8} x={5.5} y={45} height={0.5} width={9} />
		<g>
			{/* {armUp ?
				<rect rx={1.5} ry={1.5} transform={`rotate(110)`} x={40} y={-18} height={10} width={2} /> :
				<rect rx={1.5} ry={1.5} transform={`rotate(45)`} x={35} y={34} height={10} width={2} />} */}
			<rect ref={ref} rx={1.5} ry={1.5} style={{ transformOrigin: "bottom", transformBox: "fill-box" }} x={1} y={40} height={10} width={2} />
			<rect rx={1.5} ry={1.5} transform={`rotate(-45)`} x={-23} y={48} height={10} width={2} />
		</g>
	</g>
}

const AlienD: React.FC<GroupComponent> = (props) => {
	const ref1 = useRef<SVGCircleElement>(null)
	const ref2 = useRef<SVGCircleElement>(null)
	let { state } = props

	useSocialTransition(socialAudio.confound.D, ref1, state, "eyes", ref2)

	return <g onClick={props.onClick} className="cursor-pointer" transform={`translate(${props.x},${props.y})`} fill="rgb(45 212 191)">
		<rect height={15} width={22} x={-1.5} y={38} rx={4} ry={18} />
		<rect height={15} width={19} x={-3} y={42} rx={4} ry={18} />
		<rect height={15} width={19} x={3} y={42} rx={4} ry={18} />
		<rect height={15} width={22} x={-1} y={48} rx={4} ry={18} />
		<g id="eyes">
			<g>
				<circle fill="white" r={2} cx={8} cy={40} />
				<circle ref={ref1} fill="black" r={0.75} cy={39.6} />
			</g>
			<g transform={`translate(5,0)`}>
				<circle fill="white" r={2} cx={8} cy={40} />
				<circle ref={ref2} fill="black" r={0.75} cy={39.6} />
			</g>
		</g>
		<rect rx={0.8} ry={0.8} x={13} y={60} height={10} width={3} />
		<rect rx={0.8} ry={0.8} x={4} y={60} height={10} width={3} />
		<rect fill="black" rx={0.8} ry={0.8} x={5.5} y={45} height={0.5} width={9} />
		<g>
			<rect rx={1.5} ry={1.5} style={{ transform: `rotate(-130deg)`, transformOrigin: "bottom", transformBox: "fill-box" }} x={1} y={40} height={10} width={2} />
			<rect rx={1.5} ry={1.5} transform={`rotate(-45)`} x={-23} y={48} height={10} width={2} />
		</g>
	</g>
}





