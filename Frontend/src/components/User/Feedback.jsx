import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Feedback() {
  const navigate=useNavigate()
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
  const [logistics_Transportation,setLogistics_Transportation] = useState("");
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
    alert("Feedback submitted successfully!");
    FeedbackForm();

    // const feedbackData = {
    //   ...userData,
    //   overallExperience,
    //   careerUsefulness,
    //   keyTakeaways,
    //   logisticsRatings,
    //   logisticsFeedback,
    //   contentSuggestion,
    //   overallFeedback,
    //   nextWorkshopTopic,
    //   logistics_Venue,
    //   logistics_Registration_Process,
    //   logistics_Flow_Workshop,
    //   logistics_content,
    //   logistics_Delivery_content,
    //   logistics_Transportation,
    //   logistics_Activities
    // };

    fetch('http://localhost:5000/api/quizzes/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
      ...userData,
      OverallExperience : overallExperience,
  CareerUsefulness : careerUsefulness,
  KeyTakeAways : keyTakeaways,
  logisticsFeedback :logisticsFeedback,
  contentSuggestion  : contentSuggestion,
  overallFeedback  : overallFeedback,
  nextWorkshopTopic : nextWorkshopTopic,
  Venue : logistics_Venue,
  RegistrationProcess : logistics_Registration_Process,
  FlowWorkshop : logistics_Flow_Workshop,
  content : logistics_content,
  DeliveryContent : logistics_Delivery_content,
  Transportation : logistics_Transportation,
  Activities :logistics_Activities 
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
          <label key={val} className="text-white cursor-pointer">
            <input
              type="radio"
              name={labelText}
              value={val}
              checked={value === val.toString()}
              onChange={(e) => setValue(e.target.value)}
              className="hidden"
            />
            <span
              className={`text-3xl  ${
                value >= val.toString() ? "text-purple-600" : "text-gray-500"
              }`}
            >
              ●
            </span>
          </label>
        ))}
      </div>
    </div>
  );

  function FeedbackForm() {
    console.log({
      overallExperience,
      careerUsefulness,
      keyTakeaways,
      logisticsFeedback,
      contentSuggestion,
      overallFeedback,
      nextWorkshopTopic,
      userData,
      logistics_Venue,
      logistics_Registration_Process,
      logistics_Flow_Workshop,
      logistics_content,
      logistics_Delivery_content,
      logistics_Transportation,
      logistics_Activities
    });
  }

  return (
    <div className="flex flex-col w-max justify-center items-center min-h-screen m-auto py-20 bg-black">
      <div className="flex flex-col justify-between px-8 py-14 w-3xl  space-y-6 text-white border-1 rounded-4xl border-purple-400">
        <h1 className="text-3xl font-semibold">Feedback Form</h1>

        <input
          className="w-full text-white bg-transparent border-b-2 border-purple-500 focus:outline-none placeholder-gray-400"
          type="text"
          placeholder="Username"
          value={userData.name}
          readOnly
        />

        <input
          className="w-full text-white bg-transparent border-b-2 border-purple-500 focus:outline-none placeholder-gray-400"
          type="text"
          placeholder="Email"
          value={userData.email}
          readOnly
        />

        <input
          className="w-full text-white bg-transparent border-b-2 border-purple-500 focus:outline-none placeholder-gray-400"
          type="text"
          placeholder="USN"
          value={userData.usn}
          readOnly
        />

        {/* Overall Experience with Star Rating */}
        {renderStarRating(overallExperience, setOverallExperience, "How was the Overall Experience of the Workshop?")}

        {/* Career Usefulness */}
        {renderStarRating(careerUsefulness, setCareerUsefulness, "How much do you think the Workshop will be useful for your career?")}


        {/* Logistics Satisfaction */}
        {renderStarRating(logistics_Venue, setLogistics_Venue, "Venue of the workshop...")}
        {renderStarRating(logistics_Registration_Process, setLogistics_Registration_Process, "Registration Process")}
        {renderStarRating(logistics_Flow_Workshop, setLogistics_Flow_Workshop, "Flow of the Workshop")}
        {renderStarRating(logistics_content, setLogistics_content, "Content")}
        {renderStarRating(logistics_Delivery_content, setLogistics_Delivery_content, "Delivery of the content")}
        {renderStarRating(logistics_Transportation, setLogistics_Transportation, "Transportation")}
        {renderStarRating(logistics_Activities, setLogistics_Activities, "Activities")}

        {/* Key Takeaways */}
        <input
          className="w-full text-white bg-transparent border-b-2 border-purple-500 focus:outline-none placeholder-gray-400"
          type="text"
          placeholder="What were your key takeaways from this workshop?"
          onChange={(e) => setKeyTakeaways(e.target.value)}
          value={keyTakeaways}
        />

        {/* Feedback on logistics */}
        <input
          className="w-full text-white bg-transparent border-b-2 border-purple-500 focus:outline-none placeholder-gray-400"
          type="text"
          placeholder="Any additional feedback on logistics?"
          value={logisticsFeedback}
          onChange={(e) => setLogisticsFeedback(e.target.value)}
        />

        {/* Content suggestion */}
        <input
          className="w-full text-white bg-transparent border-b-2 border-purple-500 focus:outline-none placeholder-gray-400"
          type="text"
          placeholder="Any suggestions regarding session content and delivery?"
          value={contentSuggestion}
          onChange={(e) => setContentSuggestion(e.target.value)}
        />

        {/* Overall feedback */}
        <input
          className="w-full text-white bg-transparent border-b-2 border-purple-500 focus:outline-none placeholder-gray-400"
          type="text"
          placeholder="Overall feedback for the workshop"
          value={overallFeedback}
          onChange={(e) => setOverallFeedback(e.target.value)}
        />

        {/* Topic for next workshop */}
        <input
          className="w-full text-white bg-transparent border-b-2 border-purple-500 focus:outline-none placeholder-gray-400"
          type="text"
          placeholder="On what topic would you like the next workshop?"
          value={nextWorkshopTopic}
          onChange={(e) => setNextWorkshopTopic(e.target.value)}
        />

        {/* Submit */}
        <div className='flex flex-col items-center space-y-4 mt-4'>
          <button
            className="w-xl py-2 bg-purple-600 hover:bg-purple-700 rounded text-white font-medium transition duration-300"
            type="submit"
            onClick={handelSubmit}
          >
            Submit Feedback
          </button>
          <p className="text-sm text-gray-400 mt-4">
            Your feedback is valuable to us!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Feedback;