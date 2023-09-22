import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";
import "../styles/components/taskView.scss"
import { getLists } from "../services/TodoListApi";
import Tab from "./Tab";

export default function TaskView() {

   const [currentListId, setCurrentListId] = useState(2)
   const [list, setList] = useState([])

   useEffect(() => {
      getLists().then( data => setList(data))
   }, [])

   useEffect(() => console.log( "List: ", list ), [list])


   const handleSelectList = (item) => {
      setCurrentListId(item.id)
   }

   return (
      <div className="taskView">
         <div className="taskView-header">
            Today's Focus
         </div>
         <div className='taskView-listGroup'>
            {list.map((item, idx) => {
               return <Tab key={idx} item={item} handleSelect={handleSelectList} isSelected={idx+1 === currentListId}/>
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