import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router";

function AdminDashboard(){
    const navigate=useNavigate()
    return(
        <div className="flex flex-col gap-4 items-center min-h-screen bg-black">
    
            <h1 className="text-6xl mb-5">Admin Dashboard</h1>
            <div className="flex flex-col justify-between gap-5 p-5 w-1/2">
                <div className="flex flex-row justify-between items-center border rounded-2xl border-purple-500">
                Event
                <FaArrowRight/>
                </div>
                <div  className="border flex flex-row justify-between items-center rounded-2xl border-purple-500"
                      onClick={()=>navigate('/createQuiz')}>
                  Quiz
                  <FaArrowRight/>
                </div>
                <div  className="border flex flex-row justify-between items-center rounded-2xl border-purple-500"
                    onClick={()=>navigate('/createFeedback')}>
                   Feedback
                   <FaArrowRight/>
                </div>
            </div>
        
        </div>
    )
}

export default AdminDashboard;