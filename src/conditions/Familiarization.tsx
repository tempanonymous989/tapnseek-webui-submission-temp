import { useEffect, useRef } from "react";
import { NodeState, animateShapeColor, playAudio, recordTouch, useMultiState } from "./functions";
import { familiarizationAudio } from "./sounds";

const DURATION = 300
const variableIndicies = [0, 0, 0]

const famRecordTouch = (node: NodeState, nodeArray: NodeState[]) => (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
  if (node.key !== 'Y') {
    node.setState(true)
  }
  recordTouch(node.key, 'Familiarization', 'Familiarization', variableIndicies, nodeArray, e)
}

export default function Familiarization() {
  const [nodeA, nodeY] = useMultiState([{ key: 'A', value: false }, { key: 'Y', value: false }]);
  const nodeArray = [nodeA, nodeA, nodeA, nodeA, nodeY]

  // record start of study for start timestamp
  useEffect(() => {
    recordTouch('Start', 'Familiarization', 'Familiarization', variableIndicies, nodeArray, { pageX: 0, pageY: 0 })
  }, [])

  // activate node Y
  useEffect(() => {
    if (nodeA.state) {
      setTimeout(() => {
        nodeY.setState(true)
      }, DURATION)
    }
  }, [nodeA])

  useEffect(() => {
    if (nodeY.state) {
      // reset all other elements
      setTimeout(() => {
        nodeA.setState(false)
        nodeY.setState(false)
      }, DURATION * 4)
    }

  }, [nodeY])

  return (
    <div className="w-full">
      <svg className="w-full h-screen mx-auto" viewBox="0 0 100 100">
        <BlicketA x={20} y={20} state={nodeA.state} onClick={famRecordTouch(nodeA, nodeArray)} />
        <LightBulb x={45} y={30} state={nodeY.state} onClick={famRecordTouch(nodeY, nodeArray)} />

      </svg>

    </div>
  );
}

const BlicketA: React.FC<GroupComponent> = ({ x, y, state, onClick }) => {
  const ref = useRef<SVGCircleElement>(null)

  useEffect(() => {
    if (!ref.current) return
    animateShapeColor(ref.current, { cx: x, cy: y }, { cx: x, cy: 50 }, 0, state, DURATION)
  }, [ref, state])

  useEffect(() => {
    state && playAudio(familiarizationAudio.A)
  }, [state])

  return <circle ref={ref} className="cursor-pointer"
    onClick={onClick}
    cx={x}
    cy={y}
    r={10}
    fill={"green"} />
}

const LightBulb: React.FC<GroupComponent> = (props) => {
  const ref = useRef<SVGRectElement>(null)
  const { x, y, state, onClick } = props

  useEffect(() => {
    if (!ref.current) return
    animateShapeColor(ref.current, { fill: "#9ca3cf" }, { fill: "#90EE90" }, 0, state, DURATION)
  }, [ref, state])

  useEffect(() => {
    state && playAudio(familiarizationAudio.Y)
  }, [state])

  return (<g
    id="layer1"
    onClick={onClick}
    transform={`translate(${x},${y}) scale(0.03)`}>
    <rect
      ref={ref}
      width="1000"
      height="500"
      id=""
      fill={"#9ca3af"} />

  </g>)
}