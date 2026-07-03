import {  useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const COND_ARR: ExpType[] = [
  "abs_par", "abs_chain", "abs_conf",
  "soc_par", "soc_chain", "soc_conf",
  "nat_par", "nat_chain", "nat_conf",
]


export default function Home() {
  const [order, setOrder] = useState<ExpType[]>(COND_ARR)
  const [swapA, setSwapA] = useState<ExpType[]>([])
  const [pID, setPID] = useState<number>()
  const [age, setAge] = useState<number>();
  let navigate = useNavigate()

  useEffect(() => {
    localStorage.removeItem("expl_array")
    localStorage.setItem("expl_array", JSON.stringify(order))

  }, [order])

  const onCondClick = (cond: ExpType) => () => {
    if (!swapA.includes(cond) && swapA.length < 9) {
      setSwapA(condArr => [...condArr, cond])
    }
  }

  useEffect(() => {
    if (swapA.length === 9) {
      setOrder(swapA)
      setSwapA([])
    }
  }, [swapA])

  const onNextClick = () => {
    localStorage.setItem("expl_participant_id", JSON.stringify(pID))
    localStorage.setItem("expl_participant_age", JSON.stringify(age))
    navigate("/tapnseek/fam")
  }

  return (
    <div >
      <div className="flex justify-center mx-auto mt-2 text-lg">
        Order the Conditions.
      </div>
      <div className="flex flex-wrap justify-center space-x-4">
        {order.map((cond, idx) => {
          return <div key={cond + idx} onClick={onCondClick(cond)} className={`p-2 mt-4 text-center ${!swapA.includes(cond) ? "bg-gray-100" : "bg-blue-300"} rounded-lg`}>
            <span className="text-sm"><b>{swapA.length !== 0 ? swapA.findLastIndex((val) => val == cond) + 1 : idx + 1}.</b>  Condition: "{cond.replace("_", " ")}"</span>
            <img className="w-32 mx-auto mt-2 outline outline-1" src={import.meta.env.BASE_URL + "condition_imgs/" + cond + ".png"} />
          </div>
        })}
      </div>
      <div className="flex flex-col mt-4 ml-16 space-y-2 text-sm">
        {order.map((cond, idx) => {
          const originalMsg = ` Condition (${idx + 1}) ${cond}:`
          let msg = originalMsg

          if (idx === 0 || idx > order.length - 2) return <div key={idx} className="font-bold text-green-600"> {msg} looks good! </div>
          const prevCond = order[idx - 1],
            nextCond = order[idx + 1],
            graphType = cond.slice(4,),
            scenarioType = cond.slice(0, 3)


          if (scenarioType === prevCond.slice(0, 3)) msg += " Same scenario as previous condition."
          if (scenarioType === nextCond.slice(0, 3)) msg += " Same scenario as next condition."
          if (graphType === prevCond.slice(4)) msg += " Same graph as previous condition."
          if (graphType === nextCond.slice(4)) msg += " Same graph as next condition."
          if (msg === originalMsg) msg += " looks good!"

          return <div key={idx} className={`font-bold ${msg.includes("looks good!") ? "text-green-600" : "text-red-700"}`}> {msg} </div>
        })}
      </div>
      <div className="flex flex-col mx-auto mt-4 ml-8 space-y-2 justify-left">
        <div className="text-middle">Participant ID: <input type='number' onChange={(e) => setPID(parseFloat(e.currentTarget.value))} className="w-32 ml-4 bg-gray-100" /> </div>
        <div className="text-middle">Participant Age: <input type='number' onChange={(e) => setAge(parseFloat(e.currentTarget.value))} className="w-32 ml-4 bg-gray-100" /> </div>
      </div>
      <button className="flex justify-center w-64 py-2 mx-auto mt-4 bg-green-300 rounded-lg" onClick={onNextClick} >
        Next
      </button>
    </div>
  )
}

