import React from "react";
import { Outlet, Link } from "react-router-dom";
import "../styles/layout.scss"
import { SidebarDefault } from "./Sidebar";


function Layout() {
   return (
      <>
         <div className="layout">
            {/* <SidebarDefault/> */}
            <div className="main">
               <Outlet/>
            </div>
            {/* <DateBar/> */}
         </div>
      </>
   )
}

export default Layout