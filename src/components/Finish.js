 
export default function Finish({ points, maxNum , highScore , dispatch }) {
    const percent = (points / maxNum) * 100;
    return (
        <>
        <p className="result">
            You scored <strong>{points}</strong> out of {maxNum} ({Math.ceil(percent)}%)
        </p>
        <p className="highscore">(HighScore: {highScore} points)</p>
        <button onClick={()=>dispatch({type:"start"})} className="btn btn-ui">Restart Quiz !</button>
        </>
    )
}