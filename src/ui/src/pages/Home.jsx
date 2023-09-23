import React from "react";
import TaskView from "./TaskView";
import Pomodoro from "./Components/Pomodoro";
import Weather from "./Components/Weather";
import '../styles/components/home.scss'

function Home() {
   return (
      <>      
         <TaskView/>
         <div className='home'>
            {/* <Pomodoro/>
            <Weather/> */}
         </div>
      </>
   )
}

export default Home;