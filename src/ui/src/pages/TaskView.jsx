import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";
import "../styles/components/taskView.scss"
import { getLists } from "../services/TodoApi";

export default function TaskView() {

   const [currentListId, setCurrentListId] = useState(2)
   const [list, setList] = useState([])

   useEffect(() => {
      getLists().then( data => setList(data))
   }, [])

   useEffect(() => console.log( "List: ", list ), [list])


   return (
      <div className="taskView">
         <div className="taskView-header">
            Today's Focus
         </div>
         <div className='taskView-listGroup'>
            {list.map((item, idx) => {
               return (
                  <div className='listSelector' key={idx}>
                     <button onClick={(e) => setCurrentListId(item.id)}>{item.name}</button>
                  </div>
               )
            })}
         </div>
         <div className="taskView-container">
            <div className="todoList-container">
               <TodoList listId={currentListId}/>
            </div>
         </div>         
      </div>    
   )
}