// import React, { useState } from 'react';

// function ToggleButton({quizId,init}) {
//   const [isToggled, setIsToggled] = useState(false);

//   const toggle = () => setIsToggled(!isToggled);

//   return (
//     <button
//       onClick={toggle}
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
//   );
// }

// export default ToggleButton;
import React, { useState } from 'react';

function ToggleButton({ quizId, initialStatus }) {
  const [isToggled, setIsToggled] = useState(initialStatus);

  const toggle = async () => {
   try {
  const response = await fetch(`http://localhost:5000/api/quizzes/toggle/${quizId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  setIsToggled(data.isActive);
} catch (err) {
  console.error('Error toggling quiz:', err);
}
  };

  return (
    <button
      onClick={toggle}
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
  );
}

export default ToggleButton;
