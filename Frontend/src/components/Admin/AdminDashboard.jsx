import React, { useContext,useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizContext from "../../context/QuizContext";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { quiz, adminToggle, setAdminToggle, quizActive, startStopQuiz } = useContext(QuizContext);
  const [count,setCount]=useState(0)
  useEffect(()=>{
      const getCount=async()=>{
          try{
            const res=await fetch('http://localhost:5000/api/user/count')
            const data=await res.json();
            setCount(data.userCount)
          }catch(err){
            console.log("Error getting count",err)
          }
      }
      setInterval(getCount,2000)
  },[])

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-10 px-4 space-y-40">
      <h1 className="text-4xl font-semibold">Admin page</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl w-full">
        
        {/* Quiz Management */}
        <div className="bg-black border border-purple-600 rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-semibold">Quiz management</h2>
          <p className="text-sm text-gray-300">message indicating if there is any quiz questions present or not</p>
          <div className="space-y-3">
            <button className="w-full py-2 bg-white text-black rounded" onClick={() => navigate('/createQuiz')}>Create</button>
            <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded" onClick={() => navigate('/availableQuiz')}>Set Quiz</button>
          </div>
        </div>

        {/* Admin Toggle */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-8 flex items-center justify-between">
            <span className="text-black text-2xl font-medium">Quiz button toggle</span>
            <button
              onClick={() => setAdminToggle(!adminToggle)}
              className={`w-16 h-8 flex items-center rounded-full p-1 duration-300 ${adminToggle ? 'bg-purple-500' : 'bg-gray-300'}`}
            >
              <div
                className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ${adminToggle ? 'translate-x-8' : 'translate-x-0'}`}
              />
            </button>
          </div>

          {/* Start/Stop Selected Quiz */}
          <div className="bg-white rounded-xl p-4 space-y-5">
            <div className="flex flex-row justify-around gap-4 items-center">
              <span className="px-3 py-1 rounded-full bg-purple-600 text-white text-sm">
                {quiz?.title || "No quiz selected"}
              </span>
              <button
                className={`px-4 py-1 ${quizActive ? 'bg-red-600' : 'bg-green-600'} text-white border rounded-4xl`}
                onClick={startStopQuiz}
              >
                {quizActive ? 'Stop' : 'Start'}
              </button>
            </div>
            <div className="flex flex-row justify-around">
              <div className="text-black text-sm ml-2">{count} people waiting</div>
              <div className="text-black text-sm ml-2">timer when started</div>
            </div>
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


