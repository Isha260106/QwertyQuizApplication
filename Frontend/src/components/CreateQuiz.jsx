import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";

function CreateQuiz(){
    const [title,setTitle]=useState('')
    const [qcount,setQcount]=useState(0)
    const titleRef=useRef(null)
    const qCountRef=useRef(null)
    const navigate=useNavigate()
    return(
        <div>
            <h1>Quiz details</h1>
            <input type='text' ref={titleRef} placeholder="Enter Quiz title " value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
            <input type='text' ref={qCountRef} placeholder='Enter number of questions' value={qcount} onChange={(e)=>{setQcount(e.target.value)}}/>
            <button onClick={()=>{navigate('/question')}}>Next</button>
        </div>
    )
}

export default CreateQuiz; 