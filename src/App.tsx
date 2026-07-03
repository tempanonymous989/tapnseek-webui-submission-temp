import NaturalParallel from "./conditions/NaturalParallel";
import Familiarization from "./conditions/Familiarization";
import AbstractParallel from "./conditions/AbstractParallel";
import SocialParallel from "./conditions/SocialParallel";
import AbstractChain from "./conditions/AbstractChain";
import AbstractConfound from "./conditions/AbstractConfound";
import SocialChain from "./conditions/SocialChain";
import SocialConfound from "./conditions/SocialConfound";
import NaturalChain from "./conditions/NaturalChain";
import NaturalConfound from "./conditions/NaturalConfound";
import { useRef, useEffect, useState } from "react";
import Home from "./Home";
import ReactModal from 'react-modal'
import { Touch, getAllTouches } from "./conditions/functions";
import { useNavigate, useParams } from "react-router-dom";


export default function App() {
  const [condition, setCondition] = useState("");
  const [nextCond, setNextCond] = useState<ExpType>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  let { cond } = useParams();
  let navigate = useNavigate();

  useEffect(() => {

    // const urlParams = new URLSearchParams(window.location.search);
    // const cond = urlParams.get("cond");
    if (!cond) return

    setCondition(cond);

    const explArrStr = localStorage.getItem("expl_array")
    if (!explArrStr) return

    const explArr: ExpType[] = JSON.parse(explArrStr)
    const condIdx = explArr.findLastIndex((val) => (val === cond))
    if (condIdx < 8) {
      setNextCond(explArr[condIdx + 1])
    } else {
      setNextCond("base")
    }

  }, [cond]);

  const onNextClick = () => {
    setIsModalOpen(true)
  }
  const onYesConfirmClick = () => {
    if (nextCond) {
      navigate(`/tapnseek/${nextCond}`);
      setIsModalOpen(false)
    }
    if (nextCond === "base") {
      const touchArray = getAllTouches()
      convertToCSV(touchArray)
    }
  }

  const conditionMatch = () => {
    switch (condition) {
      case "abs_par":
        return <AbstractParallel />
      case "nat_par":
        return <NaturalParallel />
      case "soc_par":
        return <SocialParallel />
      case "abs_chain":
        return <AbstractChain />
      case "soc_chain":
        return <SocialChain />
      case "nat_chain":
        return <NaturalChain />
      case "abs_conf":
        return <AbstractConfound />
      case "soc_conf":
        return <SocialConfound />
      case "nat_conf":
        return <NaturalConfound />
      case "fam":
        return <Familiarization />
      case "base":
        return <Home />
      default:
        return <></>;
    }
  };


  return (
    <div>
      {conditionMatch()}
      {condition !== "base" && <button className="absolute flex justify-center w-full mx-auto -mt-4 text-xs bg-gray-50 " onClick={onNextClick}>
        Next
      </button>}
      <StyledModal onYesClick={onYesConfirmClick} isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} />
    </div>
  )
}

const StyledModal: React.FC<ReactModal.Props & { onYesClick: () => void }> = (props) => {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div ref={ref}>
      {ref.current && <ReactModal
        appElement={ref.current}
        style={{
          overlay: { backgroundColor: "#a0aec099", padding: "2em", cursor: "pointer" },
          content: { width: "36rem", borderRadius: "0.5rem", marginLeft: "auto", marginRight: "auto", cursor: "default" }
        }}
        {...props}
      >
        <div className='flex flex-col'>
          <h1 className='my-32 text-2xl text-center text-bold'>Are you sure you don't want to play again?</h1>
          <div className="flex justify-center space-x-12 text-xl">
            <button
              onClick={props.onYesClick}
              className="w-32 py-4 bg-gray-200 rounded-lg">Yes</button>
            <button
              onClick={props.onRequestClose}
              className="w-32 py-4 bg-gray-200 rounded-lg">No</button>
          </div>
        </div>
      </ReactModal>}
    </div>
  )
}

function convertToCSV(dataArray: Touch[]) {
  const csvHeaders = Object.keys(dataArray[0]).join(',') + '\n';
  const csvBody = dataArray.map(row => Object.values(row).join(',')).join('\n');
  const csv = csvHeaders + csvBody;

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "data.csv");
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}