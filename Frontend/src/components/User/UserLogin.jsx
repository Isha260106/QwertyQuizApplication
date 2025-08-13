import React, {useState } from "react";
import Footer from './Footer'
import { useNavigate } from "react-router-dom";
function UserLogin(){
    const [name,setName]=useState('')
    const [usn,setUSN]=useState('')
    const [email,setEmail]=useState('')
    const [semester,setSemester]=useState('')
    const [branch,setBranch]=useState('')
    const [mobileNo,setMobileNo]=useState('')

    const navigate=useNavigate()
    async function Validate(){
      if(!name ||!usn||!email){
        alert("Please fill all the credentials")
        return;
      }
      navigate('/UserQuiz')
      const userData={
        "name" : name,
        "usn" : usn,
        "semester":semester,
        "branch":branch,
        "mobileNo":mobileNo,
        "email" : email
      }

      localStorage.setItem('user', JSON.stringify(userData));

      try {
      const res = await fetch('http://localhost:5000/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      if (res.ok) {
        alert("User Logged in successfully!");
      } else {
        alert("Failed to submit quiz.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Server error. Try again.");
    }
    }

    return(
     <>   
    <div className="flex flex-col justify-around min-h-screen bg-black">
  <div className="flex flex-col justify-between items-center px-8 py-14 w-full max-w-md mx-auto  space-y-15 text-white border-1 rounded-4xl border-purple-400 p-8">
    <h1 className="text-3xl font-semibold">Login</h1>

    <input 
      className="w-full text-white bg-transparent border-b-2 border-purple-500 focus:outline-none placeholder-gray-400"
      type="text"
      placeholder="Username"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
    <input 
      className="w-full text-white bg-transparent border-b-2 border-purple-500 focus:outline-none placeholder-gray-400"
      type="text"
      placeholder="USN"
      value={usn}
      onChange={(e) => setUSN(e.target.value)}
/>

<select className="w-full text-gray-400 bg-black border-b-2 border-purple-500 focus:outline-none"
      value={semester}
      onChange={(e) => setSemester(e.target.value)}>
      <option value="" disabled selected hidden>
        Semester
      </option>
      <option value='1'>1</option>
      <option value='2'>2</option>
      <option value='3'>3</option>
      <option value='4'>4</option>
      <option value='5'>5</option>
      <option value='6'>6</option>
</select>

<select className="w-full text-gray-400 bg-black border-b-2 border-purple-500 focus:outline-none"
      value={branch}
      onChange={(e) => setBranch(e.target.value)}>
      <option value="" disabled selected hidden>
        Branch
      </option>
      <option value='CSE'>CSE</option>
      <option value='ISE'>ISE</option>
      <option value='AIML'>AIML</option>
      <option value='ECE'>ECE</option>
      <option value='EEE'>EEE</option>
      <option value='MECH'>MECH</option>
      <option value='CHEM'>CHEM</option>
      <option value='CIVIL'>CIVIL</option>
</select>

<input
      className="w-full text-white bg-transparent border-b-2 border-purple-500 focus:outline-none placeholder-gray-400"
      type="text"
      placeholder="Mobile Number"
      value={mobileNo}
      onChange={(e) => setMobileNo(e.target.value)}
    />

    <input
      className="w-full text-white bg-transparent border-b-2 border-purple-500 focus:outline-none placeholder-gray-400"
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <button
      className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded text-white font-medium transition duration-300"
      type="submit"
      onClick={(e) => {
        e.preventDefault();
        Validate();
        
        
      }}
    >
      Submit
    </button>
  </div >
    
</div>
<Footer/>  
</>
    )
}

export default UserLogin;