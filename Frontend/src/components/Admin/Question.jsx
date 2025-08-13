
// import React, { useState } from 'react';

// function Question({ index, onChange }) {
//   const [inputType, setInputType] = useState("radio");
//   const [options, setOptions] = useState(["", "", "", ""]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     if (name.startsWith("option")) {
//       const optionIndex = parseInt(name.replace("option", "")) - 1;
//       const updatedOptions = [...options];
//       updatedOptions[optionIndex] = value;
//       setOptions(updatedOptions);
//       onChange(index, name, value);
//     } else {
//       onChange(index, name, value);
//     }
//   };

//   const handleCorrectAnswerChange = (e) => {
//     const { value, checked } = e.target;
//     const selectedOption = options[parseInt(value)];

//     if (inputType === "radio") {
//       onChange(index, "correctAnswer", selectedOption);
//     } else {
//       onChange(index, "correctAnswer", (prev = []) => {
//         if (checked) return [...prev, selectedOption];
//         else return prev.filter((ans) => ans !== selectedOption);
//       });
//     }
//   };

//   return (
//     <div className="border border-gray-400 p-6 rounded-xl  text-white mb-6">
//       <h4 className="text-2xl font-semibold mb-4">Question {index + 1}</h4>

//       <label className="block mb-2 text-lg">Input Type:</label>
//       <select
//         className="bg-violet-300 text-black px-3 py-2 rounded mb-4"
//         value={inputType}
//         onChange={(e) => {
//           const newType = e.target.value;
//           setInputType(newType);
//           onChange(index, "inputType", newType);
//           onChange(index, "correctAnswer", newType === "radio" ? "" : []);
//         }}
//       >
//         <option value="radio">Single Correct (Radio)</option>
//         <option value="checkbox">Multiple Correct (Checkbox)</option>
//       </select>

//       <input
//         type="text"
//         name="question"
//         placeholder="Enter question"
//         onChange={handleInputChange}
//         className="w-full px-3 py-2 border border-purple-500 rounded mb-4 text-white text-wrap"
//       />

//       {[0, 1, 2, 3].map((i) => (
//         <div key={i} className="flex items-center gap-3 mb-3">
//           <input
//             type={inputType}
//             name={`correctSelector-${index}`}
//             value={i}
//             onChange={handleCorrectAnswerChange}
//             className="w-5 h-5 "
//           />
//           <input
//             type="text"
//             name={`option${i + 1}`}
//             placeholder={`Option ${i + 1}`}
//             value={options[i]}
//             onChange={handleInputChange}
//             className="flex-1 px-3 py-2 border border-purple-400 rounded text-white"
//           />
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Question;
import React, { useState, useEffect } from 'react';

function Question({ index, data, onChange }) {
  const [inputType, setInputType] = useState(data.inputType || "radio");
  const [options, setOptions] = useState([
    data.option1 || '',
    data.option2 || '',
    data.option3 || '',
    data.option4 || ''
  ]);

  useEffect(() => {
    // Sync local state with parent data
    setInputType(data.inputType || "radio");
    setOptions([
      data.option1 || '',
      data.option2 || '',
      data.option3 || '',
      data.option4 || ''
    ]);
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("option")) {
      const optionIndex = parseInt(name.replace("option", "")) - 1;
      const updatedOptions = [...options];
      updatedOptions[optionIndex] = value;
      setOptions(updatedOptions);
      onChange(index, name, value);
    } else {
      onChange(index, name, value);
    }
  };

  const handleCorrectAnswerChange = (e) => {
    const { value, checked } = e.target;
    const selectedOption = options[parseInt(value)];

    if (inputType === "radio") {
      onChange(index, "correctAnswer", selectedOption);
    } else {
      onChange(index, "correctAnswer", (prev = []) => {
        if (checked) return [...prev, selectedOption];
        else return prev.filter((ans) => ans !== selectedOption);
      });
    }
  };

  return (
    <div className="border border-purple-500 p-6 rounded-xl text-white mb-6 bg-black">
      <h4 className="text-2xl font-semibold mb-4">Editing Question {index + 1}</h4>

      {/* Input Type */}
      <label className="block mb-2 text-lg">Input Type:</label>
      <select
        className="bg-purple-300 text-black px-3 py-2 rounded mb-4"
        value={inputType}
        onChange={(e) => {
          const newType = e.target.value;
          setInputType(newType);
          onChange(index, "inputType", newType);
          onChange(index, "correctAnswer", newType === "radio" ? "" : []);
        }}
      >
        <option value="radio">Single Correct (Radio)</option>
        <option value="checkbox">Multiple Correct (Checkbox)</option>
      </select>

      {/* Question Text */}
      <code><textarea
  name="question"
  placeholder="Enter question here..."
  value={data.question}
  onChange={handleInputChange}
  rows={8} // You can change the number of rows
  className="w-full px-3 py-2 border border-purple-500 rounded mb-4 bg-transparent text-white resize-none"
/></code>

      {/* Options */}
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-3 mb-3">
          <input
            type={inputType}
            name={`correctSelector-${index}`}
            value={i}
            checked={
              inputType === "radio"
                ? data.correctAnswer === options[i]
                : Array.isArray(data.correctAnswer) &&
                  data.correctAnswer.includes(options[i])
            }
            onChange={handleCorrectAnswerChange}
            className="w-5 h-5"
          />
          <input
            type="text"
            name={`option${i + 1}`}
            placeholder={`Option ${i + 1}`}
            value={options[i]}
            onChange={handleInputChange}
            className="flex-1 px-3 py-2 border border-purple-400 rounded bg-transparent text-white"
          />
        </div>
      ))}
    </div>
  );
}

export default Question;
