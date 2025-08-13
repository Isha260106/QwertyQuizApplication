import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Feedback() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    usn: ""
  });

  const [overallExperience, setOverallExperience] = useState("");
  const [careerUsefulness, setCareerUsefulness] = useState("");
  const [keyTakeaways, setKeyTakeaways] = useState("");
  const [logisticsFeedback, setLogisticsFeedback] = useState("");
  const [contentSuggestion, setContentSuggestion] = useState("");
  const [overallFeedback, setOverallFeedback] = useState("");
  const [nextWorkshopTopic, setNextWorkshopTopic] = useState("");
  const [logistics_Venue, setLogistics_Venue] = useState("");
  const [logistics_Registration_Process, setLogistics_Registration_Process] = useState("");
  const [logistics_Flow_Workshop, setLogistics_Flow_Workshop] = useState("");
  const [logistics_content, setLogistics_content] = useState("");
  const [logistics_Delivery_content, setLogistics_Delivery_content] = useState("");
  const [logistics_Transportation, setLogistics_Transportation] = useState("");
  const [logistics_Activities, setLogistics_Activities] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserData(storedUser);
    }
  }, []);

  function handelSubmit() {
    const requiredFieldsFilled =
      overallExperience &&
      careerUsefulness &&
      keyTakeaways &&
      overallFeedback &&
      nextWorkshopTopic &&
      logistics_Venue &&
      logistics_Registration_Process &&
      logistics_Flow_Workshop &&
      logistics_content &&
      logistics_Delivery_content &&
      logistics_Transportation &&
      logistics_Activities;

    if (!requiredFieldsFilled) {
      alert("Please fill all the required fields");
      return;
    }

    fetch('http://localhost:5000/api/quizzes/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...userData,
        OverallExperience: overallExperience,
        CareerUsefulness: careerUsefulness,
        KeyTakeAways: keyTakeaways,
        logisticsFeedback: logisticsFeedback,
        contentSuggestion: contentSuggestion,
        overallFeedback: overallFeedback,
        nextWorkshopTopic: nextWorkshopTopic,
        Venue: logistics_Venue,
        RegistrationProcess: logistics_Registration_Process,
        FlowWorkshop: logistics_Flow_Workshop,
        content: logistics_content,
        DeliveryContent: logistics_Delivery_content,
        Transportation: logistics_Transportation,
        Activities: logistics_Activities
      })
    })
      .then(res => {
        if (res.ok) {
          alert("Feedback submitted successfully!");
          localStorage.removeItem("user");
          navigate('/');
        } else {
          alert("Failed to submit feedback.");
        }
      })
      .catch(err => {
        console.error("Submission error:", err);
        alert("Server error. Try again.");
      });
  }

  const renderStarRating = (value, setValue, labelText) => (
    <div className="mb-6">
      <label className="block text-white font-semibold mb-3">{labelText}</label>
      <div className="flex gap-3">
        {[1, 2, 3, 4, 5].map((val) => (
          <button
            key={val}
            type="button"
            onClick={() => setValue(val.toString())}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-medium transition-all duration-200 
              ${
                value === val.toString()
                  ? "bg-purple-600 text-white shadow-lg scale-110"
                  : "bg-gray-800 text-gray-400 hover:bg-purple-500 hover:text-white"
              }`}
          >
            {val}
          </button>
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-400 mt-1 px-1 select-none">
        <span>Poor</span>
        <span>Excellent</span>
      </div>
    </div>
  );

  return (
    <div className="flex justify-center min-h-screen py-16 bg-black">
      <div className="bg-[#1a1a1a] w-full max-w-3xl rounded-2xl shadow-lg p-10 space-y-8">
        {/* Header */}
        <div className="border-b-10 border-purple-500 pb-4">
          <h1 className="text-4xl font-bold text-purple-400">Feedback Form</h1>
          <p className="text-gray-400 mt-1">
            Please fill in your feedback honestly. Your opinion matters!
          </p>
        </div>

        {/* Readonly User Info */}
        <div className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="username" className="text-white font-semibold mb-1">
              Username
            </label>
            <input
              id="username"
              className="w-full bg-transparent border-b-2 border-purple-500 text-white py-2 focus:outline-none"
              type="text"
              value={userData.name}
              readOnly
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-white font-semibold mb-1">
              Email
            </label>
            <input
              id="email"
              className="w-full bg-transparent border-b-2 border-purple-500 text-white py-2 focus:outline-none"
              type="text"
              value={userData.email}
              readOnly
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="usn" className="text-white font-semibold mb-1">
              USN
            </label>
            <input
              id="usn"
              className="w-full bg-transparent border-b-2 border-purple-500 text-white py-2 focus:outline-none"
              type="text"
              value={userData.usn}
              readOnly
            />
          </div>
        </div>

        {/* Ratings */}
        <div className="space-y-6">
          {renderStarRating(overallExperience, setOverallExperience, "Overall Experience of the Workshop")}
          {renderStarRating(careerUsefulness, setCareerUsefulness, "Usefulness for Your Career")}
          <h2 className="text-lg font-semibold text-purple-400 mt-8">Logistics</h2>
          {renderStarRating(logistics_Venue, setLogistics_Venue, "Venue")}
          {renderStarRating(logistics_Registration_Process, setLogistics_Registration_Process, "Registration Process")}
          {renderStarRating(logistics_Flow_Workshop, setLogistics_Flow_Workshop, "Flow of the Workshop")}
          {renderStarRating(logistics_content, setLogistics_content, "Content Quality")}
          {renderStarRating(logistics_Delivery_content, setLogistics_Delivery_content, "Content Delivery")}
          {renderStarRating(logistics_Transportation, setLogistics_Transportation, "Transportation")}
          {renderStarRating(logistics_Activities, setLogistics_Activities, "Activities")}
        </div>

        {/* Text Inputs */}
        <div className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="keyTakeaways" className="text-white font-semibold mb-1">
              Key takeaways from the workshop
            </label>
            <input
              id="keyTakeaways"
              className="w-full bg-transparent border-b-2 border-purple-500 text-white py-2 focus:outline-none"
              type="text"
              value={keyTakeaways}
              onChange={(e) => setKeyTakeaways(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="logisticsFeedback" className="text-white font-semibold mb-1">
              Additional feedback on logistics
            </label>
            <input
              id="logisticsFeedback"
              className="w-full bg-transparent border-b-2 border-purple-500 text-white py-2 focus:outline-none"
              type="text"
              value={logisticsFeedback}
              onChange={(e) => setLogisticsFeedback(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="contentSuggestion" className="text-white font-semibold mb-1">
              Suggestions for content & delivery
            </label>
            <input
              id="contentSuggestion"
              className="w-full bg-transparent border-b-2 border-purple-500 text-white py-2 focus:outline-none"
              type="text"
              value={contentSuggestion}
              onChange={(e) => setContentSuggestion(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="overallFeedback" className="text-white font-semibold mb-1">
              Overall feedback
            </label>
            <input
              id="overallFeedback"
              className="w-full bg-transparent border-b-2 border-purple-500 text-white py-2 focus:outline-none"
              type="text"
              value={overallFeedback}
              onChange={(e) => setOverallFeedback(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="nextWorkshopTopic" className="text-white font-semibold mb-1">
              Next workshop topic
            </label>
            <input
              id="nextWorkshopTopic"
              className="w-full bg-transparent border-b-2 border-purple-500 text-white py-2 focus:outline-none"
              type="text"
              value={nextWorkshopTopic}
              onChange={(e) => setNextWorkshopTopic(e.target.value)}
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex flex-col items-center">
          <button
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg"
            onClick={handelSubmit}
          >
            Submit Feedback
          </button>
          <p className="text-sm text-gray-400 mt-3">
            Your feedback is valuable to us!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
