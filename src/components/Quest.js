
export default function Quest({ question, dispatch, answer }) {
    console.log(question)
    return (
        <div>
            <h4>{question.question}</h4>
            <div className="options">
                {question.options.map((option, index) => <button onClick={() => dispatch({ type: "newAnswer", payload: index })} className={`btn btn-option  ${index===answer ?"answer" : ""} ${answer!=null?index===question.correctOption ?"correct" : "wrong" : ""} `} disabled={answer!==null} key={option} >{option}</button>)}
            </div>
        </div>
    )
}