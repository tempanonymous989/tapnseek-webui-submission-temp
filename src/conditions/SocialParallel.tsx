import React, { useRef } from 'react'
import { NodeState, fisherYatesShuffle, recordTouch } from './functions';
import { useParallelGraph, useSocialTransition } from './hooks';
import { socialAudio } from './sounds';

const DURATION = 500;
const SCENARIO = 'Social'
const GRAPH = 'Parallel'

// only shuffle last two laiens here
const variableIndicies = [0].concat(fisherYatesShuffle([1, 2]).slice(0, 1))

const parallelRecordTouch = (node: NodeState, nodeArray: NodeState[]) => (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
	if (node.key !== 'Y') {
		node.setState(true)
	}
	recordTouch(node.key, SCENARIO, GRAPH, variableIndicies, nodeArray, e)
}

export default function SocialParallel() {

	const nodeArray = useParallelGraph(variableIndicies, SCENARIO, DURATION, DURATION * 5)
	const [nodeA, nodeB, nodeC, nodeD, nodeY] = nodeArray

	return (
		<div className="w-full">
			<svg className="w-full h-screen mx-auto bg-gray-100" viewBox="0 0 100 150">
				<AlienA state={nodeA.state} onClick={parallelRecordTouch(nodeA, nodeArray)} x={-35} y={0} />
				<AlienB state={nodeB.state} onClick={parallelRecordTouch(nodeB, nodeArray)} x={5} y={10} />
				<AlienC state={nodeC.state} onClick={parallelRecordTouch(nodeC, nodeArray)} x={60} y={20} />
				<AlienD state={nodeD.state} onClick={parallelRecordTouch(nodeD, nodeArray)} x={100} y={30} />
				<AlienY state={nodeY.state} onClick={parallelRecordTouch(nodeY, nodeArray)} x={50} y={-30} />
			</svg>

		</div>
	);
}

const AlienA: React.FC<GroupComponent> = (props) => {

	const ref = useRef<SVGRectElement>(null)
	let { state } = props

	useSocialTransition(socialAudio.parallel.A, ref, state)

	return <g id="alienA" className="cursor-pointer" onClick={props.onClick} transform={`translate(${props.x},${props.y})`} fill="#22c55e">
		<ellipse cx={10} cy={50} rx={10} ry={15} />
		<ellipse cx={10} cy={60} rx={8} ry={4} />
		<rect transform={`rotate(-15)`} x={-5} y={30} height={10} width={1} />
		<rect transform={`rotate(15)`} x={24} y={25} height={10} width={1} />
		<g id="a-eyes">
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
			<rect ref={ref} rx={1.5} ry={1.5} style={{ transformOrigin: "bottom", transformBox: "fill-box" }} x={17.5} y={39} height={10} width={2} />
		</g>

	</g>
}

const AlienB: React.FC<GroupComponent> = (props) => {
	const ref = useRef<SVGRectElement>(null)
	let { state } = props

	useSocialTransition(socialAudio.parallel.B, ref, state, "heyLeft")

	return <g className="cursor-pointer" onClick={props.onClick} transform={`translate(${props.x},${props.y})`} fill="#06b6d4">
		<ellipse cx={10} cy={45} rx={10} ry={8} />
		<ellipse cx={10} cy={52} rx={10} ry={12} />
		<g id="b-eyes">
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
			<rect ref={ref} rx={1.5} ry={1.5} style={{ transformOrigin: "bottom", transformBox: "fill-box" }} x={0.5} y={40} height={10} width={2} />
			<rect rx={1.5} ry={1.5} transform={`rotate(-45)`} x={-23} y={48} height={10} width={2} />
		</g>
	</g>
}

const AlienC: React.FC<GroupComponent> = (props) => {
	const ref = useRef<SVGRectElement>(null)
	let { state } = props

	useSocialTransition(socialAudio.parallel.C, ref, state, "heyLeft")

	return <g onClick={props.onClick} className="cursor-pointer" transform={`translate(${props.x},${props.y})`} fill="#fbbf24">
		<rect height={25} width={19} x={0.5} y={38} rx={4} ry={18} />
		<circle r={5} cy={40} cx={10} />
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
			<rect ref={ref} rx={1.5} ry={1.5} style={{ transformOrigin: "bottom", transformBox: "fill-box" }} x={1} y={40} height={10} width={2} />
			<rect rx={1.5} ry={1.5} transform={`rotate(-45)`} x={-23} y={48} height={10} width={2} />
		</g>
	</g>
}

const AlienD: React.FC<GroupComponent> = (props) => {
	const ref1 = useRef<SVGCircleElement>(null)
	const ref2 = useRef<SVGCircleElement>(null)
	let { state } = props

	useSocialTransition(socialAudio.parallel.D, ref1, state, "eyes", ref2)

	return <g onClick={props.onClick} className="cursor-pointer" transform={`translate(${props.x},${props.y})`} fill="rgb(236 72 153)">
		<rect height={25} width={19} x={0.5} y={38} rx={4} ry={18} />
		<g>
			<ellipse rx={5} ry={8} cy={40} cx={5} />
			<ellipse rx={5} ry={8} cy={40} cx={10} />
			<ellipse rx={5} ry={8} cy={40} cx={15} />
			<ellipse rx={5} ry={8} cy={60} cx={5} />
			<ellipse rx={5} ry={8} cy={60} cx={10} />
			<ellipse rx={5} ry={8} cy={60} cx={15} />
		</g>
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

const AlienY: React.FC<GroupComponent> = (props) => {
	const ref2 = useRef<SVGPathElement>(null)
	const ref1 = useRef<SVGEllipseElement>(null)

	useSocialTransition(socialAudio.parallel.Y, ref1, props.state, "laugh", ref2)

	return <g transform={`translate(${props.x},${props.y})`} fill="#a3a3a3">
		<ellipse cx={10} cy={40} rx={6} ry={3} />
		<ellipse cx={10} cy={49} rx={10} ry={10} />
		<ellipse cx={10} cy={57} rx={8} ry={6} />
		<g id="c-eyes">
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
		<path ref={ref2} opacity={0} id="smile" transform={`translate(11.8, 50) scale(0.05) rotate(180)`} d="M125,85 a60,60 0 1,0 -180,0" fill="black" />
		<ellipse ref={ref1} opacity={1} id="frown" fill="black" cx={10} cy={47} rx={5} ry={0.8} />
		<g>
			<rect rx={1.5} ry={1.5} transform={`rotate(45)`} x={35} y={34} height={10} width={2} />
			<rect rx={1.5} ry={1.5} transform={`rotate(-45)`} x={-23} y={48} height={10} width={2} />
		</g>
	</g>
}


