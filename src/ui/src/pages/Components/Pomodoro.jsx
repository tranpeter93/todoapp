import React, { useEffect, useState } from "react";
import '../../styles/components/pomodoro.scss'

function Pomodoro() {

   const POMODORO_MINUTE = 25
   const POMODORO_SECONDS = 0   

   const BREAK_MINUTE = 5
   const BREAK_SECONDS = 0

   const [minute, setMinute] = useState(POMODORO_MINUTE)
   const [seconds, setSeconds] = useState(POMODORO_SECONDS)
   const [isActive, setIsActive] = useState(false)   
   const states = ['Pomodoro', 'Break']
   const [pomoState, setPomoState] = useState(states[0])

   useEffect(() => {

      if ( !isActive ) {
         return;
      }

      const timerId = setInterval(() => {
         if ( seconds === 0 && minute === 0 ) {
            clearInterval( timerId )
            setIsActive( false )    
            
            if ( pomoState === states[0] ) {
               setMinute( BREAK_MINUTE )
               setSeconds( BREAK_SECONDS )
               setPomoState(states[1])
            }
            else if ( pomoState === states[1] ) {
               setMinute( POMODORO_MINUTE )
               setSeconds( POMODORO_SECONDS )
               setPomoState(states[0])
            }
            
         }
         else if ( seconds == 0 ) {
            setMinute( minute-1 )
            setSeconds( 59 ) 
         }
         else {
            setSeconds( seconds-1 )
         }
         
         
      }, 1000);

      return () => clearInterval( timerId );
   }, [isActive, minute, seconds])


   const handlePomodoroTimer = () => {
      
   }

   const handlePausePlay = () => {
      setIsActive( !isActive )
   }

   const formatTimer = (digits) => {
      return String(digits).padStart(2, "0")
   }

   return (
      <div className="pomodoro">
         <div className="pomodoro-container">
            <div className="pomo-header">
               Pomodoro
            </div>
            <div className="pomo-timer">
               <div>
               {formatTimer(minute)}:{formatTimer(seconds)}
               </div>
            </div>
            <div className="pomo-buttonGroup">
               <div className="pomo-pausePlay">
                  <button className="pomo-pausePlayButton" onClick={handlePausePlay}>
                     <iconify-icon icon={isActive ? "material-symbols:pause-outline" : "octicon:play-16"} width="60px" height="60px"></iconify-icon>
                  </button>
               </div>
            </div>
            <div className="pomo-state">
               <div>
                  <span>{pomoState}</span>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Pomodoro;