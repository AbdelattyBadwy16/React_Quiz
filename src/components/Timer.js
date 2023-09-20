import { useEffect } from "react"


export default function Timer({dispatch , timeRem}){
    const mins=Math.floor((timeRem/60));
    const sec=(timeRem%60);
    useEffect(function(){
       const id= setInterval(function(){
           dispatch({type:"tick"})
        },1000);
     return ()=>clearInterval(id);
    },[dispatch])
    return(
        <div className="timer">{mins}:{sec}</div>
    )
}