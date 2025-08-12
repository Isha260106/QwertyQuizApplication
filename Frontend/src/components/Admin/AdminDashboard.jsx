// // import React from "react";
// // import { FaArrowRight } from "react-icons/fa";
// // import { useNavigate } from "react-router";

// // function AdminDashboard(){
// //     const navigate=useNavigate()
// //     return(
// //         <div className="flex flex-col gap-4 items-center min-h-screen bg-black">
    
// //             <h1 className="text-6xl mb-5">Admin Dashboard</h1>
// //             <div className="flex flex-col justify-between gap-15 p-15 w-2xl">
// //                 <div className="p-15 flex flex-row justify-between items-center border rounded-2xl border-purple-500">
// //                 Event
// //                 <FaArrowRight/>
// //                 </div>
// //                 <div  className="p-15 border flex flex-row justify-between items-center rounded-2xl border-purple-500"
// //                       onClick={()=>navigate('/createQuiz')}>
// //                   Quiz
// //                   <FaArrowRight/>
// //                 </div>
// //                 <div  className="p-15 border flex flex-row justify-between items-center rounded-2xl border-purple-500"
// //                     onClick={()=>navigate('/createFeedback')}>
// //                    Feedback
// //                    <FaArrowRight/>
// //                 </div>
// //             </div>
        
// //         </div>
// //     )
// // }

// // export default AdminDashboard;

// import React, { useContext, useEffect,useState } from 'react';
// import {useNavigate} from 'react-router'
// import QuizContext from '../../context/QuizContext';

// export default function AdminDashboard() {
//   const [quizActive, setQuizActive] = useState(false);
//   const [isToggled,setToggle]=useState(false)
//   const navigate=useNavigate();
//   const quiz=useContext(QuizContext)
//   const setSelected=useContext(QuizContext)

//   useEffect(()=>{const handleCurrentlyActiveQuiz=async () => {
//    try {
//   const response = await fetch(`http://localhost:5000/api/quizzes/toggle/${quiz._id}`, {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }

//   const data = await response.json();
//   setSelected(data.isActive);
// } catch (err) {
//   console.error('Error toggling quiz:', err);
// }
//   }},[quiz])

//   return (
//     <div className="min-h-screen bg-black text-white flex flex-col items-center py-10 px-4 space-y-40">
//       <h1 className="text-4xl font-semibold">Admin page</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10
//        max-w-5xl w-full">

//         {/* Quiz Management */}
//         <div className="bg-black border border-purple-600 rounded-xl p-6 space-y-4">
//           <h2 className="text-xl font-semibold">Quiz management</h2>
//           <p className="text-sm text-gray-300">message indicating if there is any quiz questions present or not</p>
//           <div className="space-y-3">
//             <button className="w-full py-2 bg-white text-black rounded" onClick={()=>{navigate('/createQuiz')}}>Create</button>
//             <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded" onClick={()=>{navigate('/availableQuiz')}}>Set Quiz</button>
//           </div>
//         </div>

//         {/* Quiz Toggle and Controls */}
//         <div className="space-y-4">
//           {/* Toggle Switch */}
//           <div className="bg-white rounded-xl p-8 flex items-center justify-between">
//             <span className="text-black text-2xl font-medium">Quiz button toggle</span>
//             <div><button
//       onClick={()=>{setToggle(!isToggled)}}
//       className={`w-16 h-8 flex items-center rounded-full p-1 duration-300 ${
//         isToggled ? 'bg-purple-500' : 'bg-gray-300'
//       }`}
//     >
//       <div
//         className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ${
//           isToggled ? 'translate-x-8' : 'translate-x-0'
//         }`}
//       />
//     </button>
//             </div>
//           </div>
          

//           {/* Controls */}
//           <div className="bg-white rounded-xl p-4 space-y-5">
//             <div className="flex flex-row justify-around gap-4 items-center">
//               <span className="px-3 py-1 rounded-full bg-purple-600 text-white text-sm">{quiz?.title||"No quiz selected"}</span>
//               <button className="px-4 py-1 bg-black text-white border rounded-4xl" onClick={handleCurrentlyActiveQuiz}>start/stop</button>
//             </div>
//             <div className='flex flex-row justify-around'>
//               <div className="text-black text-sm ml-2">X people waiting</div>
//             <div className="text-black text-sm ml-2">timer when started</div>
//             </div>
//           </div>
//         </div>

//         {/* Feedback */}
//         <div className="bg-purple-600 rounded-xl p-6 space-y-4">
//           <h2 className="text-xl font-semibold">Feedback</h2>
//           <p className="text-sm text-white">message indicating if there is any feedback present or not</p>
//           <button className="w-full py-2 bg-white text-black rounded">View</button>
//         </div>

//         {/* Events */}
//         <div className="bg-purple-600 rounded-xl p-6 space-y-4">
//           <h2 className="text-xl font-semibold">Events</h2>
//           <p className="text-sm text-white">message indicating if there is any details present or not</p>
//           <button className="w-full py-2 bg-white text-black rounded">View</button>
//         </div>

//       </div>
//     </div>
//   );
// }

// // import React, { useState } from "react";
// // import { useQuiz } from "../../context/QuizContext";

// // export default function AdminDashboard() {
// //   const { selectedQuiz } = useQuiz();
// //   const [isToggled, setIsToggled] = useState(false);

// //   const handleStartStop = async () => {
// //     if (!selectedQuiz) return alert("No quiz selected!");

// //     try {
// //       const res = await fetch(
// //         `http://localhost:5000/api/quizzes/toggle/${selectedQuiz._id}`,
// //         { method: "PATCH", headers: { "Content-Type": "application/json" } }
// //       );
// //       if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
// //       const data = await res.json();
// //       setIsToggled(data.isActive);
// //       alert(`Quiz "${selectedQuiz.title}" is now ${data.isActive ? "Active" : "Inactive"}`);
// //     } catch (err) {
// //       console.error("Error starting/stopping quiz:", err);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-black text-white flex flex-col items-center py-10 px-4 space-y-40">
// //       <h1 className="text-4xl font-semibold">Admin page</h1>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl w-full">
// //         <div className="bg-black border border-purple-600 rounded-xl p-6 space-y-4">
// //           <h2 className="text-xl font-semibold">Quiz management</h2>
// //           <button
// //             className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded"
// //             onClick={() => window.location.href = "/availableQuiz"}
// //           >
// //             Set Quiz
// //           </button>
// //         </div>

// //         <div className="bg-white rounded-xl p-4 space-y-5">
// //           <div className="flex flex-row justify-around gap-4 items-center">
// //             <span className="px-3 py-1 rounded-full bg-purple-600 text-white text-sm">
// //               {selectedQuiz ? selectedQuiz.title : "No quiz selected"}
// //             </span>
// //             <button
// //               className="px-4 py-1 bg-black text-white border rounded-4xl"
// //               onClick={handleStartStop}
// //             >
// //               start/stop
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// import React, { useContext, useState } from 'react';
// import { useNavigate } from 'react-router';
// import QuizContext from '../../context/QuizContext';

// export default function AdminDashboard() {
//   const [isToggled, setIsToggled] = useState(false);
//   const navigate = useNavigate();
//   const { quiz, setSelected } = useContext(QuizContext); // ✅ destructure once

//   const handleCurrentlyActiveQuiz = async () => {
//     if (!quiz?._id) {
//       alert("No quiz selected!");
//       return;
//     }

//     try {
//       const response = await fetch(`http://localhost:5000/api/quizzes/toggle/${quiz._id}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//       });

//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

//       const data = await response.json();
//       setSelected(data.isActive);
//       setIsToggled(data.isActive);

//     } catch (err) {
//       console.error('Error toggling quiz:', err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black text-white flex flex-col items-center py-10 px-4 space-y-40">
//       <h1 className="text-4xl font-semibold">Admin page</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl w-full">

//         {/* Quiz Management */}
//         <div className="bg-black border border-purple-600 rounded-xl p-6 space-y-4">
//           <h2 className="text-xl font-semibold">Quiz management</h2>
//           <p className="text-sm text-gray-300">message indicating if there is any quiz questions present or not</p>
//           <div className="space-y-3">
//             <button className="w-full py-2 bg-white text-black rounded" onClick={() => navigate('/createQuiz')}>Create</button>
//             <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded" onClick={() => navigate('/availableQuiz')}>Set Quiz</button>
//           </div>
//         </div>

//         {/* Quiz Toggle and Controls */}
//         <div className="space-y-4">
//           <div className="bg-white rounded-xl p-8 flex items-center justify-between">
//             <span className="text-black text-2xl font-medium">Quiz button toggle</span>
//             <button
//               onClick={handleCurrentlyActiveQuiz}
//               className={`w-16 h-8 flex items-center rounded-full p-1 duration-300 ${isToggled ? 'bg-purple-500' : 'bg-gray-300'}`}
//             >
//               <div
//                 className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ${isToggled ? 'translate-x-8' : 'translate-x-0'}`}
//               />
//             </button>
//           </div>

//           <div className="bg-white rounded-xl p-4 space-y-5">
//             <div className="flex flex-row justify-around gap-4 items-center">
//               <span className="px-3 py-1 rounded-full bg-purple-600 text-white text-sm">
//                 {quiz?.title || "No quiz selected"}
//               </span>
//               <button
//                 className="px-4 py-1 bg-black text-white border rounded-4xl"
//                 onClick={handleCurrentlyActiveQuiz}
//               >
//                 start/stop
//               </button>
//             </div>
//             <div className="flex flex-row justify-around">
//               <div className="text-black text-sm ml-2">X people waiting</div>
//               <div className="text-black text-sm ml-2">timer when started</div>
//             </div>
//           </div>
//         </div>

        // {/* Feedback */}
        // <div className="bg-purple-600 rounded-xl p-6 space-y-4">
        //   <h2 className="text-xl font-semibold">Feedback</h2>
        //   <p className="text-sm text-white">message indicating if there is any feedback present or not</p>
        //   <button className="w-full py-2 bg-white text-black rounded">View</button>
        // </div>

        // {/* Events */}
        // <div className="bg-purple-600 rounded-xl p-6 space-y-4">
        //   <h2 className="text-xl font-semibold">Events</h2>
        //   <p className="text-sm text-white">message indicating if there is any details present or not</p>
        //   <button className="w-full py-2 bg-white text-black rounded">View</button>
        // </div>

//       </div>
//     </div>
//   );
// }

import React, { useContext } from "react";
import { useNavigate } from "react-router";
import QuizContext from "../../context/QuizContext";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { quiz, adminToggle, setAdminToggle, quizActive, startStopQuiz } = useContext(QuizContext);

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
              <div className="text-black text-sm ml-2">X people waiting</div>
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


