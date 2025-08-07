// import React from "react";
// import { FaArrowRight } from "react-icons/fa";
// import { useNavigate } from "react-router";

// function AdminDashboard(){
//     const navigate=useNavigate()
//     return(
//         <div className="flex flex-col gap-4 items-center min-h-screen bg-black">
    
//             <h1 className="text-6xl mb-5">Admin Dashboard</h1>
//             <div className="flex flex-col justify-between gap-15 p-15 w-2xl">
//                 <div className="p-15 flex flex-row justify-between items-center border rounded-2xl border-purple-500">
//                 Event
//                 <FaArrowRight/>
//                 </div>
//                 <div  className="p-15 border flex flex-row justify-between items-center rounded-2xl border-purple-500"
//                       onClick={()=>navigate('/createQuiz')}>
//                   Quiz
//                   <FaArrowRight/>
//                 </div>
//                 <div  className="p-15 border flex flex-row justify-between items-center rounded-2xl border-purple-500"
//                     onClick={()=>navigate('/createFeedback')}>
//                    Feedback
//                    <FaArrowRight/>
//                 </div>
//             </div>
        
//         </div>
//     )
// }

// export default AdminDashboard;

import React, { useState } from 'react';
import {useNavigate} from 'react-router'

export default function AdminDashboard() {
  const [quizActive, setQuizActive] = useState(false);
  const [isToggled,setToggle]=useState(false)
  const navigate=useNavigate();
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-10 px-4 space-y-40">
      <h1 className="text-2xl font-semibold">Admin page</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10
       max-w-5xl w-full">

        {/* Quiz Management */}
        <div className="bg-black border border-purple-600 rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-semibold">Quiz management</h2>
          <p className="text-sm text-gray-300">message indicating if there is any quiz questions present or not</p>
          <div className="space-y-3">
            <button className="w-full py-2 bg-white text-black rounded" onClick={()=>{navigate('/createQuiz')}}>Create</button>
            <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded" onClick={()=>{navigate('/availableQuiz')}}>Set Quiz</button>
          </div>
        </div>

        {/* Quiz Toggle and Controls */}
        <div className="space-y-4">
          {/* Toggle Switch */}
          <div className="bg-white rounded-xl p-4 flex items-center justify-between">
            <span className="text-black font-medium">Quiz button toggle</span>
            <div><button
      onClick={()=>{setToggle(!isToggled)}}
      className={`w-16 h-8 flex items-center rounded-full p-1 duration-300 ${
        isToggled ? 'bg-purple-500' : 'bg-gray-300'
      }`}
    >
      <div
        className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ${
          isToggled ? 'translate-x-8' : 'translate-x-0'
        }`}
      />
    </button>
            </div>
          </div>
          

          {/* Controls */}
          <div className="bg-white rounded-xl p-4 space-y-2">
            <div className="flex gap-4 items-center">
              <span className="px-3 py-1 rounded-full bg-purple-600 text-white text-sm">selected Quiz</span>
              <button className="px-4 py-1 bg-black text-white rounded">start/stop</button>
            </div>
            <div className="text-black text-sm ml-2">X people waiting</div>
            <div className="text-black text-sm ml-2">timer when started</div>
          </div>
        </div>

        {/* Feedback */}
        <div className="bg-purple-600 rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-semibold">Feedback</h2>
          <p className="text-sm text-white">message indicating if there is any feedback present or not</p>
          <button className="w-full py-2 bg-white text-black rounded">View</button>
        </div>

        {/* Events */}
        <div className="bg-purple-600 rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-semibold">Events</h2>
          <p className="text-sm text-white">message indicating if there is any details present or not</p>
          <button className="w-full py-2 bg-white text-black rounded">View</button>
        </div>

      </div>
    </div>
  );
}
