import React from "react";

export default function Wait(){
    return(
        <div className='flex flex-col justify-around gap-4 items-center min-h-screen bg-black'>
        <div className="flex flex-col  space-y-5 gap-4 text-white">
            <p className="text-6xl">Waiting for the quiz to start..</p>
        </div>
        </div>
    )
}