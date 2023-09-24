import React from "react";
import "../styles/components/viewOptions.scss"

function ViewOptions({handleFilter}) {

   return (
      <>
         <div className="todolist-viewOptions">
            <div className="viewOptions-buttonGroup">
               <div className="viewOptions-filter">
                  <button className="icon-button" onClick={handleFilter}>
                     {/* <label>filter</label> */}
                     <iconify-icon icon="mdi:filter"></iconify-icon>
                  </button>
               </div>
            </div>         
         </div>
      </>
   )
}

export default ViewOptions