import React from "react";
import "../styles/components/sidebar.scss";
import { Link } from "react-router-dom";

export const SidebarDefault = () => {

   const ICON_WIDTH = "20px"
   const ICON_HEIGHT = "20px"

  return (
   <>
      <div className="sidebar-default">
         <div className="sidebar-button-container">
            <Link to="/">
               <button className='calendar-button'>               
                  <iconify-icon icon="humbleicons:dashboard" width={ICON_WIDTH} height={ICON_HEIGHT}></iconify-icon>               
               </button>
            </Link>
            {/* <button className='search-button'>
               <iconify-icon icon="ri:music-line" width={ICON_WIDTH} height={ICON_HEIGHT}></iconify-icon>
            </button> */}
            <Link to='/list'>
               <button className='music-button'>
                  <iconify-icon icon="pixelarticons:list" width={ICON_WIDTH} height={ICON_HEIGHT}></iconify-icon>
               </button>
            </Link>
         </div>
      </div>
    </>
  );
};

