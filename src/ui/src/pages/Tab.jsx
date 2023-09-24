import React, { useState } from "react";
import "../styles/components/Tab.scss"

function Tab({item, handleSelect, isSelected}) {

   const unselectedStyle = {backgroundColor: 'transparent'}
   const selectedStyle   = {backgroundColor: 'white'}
   
   const selectHandler = () => {
      handleSelect( item )
   }

   return (
      <div className='listSelector' style={ isSelected ? selectedStyle : unselectedStyle }>
         <button onClick={selectHandler}>{item.name}</button>
      </div>
   )
}

export default Tab;