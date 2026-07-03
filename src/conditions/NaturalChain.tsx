import { useEffect, useRef } from "react";
import { useSpring, useSprings, animated } from 'react-spring'
import { NodeState, animateShapeColor, playAudio, recordTouch } from "./functions";
import { useChainGraph } from "./hooks";
import { naturalAudio } from "./sounds";

const DURATION = 800
const SCENARIO = "Natural"
const GRAPH = "Chain"

const variableIndicies = [0, 1, 2]
const chainMiddleNode = "B"

const chainRecordTouch = (node: NodeState, nodeArray: NodeState[]) => (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
	if (node.key !== 'Y' && node.key !== chainMiddleNode) {
		node.setState(true)
	}
	recordTouch(node.key, SCENARIO, GRAPH, variableIndicies, nodeArray, e)
}

export default function NaturalChain() {
	const nodeArray = useChainGraph(variableIndicies, SCENARIO, DURATION, DURATION * 3)
	const [nodeA, nodeB, nodeC, nodeD, nodeY] = nodeArray

	return (
		<div className="w-full">
			<svg className="w-full h-screen mx-auto" style={{ backgroundColor: "#60a5fa" }} viewBox="0 0 100 125">
				<rect id="sky_nat_chain" x={-100} y={0} width={300} height={80} fill={"#bae6fd"} />
				<rect id="water_nat_chain" x={-100} y={80} width={300} height={20} fill={"#60a5fa"} />
				<Sun state={nodeA.state} onClick={chainRecordTouch(nodeA, nodeArray)} x={-10} y={12} />
				<RisingVapor state={nodeB.state} onClick={chainRecordTouch(nodeB, nodeArray)} x={30} y={100} />
				<Boat state={nodeC.state} onClick={chainRecordTouch(nodeC, nodeArray)} x={0} y={70} />
				<Bird state={nodeD.state} onClick={chainRecordTouch(nodeD, nodeArray)} x={0} y={80} />
				<VaporClouds state={nodeY.state} onClick={chainRecordTouch(nodeY, nodeArray)} x={0} y={0} />
			</svg>
		</div>
	);
}

const Sun: React.FC<GroupComponent> = (props) => {

	useEffect(() => {
		if (props.state) {
			const audio = playAudio(naturalAudio.chain.A)
			setTimeout(() => {
				audio.pause()
			}, DURATION)
		}
	}, [props.state])

	const springs = useSprings(12, Array.from(Array(12).keys()).map((i) => {
		return {
			config: { tension: 80 },
			from: { height: 0 },
			to: { height: !props.state ? 0 : 10 + (i % 2) * 2 },
		}
	}))

	return <g onClick={props.onClick} className="cursor-pointer" >
		<circle cx={props.x} cy={props.y} r={5} fill={"#fbd147"} strokeWidth={1} />
		{props.state && springs.map((style, i) => {
			return <animated.rect key={"nat_par_sun_" + i} x={props.x - 0.25} y={props.y} height={style.height} fill={"#fbd147"} width={0.5} transform={`rotate(${i * 30} ${props.x} ${props.y})`} />
		})}
	</g>
}

const RisingVapor: React.FC<GroupComponent> = (props) => {
	useEffect(() => {
		if (props.state) {
			const audio = playAudio(naturalAudio.chain.B)
			setTimeout(() => {
				audio.pause()
			}, DURATION)
		}
	}, [props.state])

	return <g onClick={props.onClick} >{props.state && Array.from(Array(6).keys()).map(level => {
		return Array.from(Array(20).keys()).map((i) => <Vapor key={"nat_chain_vapor" + i + "_" + level} level={level + 1} x={props.x + (i * 5)} y={props.y + level * 8} />)
	})}</g>
}

// https://publicdomainvectors.org/en/free-clipart/Boat-silhouette/43322.html
const Boat: React.FC<GroupComponent> = (props) => {
	const ref1 = useRef<SVGGElement>(null)
	const ref2 = useRef<SVGGElement>(null)

	const { state } = props
	useEffect(() => {
		if (!ref1.current) return
		animateShapeColor(ref1.current, { transform: "translate(-23.69px,47.97px) scale(0.04)" }, { transform: "translate(-36.69px,47.968px) scale(0.04)" }, 0, state, DURATION)
	}, [ref1, ref2, state])

	useEffect(() => {
		if (props.state) {
			const audio = playAudio(naturalAudio.chain.C)
			setTimeout(() => {
				audio.pause()
			}, DURATION)
		}
	}, [props.state])

	return <g onClick={props.onClick} className="cursor-pointer">
		{state && Array.from({ length: 9 }).map((_, i) => {
			return <g key={"nat_chain_boatswirl_" + i} transform={`translate(${((i % 2) * 10)},${((i % 3) * 4) + 58}) scale(-0.01, 0.01)`} fill="white" ><Swirl /></g>
		})}
		<g
			ref={ref1}
			>
			<path
				fill="brown"
				d="m 236.69009,726.91331 h 588.76662 l -101.34469,91.71742 h -393.27813 z"
			/>
			<path
				fill="rgb(100 116 139)"
				d="m 520.7182,436.96793 h -10e-6 l 177.51757,287.22946 h -177.51756 z"
			/>
			<path
				transform={props.state ? "scale(2) translate(-260,-362)" : ""}
				fill={props.state ? "rgb(148 163 184)" : "rgb(100 116 139)"}
				d="m 516.97124,497.61976 h 1e-5 l -99.80498,226.57763 h 99.80497 z"
			/>
		</g>
	</g >
}

const Bird: React.FC<GroupComponent> = (props) => {
	useEffect(() => {
		if (props.state) {
			const audio = playAudio(naturalAudio.chain.D)
			setTimeout(() => {
				audio.pause()
			}, DURATION)
		}
	}, [props.state])

	return <g onClick={props.onClick}
		fill={"#5c5759"}
		transform={`translate(${props.x}, ${props.y - 50}) scale(0.1)`}
	>
		{props.state ? <g
			id="layer1"
			transform="matrix(0.87310066,0,0,0.91726147,-36.899785,-73.770757)">
			<g
				id="g886"
				transform="matrix(0.26458333,0,0,0.26458333,-1.4011466,103.98961)">
				<g
					id="g4231"
					transform="matrix(2.9983387,0,0,2.9983387,-73.051627,-21.813089)">
					<path
						d="m 213.89183,1.7609967 c -13.89953,13.2269803 -22.58164,28.2667933 -22.58164,28.2667933 -8.29488,15.58092 -19.16792,14.68418 -19.16792,14.68418 6.5014,0.2242 15.24466,-7.51024 15.24466,-7.51024 l 23.09118,1.90559 h 26.56606 c 3.25068,4.82 -11.20931,6.83767 -11.20931,6.83767 h -11.76977 c -0.33628,5.49256 -7.39816,7.28045 -7.39816,7.28045 h -17.93008 c -19.33469,17.02094 -41.25505,14.12933 -41.25505,14.12933 -20.51303,-0.44837 -36.09395,-19.05582 -36.09395,-19.05582 -5.05948,-6.05221 -6.92402,-3.27911 -17.82922,-5.52777 -15.15971,-3.12595 -1.19683,-7.07512 -1.19683,-7.07512 9.83419,-1.57384 12.43257,0.59278 15.99953,-1.29665 4.67942,-5.58865 12.93823,-5.25649 19.11518,-2.676 7.81233,4.29689 17.95888,6.38182 26.05154,1.60762 10.61966,-8.39156 19.16665,-25.7296472 25.91332,-27.4565272 8.9308,-2.28593 22.91481,-23.9953938 54.60519,-22.3533338 0,0 -4.89022,19.0152677 -20.15473,18.2398277 z"

						id="path5597" />
					<path
						d="m 162.95725,42.959271 c 0,0 26.30297,-39.691295 22.67608,-29.205058 -14.56194,42.102127 34.14418,4.927245 27.76638,-19.3682763"

						id="path5606" />
					<path
						d="m 189.85298,53.00686 c 0,0 -1.79348,-8.51907 23.65163,-5.60465"

						id="path5608" />
					<path
						d="m 111.41075,6.8876787 c 0,0 39.27467,12.4796033 36.62114,31.9211313"
						id="path5610" />
					<path
						d="m 105.729,4.927292 c -9.179735,-6.2254639 -18.813281,-12.8944432 -24.578049,-22.63543 -1.031383,-1.754913 -2.357756,-5.126938 0.373497,-3.984532 24.141272,12.9779849 38.467802,19.8667721 57.084682,30.857229 9.73652,5.820089 18.77383,14.708629 20.49897,26.393811 0.16679,2.989184 1.51649,7.753958 -3.67105,7.508057 -2.85425,-0.0645 -8.17105,-0.0016 -7.40516,-4.257617 0.56193,-6.623422 -1.77003,-11.552797 -7.38732,-13.405576 -6.06826,-2.297189 -11.46715,-5.223224 -17.38132,-8.690748 -6.89147,-4.200593 -5.8783,-3.801117 -17.53425,-11.785194 z"
						id="path5612" />
					<path
						d="m 86.18727,39.20441 c 0,0 20.44955,0 21.24217,-0.31705"
						id="path5827" />
					<circle r={3} transform="translate(120,40)" fill={"black"} />
				</g>
			</g>
		</g>
			: <g>
				<g
					id="g886"
					transform="matrix(0.26458333,0,0,0.26458333,-1.4011466,103.98961)">
					<g
						id="g4231"
						transform="matrix(2.9983387,0,0,2.9983387,-73.051627,-21.813089)">
						<path
							d="m 238.16508,18.93057 c -13.89953,13.22698 -46.85489,11.09722 -46.85489,11.09722 -8.29488,15.58092 -19.16792,14.68418 -19.16792,14.68418 6.5014,0.2242 15.24466,-7.51024 15.24466,-7.51024 l 23.09118,1.90559 h 26.56606 c 3.25068,4.82 -11.20931,6.83767 -11.20931,6.83767 h -11.76977 c -0.33628,5.49256 -7.39816,7.28045 -7.39816,7.28045 h -17.93008 c -19.33469,17.02094 -41.25505,14.12933 -41.25505,14.12933 -20.51303,-0.44837 -36.09395,-19.05582 -36.09395,-19.05582 -5.05948,-6.05221 -6.92402,-3.27911 -17.82922,-5.52777 -15.15971,-3.12595 -1.19683,-7.07512 -1.19683,-7.07512 9.83419,-1.57384 12.43257,0.59278 15.99953,-1.29665 4.67942,-5.58865 12.93823,-5.25649 19.11518,-2.676 7.81233,4.29689 17.95888,6.38182 26.05154,1.60762 10.61966,-8.39156 25.65501,-22.87405 32.40168,-24.60093 8.9308,-2.28593 36.23801,-1.64206 67.92839,0 0,0 -0.42853,10.97591 -15.69304,10.20047 z"
							id="path5597" />
						<path
							d="m 159.1081,35.55837 c 0,0 21.21101,-16.3292 31.86322,-19.97398 13.53076,-4.62971 35.68629,-2.86151 50.72753,-2.53637"
							id="path5606" />
						<path
							d="m 189.85298,53.00686 c 0,0 -1.79348,-8.51907 23.65163,-5.60465"
							id="path5608" />
						<path
							d="m 100.62691,14.44686 c 0,0 41.36234,1.79348 44.38885,21.18558"
							id="path5610" />
						<path
							d="m 90.20225,21.95709 c -11.11973,-1.44478 -22.8531,-3.08136 -32.58218,-9.15954 -1.74636,-1.09822 -4.51734,-3.4994 -1.54315,-3.69898 27.64492,0.79001 43.66786,0.53799 65.4492,2.01824 11.42547,0.83814 23.6722,4.70755 30.71351,14.30313 1.55637,2.57652 5.004,6.20232 0.261,8.28735 -2.57632,1.20999 -7.28919,3.62625 -8.61018,-0.4877 -2.61772,-6.12259 -7.01902,-9.45826 -12.90202,-8.60729 -6.49453,0.65712 -12.68811,0.45945 -19.5963,0.0104 -8.12513,-0.66519 -7.03328,-0.76078 -21.18988,-2.66561 z"
							id="path5612" />
						<path
							d="m 86.18727,39.20441 c 0,0 20.44955,0 21.24217,-0.31705"
							id="path5827" />
						<path
							d="m 119.57469,37.397083 a 2.2193293,0.95003629 0 1 1 -0.0732,-0.883681 l -1.92652,0.471655 z"
							id="path5829" />
						<path
							d="m 139.46364,27.012574 c -5.24073,-4.834828 -12.98116,-11.502637 -38.57076,-13.802916"
							id="path2186" />
						<circle r={3.5} transform="translate(120,40)" fill={"black"} />
					</g>
				</g>
			</g>}
	</g>

}

const VaporClouds: React.FC<GroupComponent> = (props) => {
	const cloudColor = "rgb(231 229 228)"
	useEffect(() => {
		if (props.state) {
			const audio = playAudio(naturalAudio.chain.Y)
			setTimeout(() => {
				audio.pause()
			}, DURATION)
		}
	}, [props.state])

	return <g onClick={props.onClick}>
		{props.state && Array.from(Array(5).keys()).map((j) => <g key={"nat_chain_vaporcl_" + j}>
			<Cloud j={j} cloudColor={cloudColor} />
		</g>)}
	</g>
}

const Swirl = () => {
	return <g>
		<g>
			<path d="M946.5,337.5c-31-43.1-78.4-75.1-130-87.9c-17.3-4.5-35.4-6.7-53.7-6.7c-37.6,0-72.6,9.9-101,28.5c-45.9,28.9-77.3,78-84,131C569,456.7,592,514.3,635,545.8c24.6,18.6,57,29.3,88.7,29.3c23.9,0,46-5.9,63.8-17c48.7-29.3,70.1-93.2,47.7-142.4c-11.5-25-34-44.5-60.2-52.1c-7.7-2.3-15.5-3.5-23.3-3.8l-0.9,17.7c6.4,0.5,12.8,1.8,18.9,3.9c20.5,7,37.6,23.1,45.8,43.3c4.1,9.7,6.2,20.3,5.9,30.5c-0.2,11.2-2.1,21.4-6,32.2c-7.7,20.3-22.7,38.1-41.3,48.8c-33.5,20.3-86.8,14.1-121.2-13.6c-33.9-27-50.6-71.3-43.6-115.9c5.9-43.7,32.1-83.8,70.3-107.3c18.1-11.5,39.4-18.9,61.5-21.6c9.2-1.2,21.6-1.3,33.5-0.4c11.4,1,22.9,2.9,33.4,5.6c43.6,11.2,83.6,38.7,109.8,75.5c27.3,36.9,40.2,81.4,37.3,128.7c-1.9,46-17.7,92.3-44.4,130.5c-26.6,38.4-64.9,69.6-108,88.1c-19.8,8.7-42.6,14.9-67.9,18.6c-15.7,2.2-32.5,2.6-52.8,2.9L107.6,735l-97.2,3.8l0.4,17.7l649.1,0.4c7.5,0,15,0,22.4,0.1l13.9,0.1c12.5,0,27.3-0.2,42.4-1.9c27.3-3.4,53-10.1,76.5-20.1c48.7-20.2,92.2-55.1,122.6-98.3c30.7-43.1,49.2-95.8,51.8-148.2C993.2,434.9,977.6,379.8,946.5,337.5z" /></g><g><path d="M357.7,694.4c2.2-0.1,4.8-0.1,7.3-0.1l17.8,0.2c5,0.1,9.6,0.2,14.3,0.2c9.1,0,21.2-0.2,34-2.1c24.9-4.1,48.4-14.6,68-30.4c40.4-31.8,61.6-84.8,54-135c-7.7-51-52-93.6-102.9-99c-27.8-3.4-53.6,3.2-73.1,18.3c-21,15.7-34.9,39.4-37.9,64.7c-4,26.3,5.9,54.1,25,70.6c18.9,17.2,50.3,24.2,73,16.4c16.6-5.6,30.7-18.9,37.7-35.8l-16.1-7.4c-5.9,11.5-16.6,20-28.6,22.7c-4,0.9-7.6,1.3-11,1.3c-14.1,0-28.6-6.1-37.8-15.9c-12.5-13.1-17.1-29.7-13.4-48.1c3.4-16.6,14-33,27.7-42.8c14.5-10.4,30.3-14,50.1-11.1c36.3,4.7,67.2,35.7,72,72.5c6.5,37-9.4,78.3-39.7,103c-15,12.6-33.2,21.2-53,24.8c-8.1,1.6-16.1,1.9-24.9,2.1l-340.8,9c-16.2,1.4-32.9,2.6-49.6,3.9l0.6,17.7L357.7,694.4z" />
		</g>
	</g>
}

const Cloud: React.FC<{ j: number, cloudColor: string }> = ({ j, }) => {
	const { opacity } = useSpring({
		config: { duration: DURATION },
		from: { opacity: 0 },
		to: [{ opacity: 1 }]
	})

	return <animated.g opacity={opacity}>
		<g className="border border-black cursor-pointer" transform={`translate(${j * 19},${(j % 2) * 5})`} >
			<ellipse fill={'white'} cx={40} cy={18} rx={5} ry={5} />
			<rect x={31} y={16} rx={5} ry={5} width={18} height={7} fill={'white'} />
		</g>
	</animated.g>
}

// https://publicdomainvectors.org/en/free-clipart/Blue-water-icon/64834.html
const Vapor: React.FC<{ x: number, y: number, level: number }> = (props) => {
	const { transform, opacity } = useSpring({
		config: { duration: DURATION },
		from: { transform: `translate(${props.x},${props.y - 65}) scale(0.01)`, opacity: 0 },
		to: [{ transform: `translate(${props.x},${props.y - 65}) scale(0.01)`, opacity: 0.1 * props.level }],
		delay: ((6 - props.level) * 100)
	})

	const COLOR = '#0994ff'

	return <animated.g opacity={opacity} transform={transform}>
		<g id="layer1" transform="translate(392.5325,613.4518) scale(1.3)">
			<g id="g4383" transform="matrix(2.4518447,0,0,2.4518447,-1854.9508,-1375.8764)" style={{ fill: 'none', stroke: COLOR, strokeWidth: '17.7581', strokeMiterlimit: 4, strokeDasharray: 'none', strokeOpacity: 1 }}>
				<path id="path4377" d="m 613.41958,320.18378 c -31.11709,44.35768 39.86813,85.827 1.01016,136.3706" style={{ color: '#000000', clipRule: 'nonzero', display: 'inline', overflow: 'visible', visibility: 'visible', opacity: 1, isolation: 'auto', mixBlendMode: 'normal', colorInterpolation: 'sRGB', fill: 'none', fillOpacity: 1, fillRule: 'nonzero', stroke: COLOR, strokeWidth: '17.7581', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: 4, strokeDasharray: 'none', strokeDashoffset: 0, strokeOpacity: 1, colorRendering: 'auto', imageRendering: 'auto', shapeRendering: 'auto', textRendering: 'auto', }} />
				<path style={{ color: '#000000', clipRule: 'nonzero', display: 'inline', overflow: 'visible', visibility: 'visible', opacity: 1, isolation: 'auto', mixBlendMode: 'normal', colorInterpolation: 'sRGB', fill: 'none', fillOpacity: 1, fillRule: 'nonzero', stroke: COLOR, strokeWidth: '17.7581', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: 4, strokeDasharray: 'none', strokeDashoffset: 0, strokeOpacity: 1, colorRendering: 'auto', imageRendering: 'auto', shapeRendering: 'auto', textRendering: 'auto', }} d="m 660.89578,319.83863 c -31.11709,44.35768 39.86813,85.827 1.01016,136.3706" id="path4379" />
				<path id="path4381" d="m 708.05934,320.06491 c -31.11709,44.35768 39.86813,85.827 1.01016,136.3706" style={{ color: '#000000', clipRule: 'nonzero', display: 'inline', overflow: 'visible', visibility: 'visible', opacity: 1, isolation: 'auto', mixBlendMode: 'normal', colorInterpolation: 'sRGB', fill: 'none', fillOpacity: 1, fillRule: 'nonzero', stroke: COLOR, strokeWidth: '17.7581', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: 4, strokeDasharray: 'none', strokeDashoffset: 0, strokeOpacity: 1, colorRendering: 'auto', imageRendering: 'auto', shapeRendering: 'auto', textRendering: 'auto', }}>
				</path>
			</g>
		</g>
	</animated.g >
}
