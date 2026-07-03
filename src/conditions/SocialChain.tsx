import React, { useRef } from 'react'
import { NodeState, fisherYatesShuffle, recordTouch } from './functions';
import { useChainGraph, useSocialTransition } from './hooks';
import { socialAudio } from './sounds';

const DURATION = 500;
const GRAPH = "Chain"
const SCENARIO = "Social"

const variableIndicies = fisherYatesShuffle([0, 1]).slice(0, 1).concat([2])
const chainMiddleNode = ["A", "B", "C"][variableIndicies[1]]
const chainRecordTouch = (node: NodeState, nodeArray: NodeState[]) => (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
	if (node.key !== 'Y' && node.key !== chainMiddleNode) {
		node.setState(true)
	}
	recordTouch(node.key, SCENARIO, GRAPH, variableIndicies, nodeArray, e)
}

export default function SocialChain() {
	const nodeArray = useChainGraph(variableIndicies, SCENARIO, DURATION, DURATION * 5)
	const [nodeA, nodeB, nodeC, nodeD, nodeY] = nodeArray


	return (
		<div className="w-full">
			<svg className="w-full h-screen mx-auto bg-red-100" viewBox="0 0 100 150">
				<AlienA state={nodeA.state} onClick={chainRecordTouch(nodeA, nodeArray)} x={-30} y={0} />
				<AlienB state={nodeB.state} onClick={chainRecordTouch(nodeB, nodeArray)} x={5} y={10} />
				<AlienC state={nodeC.state} onClick={chainRecordTouch(nodeC, nodeArray)} x={100} y={30} />
				<AlienD state={nodeD.state} onClick={chainRecordTouch(nodeD, nodeArray)} x={60} y={20} />
				<AlienY state={nodeY.state} onClick={chainRecordTouch(nodeY, nodeArray)} x={50} y={-30} />
			</svg>

		</div>
	);
}

const AlienA: React.FC<GroupComponent> = (props) => {
	const ref = useRef<SVGRectElement>(null)
	let { state } = props

	useSocialTransition(socialAudio.chain.A, ref, state)


	return <g className="cursor-pointer" onClick={props.onClick} transform={`translate(${props.x},${props.y})`} fill="#c4b5fd">
		<g>
			<ellipse cx={10} cy={50} rx={10} ry={10} />
			<ellipse cx={14} cy={60} rx={3} ry={6} />
			<ellipse cx={6} cy={60} rx={3} ry={6} />
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
	const ref = useRef<SVGRectElement>(null)
	let { state } = props

	useSocialTransition(socialAudio.chain.B, ref, state)

	return <g className="cursor-pointer" onClick={props.onClick} transform={`translate(${props.x},${props.y})`} fill="#e879f9">
		<g>
			<ellipse cx={10} cy={40} rx={8} ry={4} />
			<ellipse cx={10} cy={45} rx={10} ry={4} />
			<ellipse cx={10} cy={50} rx={10} ry={4} />
			<ellipse cx={10} cy={55} rx={10} ry={4} />
			<ellipse cx={10} cy={60} rx={10} ry={4} />
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

const AlienC: React.FC<GroupComponent> = (props) => {

	const ref = useRef<SVGRectElement>(null)
	let { state } = props

	useSocialTransition(socialAudio.chain.C, ref, state, "heyLeft")

	return <g onClick={props.onClick} className="cursor-pointer" transform={`translate(${props.x},${props.y})`} fill="#0d9488">
		<g>
			<rect height={15} width={12} x={4} y={38} rx={4} ry={10} />
			<rect transform={`rotate(-15)`} x={-5} y={30} height={10} width={1} />
			<rect transform={`rotate(15)`} x={24} y={25} height={10} width={1} />
			<circle r={5} cy={40} cx={10} />
			<ellipse rx={9} ry={5} cy={45} cx={10} />
			<ellipse rx={10} ry={10} cy={54} cx={10} />
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
			<rect ref={ref} rx={1.5} ry={1.5} style={{ transformOrigin: "bottom", transformBox: "fill-box" }} x={1} y={40} height={10} width={2} />
			<rect rx={1.5} ry={1.5} transform={`rotate(-45)`} x={-23.7} y={48} height={10} width={2} />
		</g>
	</g>
}

const AlienD: React.FC<GroupComponent> = (props) => {
	const ref1 = useRef<SVGCircleElement>(null)
	const ref2 = useRef<SVGCircleElement>(null)
	let { state } = props

	useSocialTransition(socialAudio.chain.D, ref1, state, "eyes", ref2)

	return <g onClick={props.onClick} className="cursor-pointer" transform={`translate(${props.x},${props.y})`} fill="rgb(79 70 229)">
		<rect height={25} width={19} x={0.5} y={38} rx={4} ry={18} />
		<circle r={5} cy={40} cx={5} />
		<circle r={5} cy={40} cx={15} />
		<g id="eyes">
			<g>
				<circle fill="white" r={2} cx={8} cy={40} />
				<circle ref={ref1} fill="black" r={0.75}  cy={39.6} />
			</g>
			<g transform={`translate(5,0)`}>
				<circle fill="white" r={2} cx={8} cy={40} />
				<circle ref={ref2}  fill="black" r={0.75} cy={39.6} />
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

	useSocialTransition(socialAudio.chain.Y, ref1, props.state, "laugh", ref2)

	return <g transform={`translate(${props.x},${props.y})`} fill="#f43f5e">
		<g>
			<ellipse cx={10} cy={40} rx={3} ry={3} />
			<ellipse cx={10} cy={52} rx={10} ry={12} />
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
		<path ref={ref2} opacity={0} id="smile" transform={`translate(11.8, 50) scale(0.05) rotate(180)`} d="M125,85 a60,60 0 1,0 -180,0" fill="black" />
		<ellipse ref={ref1} opacity={1} id="frown" fill="black" cx={10} cy={47} rx={5} ry={0.8} />
		<g>
			<rect rx={1.5} ry={1.5} transform={`rotate(45)`} x={35} y={34} height={10} width={2} />
			<rect rx={1.5} ry={1.5} transform={`rotate(-45)`} x={-23} y={48} height={10} width={2} />
		</g>
	</g>
}



