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
        
    <div className="flex flex-col justify-around min-h-screen bg-black">
  <div className="flex flex-col justify-between items-center  py-14 w-full max-w-md mx-auto h-[513px] space-y-10 text-white border-1 rounded-4xl border-purple-400 p-8">
    <h1 className="text-3xl font-semibold">Admin Login</h1>

    <input 
      className="w-full text-white bg-transparent border-b-2 border-purple-500 focus:outline-none placeholder-gray-400"
      type="text"
      ref={userRef}
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />

    <input
      className="w-full text-white bg-transparent border-b-2 border-purple-500 focus:outline-none placeholder-gray-400"
      type="password"
      ref={passRef}
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <button
      className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded text-white font-medium transition duration-300"
      type="submit"
      onClick={(e) => {
        e.preventDefault();
        Validate();
      }}
    >
      Submit
    </button>
  </div>

</div>

    )
}

export default Login;