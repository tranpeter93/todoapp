import React from "react";
import "../styles/components/viewOptions.scss"

function ViewOptions({handleFilter, handleSort}) {

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
               <div className="viewOptions-sort">
                  <button className="icon-button" onClick={handleSort}>
                     {/* <label>sort</label> */}
                     <iconify-icon icon="mdi:sort"></iconify-icon>
                  </button>
               </div>
            </div>         
         </div>
         <div className="viewOptions-popUp hide">
            {/* <div>
               All Items
            </div>
            <div>
               Incomplete
            </div>
            <div>
               Completed
            </div>
            <div>
               Archived
            </div> */}
         </div>
      </>
   )
}

export default ViewOptions