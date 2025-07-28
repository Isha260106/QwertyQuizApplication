
import React, { useState } from 'react';

function Question({ index, onChange }) {
  const [inputType, setInputType] = useState("radio");
  const [options, setOptions] = useState(["", "", "", ""]);

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
    <div className="question-form" style={{ border: '1px solid gray', padding: '10px', margin: '10px 0' }}>
      <h4>Question {index + 1}</h4>

      <label>Input Type:&nbsp;</label>
      <select
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

      <br /><br />
      <input
        type="text"
        name="question"
        placeholder="Enter question"
        onChange={handleInputChange}
        style={{ width: '100%', marginBottom: '8px' }}
      />

      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{ marginBottom: '6px' }}>
          <input
            type={inputType}
            name="correctSelector"
            value={i}
            onChange={handleCorrectAnswerChange}
          />
          <input
            type="text"
            name={`option${i + 1}`}
            placeholder={`Option ${i + 1}`}
            value={options[i]}
            onChange={handleInputChange}
            style={{ marginLeft: '10px', width: '80%' }}
          />
        </div>
      ))}
    </div>
  );
}

export default Question;
