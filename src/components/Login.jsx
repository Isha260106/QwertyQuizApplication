import React, { useRef, useState } from "react";
import {useNavigate } from "react-router";
function Login(){
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    //const [validLogin,setValidLogin]=useState(false)
    const navigate=useNavigate()
    const userRef=useRef(null)
    const passRef=useRef(null)
    function Validate(){
        if(username==='qwerty.i/o' && password==='12345')
            navigate('/createQuiz')
        else
            alert("Invalid Credentials")
    }
    return(
        <div className="containerDiv">
            <h1>Admin Login</h1>
            <input type="text" ref={userRef} placeholder="Username" value={username} onChange={(e)=>{setUsername(e.target.value)}} /><br/>
            <input type="password" ref={passRef} placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} /><br/>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    Validate();
                }}
            >
                Login
            </button>
        </div>    
    )
}

export default Login;