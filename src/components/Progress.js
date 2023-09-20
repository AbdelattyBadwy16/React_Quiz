
export default function ProgressBar({ index, num, points, maxPoint }) {
    return (
        <header className="progress">

            <progress max={num} value={index}/>
                <p>Question <strong>{index + 1}</strong> / {num}</p>

                <p><strong>{points}</strong> / {maxPoint}</p>
        </header>
    )
}