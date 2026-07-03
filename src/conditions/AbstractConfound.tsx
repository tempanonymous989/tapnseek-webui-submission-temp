
import { useEffect, useRef } from 'react'
import { NodeState, fisherYatesShuffle, playAudio, recordTouch } from './functions';
import { useAbstractTransition, useConfoundGraph } from './hooks';
import { abstractAudio } from './sounds';


const COLOR_A = "#d97706"
const COLOR_B = "#7c3aed"
const DURATION = 500
const LEVEL = 10
const SCENARIO = "Abstract"
const GRAPH = "Confound"

const variableIndicies = fisherYatesShuffle([0, 1, 2]).slice(0, 2)
const confoundMiddleNode = ["A", "B", "C"][variableIndicies[1]]

const confoundRecordTouch = (node: NodeState, nodeArray: NodeState[]) => (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
	if (node.key !== 'Y' && node.key !== confoundMiddleNode) {
		node.setState(true)
	}
	recordTouch(node.key, SCENARIO, GRAPH, variableIndicies, nodeArray, e)
}

export default function AbstractConfound() {
	const nodeArray = useConfoundGraph(variableIndicies, SCENARIO, DURATION, DURATION * 4)
	const [nodeA, nodeB, nodeC, nodeD, nodeY] = nodeArray


	return (
		<div className="w-full bg-red-100">
			<svg className="w-full h-screen mx-auto bg-red-100" viewBox="0 0 100 150">
				<ShapeA state={nodeA.state} onClick={confoundRecordTouch(nodeA, nodeArray)} x={-30} y={LEVEL} />
				<ShapeB state={nodeB.state} onClick={confoundRecordTouch(nodeB, nodeArray)} x={20} y={LEVEL + 10} />
				<ShapeC state={nodeC.state} onClick={confoundRecordTouch(nodeC, nodeArray)} x={60} y={LEVEL + 10} />
				<ShapeD state={nodeD.state} onClick={confoundRecordTouch(nodeD, nodeArray)} x={85} y={LEVEL} />
				<LightBulb state={nodeY.state} onClick={confoundRecordTouch(nodeY, nodeArray)} x={31} y={32} />
			</svg>
		</div>
	);
}


export const ShapeA: React.FC<GroupComponent> = (props) => {
	const ref = useRef<SVGPathElement>(null)
	const { state } = props;

	useAbstractTransition(COLOR_A, COLOR_B, abstractAudio.confound.A, ref, state)

	return <g
		id="shapeA"
		transform={`translate(${props.x - 20},${props.y - 24}) scale(0.3)`}
		onClick={props.onClick} className="cursor-pointer">
		<path ref={ref}
			id="path1057"
			d="m 264.13052,295.71817 78.47101,53.77844 30.28098,-90.1825 25.54417,91.63687 81.16477,-49.61955 -39.33508,86.61738 94.07066,14.16092 -85.809,41.06867 62.95984,71.31535 -92.13194,-23.69654 2.38941,95.10053 -55.34532,-77.37386 -59.29904,74.38711 7.33799,-94.8471 -93.24083,18.86714 66.58777,-67.94033 -83.55417,-45.48098 94.68039,-9.24351 z"
			transform="scale(0.26458333)" />
	</g>
}

export const ShapeB: React.FC<GroupComponent> = (props) => {
	const ref = useRef<SVGPathElement>(null)
	const { state } = props;

	useAbstractTransition(COLOR_A, COLOR_B, abstractAudio.confound.B, ref, state)


	return <path id="shapeB" ref={ref} className="cursor-pointer"
		d="m 760.93333,246.66666 c -19.30097,41.36984 -0.99459,-13.1942 -33.28089,19.07942 -32.28629,32.27361 22.28494,13.98867 -19.09248,33.27338 -41.37742,19.28471 7.71917,-10.74665 -37.75865,-6.77686 -45.47782,3.96979 8.07951,25.04042 -36.01341,13.21648 -44.09292,-11.82395 12.82104,-3.27063 -24.56872,-29.46217 -37.38976,-26.19154 -9.90642,24.37548 -36.08326,-13.02456 -26.17685,-37.40005 11.9238,5.73576 0.11718,-38.3618 -11.80662,-44.09756 -23.25701,12.30498 -19.26935,-33.17127 3.98765,-45.47626 5.44728,12.05832 24.74825,-29.31152 19.30097,-41.36984 -25.72539,-5.52315 6.5609,-37.79677 32.2863,-32.273612 -3.57807,12.73866 37.79935,-6.54605 41.37742,-19.284714 -16.15658,-20.766946 29.32123,-24.736739 45.47782,-3.969792 -10.92921,7.458439 33.1637,19.282379 44.09292,11.82395 0.97208,-26.293649 38.36184,-0.10211 37.38977,26.19154 -13.16646,-1.31167 13.01039,36.08838 26.17685,37.40005 17.64589,-19.51727 29.45251,24.58029 11.80663,44.09756 -9.24296,-9.46804 -13.23062,36.00822 -3.98766,45.47625 26.06299,-3.60854 6.76203,37.7613 z"
		transform="translate(-45,0) scale(0.1)"
		onClick={props.onClick}
		x={props.x}
		y={props.y}
	/>
}

export const ShapeC: React.FC<GroupComponent> = (props) => {
	const { state } = props

	const ref = useRef<SVGPathElement>(null)

	useAbstractTransition(COLOR_A, COLOR_B, abstractAudio.confound.C, ref, state)

	return (
		<>
			<path ref={ref} className="cursor-pointer"
				onClick={props.onClick}
				transform={`translate(${props.x - 45},${props.y - 110}) scale(0.02)`}
				d="M2196 6060 c-79 -20 -154 -71 -230 -154 -40 -45 -85 -104 -99 -132 -75 -149 -45 -333 74 -453 27 -26 65 -56 84 -67 33 -17 36 -22 30 -49 -14 -70 -16 -160 -3 -185 21 -41 92 -70 168 -70 74 0 147 29 165 66 6 12 25 34 42 48 39 33 49 74 37 154 l-9 57 64 65 c122 125 161 206 161 337 0 168 -102 312 -260 368 -56 20 -172 28 -224 15z"
				fill={COLOR_A}
			/>
		</>
	)
}

export const ShapeD: React.FC<GroupComponent> = (props) => {

	const fill = COLOR_A
	const ref1 = useRef<SVGGElement>(null)
	const ref2 = useRef<SVGGElement>(null)

	useAbstractTransition(COLOR_A, COLOR_B, abstractAudio.confound.D, ref1, props.state, ref2)

	useEffect(() => {
		props.state && playAudio("abs4.wav")
	}, [props.state])

	return <>
		<g id="shapeD-b" ref={ref1} opacity={0} onClick={props.onClick} fill={fill} className="cursor-pointer" transform={`translate(${props.x - 55},${props.y - 68.5}) scale(0.02)`}>
			<path d="M3153 4384 c-48 -24 -159 -153 -191 -221 -24 -53 -27 -69 -27 -173 0 -105 2 -120 28 -171 34 -70 115 -149 154 -150 59 -2 82 4 198 59 107 50 127 56 185 56 58 0 77 -5 187 -58 127 -60 185 -72 232 -47 27 15 156 162 177 203 86 167 36 413 -101 493 -61 36 -94 31 -237 -36 -106 -50 -118 -54 -189 -54 -70 0 -82 3 -189 54 -126 60 -178 70 -227 45z" />
		</g>
		<g id="shapeD-a" ref={ref2} opacity={1} onClick={props.onClick} fill={fill} className="cursor-pointer" transform={`translate(${props.x - 110},${props.y - 33.5}) scale(0.018)`}>
			<path
				d="M6626 3029 c-14 -11 -26 -29 -26 -40 0 -11 -10 -23 -24 -29 -35 -13 -46 -40 -46 -114 l0 -66 -78 0 c-69 0 -81 -3 -100 -23 -12 -13 -22 -30 -22 -39 0 -8 -11 -20 -25 -26 -14 -7 -30 -23 -35 -38 -6 -14 -10 -117 -10 -228 0 -265 -6 -256 156 -256 l114 0 0 -113 c0 -165 -13 -157 268 -157 209 0 223 1 242 20 11 11 20 29 20 40 0 11 12 26 29 34 36 19 41 33 41 112 l0 64 80 0 c69 0 82 3 100 22 11 12 20 29 20 38 0 9 11 22 25 28 14 7 30 23 35 38 6 14 10 117 10 228 0 265 6 256 -156 256 l-114 0 0 110 c0 104 -1 112 -25 135 -24 25 -24 25 -238 25 -202 0 -216 -1 -241 -21z"
			/>
		</g>
	</>
}

export const LightBulb: React.FC<GroupComponent> = (props) => {
	const OFF = "#9ca3af"
	const ON = "#fde047"

	const ref = useRef<SVGCircleElement>(null)
	useAbstractTransition(OFF, ON, abstractAudio.confound.Y, ref, props.state)

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

