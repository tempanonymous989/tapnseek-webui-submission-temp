import React, { useRef } from 'react'
import { NodeState, fisherYatesShuffle, recordTouch } from './functions';
import { useAbstractTransition, useChainGraph } from './hooks';
import { abstractAudio, } from './sounds';

const COLOR_A = "#0891b2"
const COLOR_B = "#fb7185"
const DURATION = 500
const LEVEL = 10
const SCENARIO = "Abstract"
const GRAPH = "Chain"

const variableIndicies = fisherYatesShuffle([0, 1, 2]).slice(0, 2)
const chainMiddleNode = ["A", "B", "C"][variableIndicies[1]]

const chainRecordTouch = (node: NodeState, nodeArray: NodeState[]) => (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
	if (node.key !== 'Y' && node.key !== chainMiddleNode) {
		node.setState(true)
	}
	recordTouch(node.key, SCENARIO, GRAPH, variableIndicies, nodeArray, e)
}

function AbstractChain() {
	const nodeArray = useChainGraph(variableIndicies, SCENARIO, DURATION, DURATION * 4)
	const [nodeA, nodeB, nodeC, nodeD, nodeY] = nodeArray

	return (
		<div className="w-full ">
			<svg className="w-full h-screen mx-auto bg-green-100 " viewBox="0 0 100 150">
				<ShapeA state={nodeA.state} onClick={chainRecordTouch(nodeA, nodeArray)} x={-30} y={LEVEL} />
				<ShapeB state={nodeB.state} onClick={chainRecordTouch(nodeB, nodeArray)} x={20} y={LEVEL + 10} />
				<ShapeC state={nodeC.state} onClick={chainRecordTouch(nodeC, nodeArray)} x={60} y={LEVEL + 10} />
				<ShapeD state={nodeD.state} onClick={chainRecordTouch(nodeD, nodeArray)} x={85} y={LEVEL} />
				<LightBulb state={nodeY.state} onClick={chainRecordTouch(nodeY, nodeArray)} x={31} y={32} />
			</svg>
		</div>
	);
}


export const ShapeA: React.FC<GroupComponent> = (props) => {
	const ref = useRef<SVGPathElement>(null)

	useAbstractTransition(COLOR_A, COLOR_B, abstractAudio.chain.A, ref, props.state)

	return <path
		ref={ref}
		id="shapeA"
		onClick={props.onClick}
		className="cursor-pointer"
		transform={"translate(-50,-40) scale(0.015) "}
		x={props.x}
		y={props.y}
		d="M2042 4534 c-131 -35 -232 -104 -351 -242 -126 -145 -182 -256 -203 -400 -20 -143 16 -204 166 -277 274 -136 634 -137 912 -5 82 40 111 63 189 157 53 63 63 113 47 220 -39 249 -250 486 -488 548 -72 19 -201 18 -272 -1z"
		width={20}
		height={20}
	/>

}

export const ShapeB: React.FC<GroupComponent> = (props) => {
	const ref = useRef<SVGPathElement>(null)
	const { state } = props

	useAbstractTransition(COLOR_A, COLOR_B, abstractAudio.chain.B, ref, state)

	return <path
		id="shapeB"
		ref={ref} className="cursor-pointer"
		transform={"translate(-185,-60) scale(0.02) "}
		d="M10091 4494 l-131 -137 0 -364 0 -365 103 -98 102 -99 145 -1 146 0 107 101 c59 55 107 106 107 112 0 6 14 25 30 43 l31 31 0 359 -1 359 -99 98 -100 97 -154 0 -155 0 -131 -136z"
		onClick={props.onClick}
		cx={props.x}
		cy={props.y}
		r={10}
	/>
}

export const ShapeC: React.FC<GroupComponent> = (props) => {
	const ref = useRef<SVGPathElement>(null)
	let { state } = props

	useAbstractTransition(COLOR_A, COLOR_B, abstractAudio.chain.C, ref, state)

	return <path id="shapeC" ref={ref} className="cursor-pointer"
		transform={`translate(${-2},${3}) scale(0.022)`}
		x={props.x}
		y={props.y}
		d="m 2850,1309 c -51.8168,-77.2602 -90.0707,-162.8032 -210,-271 -62,-50 -153,-163 -181,-224 -25,-55 -42,-219 -37,-362 4,-141 20,-180 92,-229 67,-46 134,-64 256,-70 176,-8 325,38 377,118 12,19 35,49 50,67 55,66 55,68 51,296 -3,139 -9,223 -18,246 -22,58 -60,103 -160,186 -114,96 -146,139 -175,240 l -22,77 z"
		onClick={props.onClick}
	/>
}

export const ShapeD: React.FC<GroupComponent> = (props) => {
	const fill = COLOR_A
	const ref1 = useRef<SVGGElement>(null)
	const ref2 = useRef<SVGGElement>(null)

	useAbstractTransition(COLOR_A, COLOR_B, abstractAudio.chain.D, ref1, props.state, ref2)

	return <>
		<g id="shapeD-a" ref={ref1} opacity={1} onClick={props.onClick} fill={fill} className="cursor-pointer" transform={`translate(${props.x - 150},${props.y - 5}) scale(0.02)`}>
			<path d="M8315 1228 c-49 -3 -119 -14 -155 -23 -87 -23 -235 -95 -288 -141 -68 -58 -170 -201 -188 -263 -51 -169 70 -346 297 -435 132 -52 183 -60 359 -60 194 0 269 16 415 88 72 36 103 58 150 110 134 145 168 207 168 307 0 92 -33 158 -118 238 -143 134 -377 199 -640 179z m103 -322 c118 -62 153 -241 55 -283 -119 -49 -253 52 -253 192 0 78 30 104 118 105 29 0 65 -6 80 -14z" />
		</g>
		<g id="shapeD-b" ref={ref2} opacity={0} onClick={props.onClick} fill={fill} className="cursor-pointer" transform={`translate(${props.x - 50},${props.y - 8.5}) scale(0.1)`}>
			<path d="m 760.93333,246.66666 c -17.23162,36.93438 -34.48784,-25.95353 -67.87805,-2.58323 -33.3902,23.3703 19.7883,61.11567 -20.81361,64.65984 -40.60192,3.54417 5.23249,-42.84411 -31.70188,-60.07572 -36.93438,-17.23162 -43.03358,47.695 -66.40387,14.3048 -23.3703,-33.39021 39.72033,-16.89058 36.17616,-57.4925 -3.54417,-40.60191 -62.82187,-13.42066 -45.59026,-50.35504 17.23162,-36.93437 34.48784,25.95353 67.87805,2.58323 33.3902,-23.3703 -19.7883,-61.115668 20.81361,-64.659839 40.60192,-3.54417 -5.23249,42.844109 31.70188,60.075729 36.93438,17.23161 43.03358,-47.69501 66.40388,-14.3048 23.37029,33.3902 -39.72034,16.89058 -36.17617,57.49249 3.54417,40.60191 62.82187,13.42067 45.59026,50.35504 z" />
		</g>
	</>

}

export const LightBulb: React.FC<GroupComponent> = (props) => {
	const OFF = "#9ca3af"
	const ON = "#fde047"

	const ref = useRef<SVGCircleElement>(null)
	useAbstractTransition(OFF, ON, abstractAudio.chain.Y, ref, props.state)

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





export default AbstractChain