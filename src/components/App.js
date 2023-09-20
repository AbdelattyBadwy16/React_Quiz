import { useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import { useReducer } from "react";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./Start";
import Quest from "./Quest";
import Progress from "./Progress" 
import Finish from "./Finish";
import Timer from "./Timer";
const initState = {
    questions: [],
    status: "loading",
    idx: 0,
    answer: null,
    points: 0,
    highScore: 0 , 
    timeRem:600
};

function reducer(state, action) {
    switch (action.type) {
        case "dataReceived":
            return {
                ...state,
                questions: action.payload,
                status: "ready"
            };
        case "dataFaild":
            return {
                ...state,
                status: 'error'
            };
        case "start":
            return {
                ...state, status: 'active', answer:null,idx:0,points:0,timeRem:600
            };
        case "newAnswer":
            const quest = state.questions.at(state.idx);
            return { ...state, answer: action.payload, points: action.payload === quest.correctOption ? state.points + quest.points : state.points, };
        case "nextQuestion":
            return { ...state, idx: state.idx + 1 , answer:null};
        case "finished":
            return {...state , status:"finished" , highScore: state.highScore < state.points ? state.points : state.highScore};
        case "tick":
          return {...state , timeRem:state.timeRem - 1 , status:(state.timeRem===0)?"finished":state.status}
        default:
            throw new Error("Action unknown");
    }
}

export default function App() {

    const [{ questions, status, idx, answer , points , highScore , timeRem }, dispatch] = useReducer(reducer, initState);
    const numQues = questions.length;
    const maxPoint= questions.reduce((prev,cur)=>prev+cur.points,0);
    useEffect(function () {
        fetch("http://localhost:8000/questions").then(res => res.json()).then(
            (data) => dispatch({ type: "dataReceived", payload: data })
        ).catch((err) => dispatch({ type: 'dataFaild' }));
    }, []);



    return (
        <div className="app">
            <Header></Header>
            <Main>
                {status === "loading" && <Loader></Loader>}
                {status === "error" && <Error></Error>}
                {status === "ready" && <StartScreen numQues={numQues} dispatch={dispatch}></StartScreen>}
                <footer>
                {
                    status === "active" &&
                    <div>
                        <Progress index={idx} num={numQues} points={points} maxPoint={maxPoint}></Progress>
                        <Quest question={questions[idx]} dispatch={dispatch} answer={answer}></Quest>
                        {
                         (answer===null)?null:
                         <>
                         {idx < numQues-1 && <button className="btn btn-ui" onClick={()=>dispatch({type:"nextQuestion"})}>Next</button> }
                         {idx == numQues-1 && <button className="btn btn-ui" onClick={()=>dispatch({type:"finished"})}>Finish</button> }  
                          </>
                        }
                        <Timer dispatch={dispatch} timeRem={timeRem}></Timer>
                    </div>
                }
                {status=='finished' && <Finish maxNum={maxPoint} points={points} highScore={highScore} dispatch={dispatch}></Finish>}
                </footer>
            </Main>
        </div>
    )
}