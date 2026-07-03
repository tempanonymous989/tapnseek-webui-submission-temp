import React, { useRef } from 'react'
import { NodeState, fisherYatesShuffle, recordTouch } from './functions';
import { useAbstractTransition, useParallelGraph } from './hooks';
import { abstractAudio } from './sounds';


const COLOR_A = "#4f46e5"
const COLOR_B = "#16a34a"
const DURATION = 500
const LEVEL = 10
const SCENARIO = 'Abstract'
const GRAPH = 'Parallel'

const variableIndicies = fisherYatesShuffle([0, 1, 2]).slice(0, 2)
const parallelRecordTouch = (node: NodeState, nodeArray: NodeState[]) => (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
	if (node.key !== 'Y') {
		node.setState(true)
	}
	recordTouch(node.key, SCENARIO, GRAPH, variableIndicies, nodeArray, e)
}

function AbstractParallel() {
	const nodeArray = useParallelGraph(variableIndicies, SCENARIO, DURATION, DURATION * 4)
	const [nodeA, nodeB, nodeC, nodeD, nodeY] = nodeArray

	return (
		<div className="w-screen">
			<svg width={1024} height={768} className="w-full h-screen mx-auto bg-blue-100" viewBox="0 0 100 150">
				<ShapeA state={nodeA.state} onClick={parallelRecordTouch(nodeA, nodeArray)} x={-30} y={LEVEL} />
				<ShapeB state={nodeB.state} onClick={parallelRecordTouch(nodeB, nodeArray)} x={20} y={LEVEL + 10} />
				<ShapeC state={nodeC.state} onClick={parallelRecordTouch(nodeC, nodeArray)} x={60} y={LEVEL + 10} />
				<ShapeD state={nodeD.state} onClick={parallelRecordTouch(nodeD, nodeArray)} x={85} y={LEVEL} />
				<LightBulb state={nodeY.state} onClick={parallelRecordTouch(nodeY, nodeArray)} x={31} y={32} />
			</svg>
		</div>
	);
}

export const ShapeA: React.FC<GroupComponent> = (props) => {
	const ref = useRef<SVGRectElement>(null)
	useAbstractTransition(COLOR_A, COLOR_B, abstractAudio.parallel.A, ref, props.state)

	return <rect id="shapeA" ref={ref} className="cursor-pointer"
		onClick={props.onClick}
		x={props.x}
		y={props.y}
		width={20}
		height={20}
	/>

}

export const ShapeB: React.FC<GroupComponent> = (props) => {
	const ref = useRef<SVGCircleElement>(null)

	useAbstractTransition(COLOR_A, COLOR_B, abstractAudio.parallel.B, ref, props.state)

	return <circle id="shapeB" ref={ref} className="cursor-pointer"
		onClick={props.onClick}
		cx={props.x}
		cy={props.y}
		r={10}
	/>
}

export const ShapeC: React.FC<GroupComponent> = (props) => {
	const ref = useRef<SVGPolygonElement>(null)
	useAbstractTransition(COLOR_A, COLOR_B, abstractAudio.parallel.C, ref, props.state)

	return <polygon
		id="shapeC"
		ref={ref}
		className="cursor-pointer"
		onClick={props.onClick}
		transform={`translate(${props.x - 25},${props.y - 92}) scale(0.5)`}
		points="50 160 55 180 70 180 60 190 65 205 50 195 35 205 40 190 30 180 45 180"
	/>
}

export const ShapeD: React.FC<GroupComponent> = (props) => {

	const fill = COLOR_A
	const ref1 = useRef<SVGGElement>(null)
	const ref2 = useRef<SVGGElement>(null)

	useAbstractTransition(COLOR_A, COLOR_B, abstractAudio.parallel.D, ref1, props.state, ref2)

	return (
		<>
			<g id="shapeD-b" opacity={0} ref={ref1} onClick={props.onClick} fill={fill} className="cursor-pointer" transform={`translate(${props.x},${props.y - 8.5}) scale(0.15)`}>
				<path d="m 37.234358,189.89525 71.195592,-123.783666 71.60201,123.549026 z" />
			</g>
			<g id="shapeD-a" opacity={1} ref={ref2} onClick={props.onClick} fill={fill} className="cursor-pointer" transform={`translate(${props.x},${props.y - 8.5}) scale(0.15)`}>
				<path d="m 53.529177,199.27968 -31.028773,-94.82814 80.598496,-58.813625 80.84139,58.479325 -30.63578,94.95583 z" />
			</g>
		</>
	)

}

export const LightBulb: React.FC<GroupComponent> = (props) => {
	const OFF = "#9ca3af"
	const ON = "#fde047"

	const ref = useRef<SVGCircleElement>(null)
	useAbstractTransition(OFF, ON, abstractAudio.parallel.Y, ref, props.state)

	return <g onClick={props.onClick}>
		<g
			id="layer1"

			transform={`translate(${props.x},${props.y}) scale(0.03)`}>
			<rect
				id="rect4197-2-5"
				width="241.9523"
				height="120.97617"
				x="216.11647"
				y="781.4848"
				ry="60.488087"
				fill={"#c1c1c1"}
				transform="rotate(-3.0317637)" />
			<circle
				r="234.93587"
				cy="604.09003"
				cx="337.09317"
				id="circle4193-7-3"
				transform="rotate(-3.0317637)"
				ref={ref} />
			<path
				fill={"#ffffff"}
				d="m 281.90575,470.74286 c -39.13538,36.34423 -10.62733,130.74369 -48.54482,93.13039 -37.91737,-37.61305 -38.16395,-98.84292 -0.55089,-136.76016 37.61305,-37.91761 119.38847,-51.0556 136.76028,-0.55102 20.49173,59.57593 -59.05617,17.61272 -87.66457,44.18079 z"
				id="circle4201-2-4" />
			<rect
				fill={"#c1c1c1"}
				transform="rotate(-3.0317637)"
				ry="60.488087"
				y="843.77808"
				x="212.81747"
				height="120.97617"
				width="241.9523"
				id="rect6775-6" />
			<rect
				fill={"#c1c1c1"}
				id="rect6777-9"
				width="241.9523"
				height="120.97617"
				x="210.12419"
				y="894.6297"
				ry="60.488087"
				transform="rotate(-3.0317637)" />
			<rect
				fill={"#797979"}
				transform="matrix(0.99999302,-0.00373535,0.60049585,0.79962787,0,0)"
				ry="4.6030784"
				y="1065.5514"
				x="-365.85168"
				height="9.2061567"
				width="208.75793"
				id="rect6779-9" />
			<rect
				fill={"#797979"}
				id="rect6781-7"
				width="208.75793"
				height="9.2061567"
				x="-412.56671"
				y="1143.3452"
				ry="4.6030784"
				transform="matrix(0.99999302,-0.00373535,0.60049585,0.79962787,0,0)" />
		</g>
		<rect x={30} y={60} width={25} height={25} fill={"#CD9F61"} rx={1} />
	</g>
}


export default AbstractParallel