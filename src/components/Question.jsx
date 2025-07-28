
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
//     <div className="question-form" style={{ border: '1px solid gray', padding: '10px', margin: '10px 0' }}>
//       <h4>Question {index + 1}</h4>

//       <label>Input Type:&nbsp;</label>
//       <select
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

//       <br /><br />
//       <input
//         type="text"
//         name="question"
//         placeholder="Enter question"
//         onChange={handleInputChange}
//         style={{ width: '100%', marginBottom: '8px' }}
//       />

//       {[0, 1, 2, 3].map((i) => (
//         <div key={i} style={{ marginBottom: '6px' }}>
//           <input
//             type={inputType}
//             name="correctSelector"
//             value={i}
//             onChange={handleCorrectAnswerChange}
//           />
//           <input
//             type="text"
//             name={`option${i + 1}`}
//             placeholder={`Option ${i + 1}`}
//             value={options[i]}
//             onChange={handleInputChange}
//             style={{ marginLeft: '10px', width: '80%' }}
//           />
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Question;
import React, { useState } from 'react';

function Question({ index, onChange, questionData = {} }) {
  const [inputType, setInputType] = useState("radio");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

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
    const optionText = options[parseInt(value)];

    if (!optionText) return;

    if (inputType === "radio") {
      setSelectedAnswers([optionText]);
      onChange(index, "correctAnswer", optionText);
    } else {
      let updatedAnswers;
      if (checked) {
        updatedAnswers = [...selectedAnswers, optionText];
      } else {
        updatedAnswers = selectedAnswers.filter(ans => ans !== optionText);
      }
      setSelectedAnswers(updatedAnswers);
      onChange(index, "correctAnswer", updatedAnswers);
    }
  };

  const handleInputTypeChange = (e) => {
    const newType = e.target.value;
    setInputType(newType);
    setSelectedAnswers([]);
    onChange(index, "inputType", newType);
    onChange(index, "correctAnswer", newType === "radio" ? "" : []);
  };

  return (
    <div className="question-form border border-white p-4 mb-4 rounded text-white">
      <h4 className="text-lg font-semibold mb-2">Question {index + 1}</h4>

      <div className="mb-4">
        <label className="font-medium">Input Type:&nbsp;</label>
        <select
          className="border rounded px-2 py-1 text-black"
          value={inputType}
          onChange={handleInputTypeChange}
        >
          <option value="radio">Single Correct (Radio)</option>
          <option value="checkbox">Multiple Correct (Checkbox)</option>
        </select>
      </div>

      <input
        type="text"
        name="question"
        placeholder="Enter question"
        value={questionData?.question || ""}
        onChange={handleInputChange}
        className="w-full mb-4 p-2 border rounded text-black"
      />

      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="flex items-center mb-3">
          <input
            type={inputType}
            name={`correctSelector-${index}`}
            value={i}
            checked={
              inputType === "radio"
                ? selectedAnswers[0] === options[i]
                : selectedAnswers.includes(options[i])
            }
            onChange={handleCorrectAnswerChange}
            disabled={!options[i]} // prevent selecting empty options
            className="cursor-pointer"
          />
          <input
            type="text"
            name={`option${i + 1}`}
            placeholder={`Option ${i + 1}`}
            value={options[i]}
            onChange={handleInputChange}
            className="ml-2 flex-1 p-2 border rounded text-black"
          />
        </div>
      ))}

      <div className="text-sm mt-2">
        <span className="font-semibold">Selected Answer(s): </span>
        {Array.isArray(selectedAnswers)
          ? selectedAnswers.join(", ")
          : selectedAnswers}
      </div>
    </div>
  );
}

export default Question;
