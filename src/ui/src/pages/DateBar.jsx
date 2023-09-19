import React from "react";
import '../styles/components/dateBar.scss'

function DateBar() {

   const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
   const date = new Date()

   return (
      <div className="datebar">
         <div className="datebar-container">
            <div className="datetime">
               <div className="month">
                  {MONTHS[date.getMonth()]}
               </div>
               <div className="day">
                  {date.getDate()}
               </div>
            </div>
         </div>
      </div>
   )
}

export default DateBar