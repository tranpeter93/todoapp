import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";
import "../styles/components/taskView.scss"
import { createList, deleteList, getLists, updateList } from "../services/TodoListApi";
import Tab from "./Tab";

export default function TaskView() {

   const [currentListIdx, setCurrentListIdx] = useState(0)
   const [list, setList] = useState([])

   const [shownListName, setShownListName] = useState(list[currentListIdx] ? list[currentListIdx].name : "")

   useEffect(() => {
      refreshList()
   }, [])

   useEffect(() => console.log( "List: ", list), [list])
   useEffect(() => console.log( "Current Idx:", currentListIdx, "List Length:", list.length), [currentListIdx])

   const refreshList = async () => {
      
      await getLists()
         .then( data => {
            setList(data)
            if ( currentListIdx === data.length ) {
               setCurrentListIdx(Math.max(data.length-1, 0))
            }
            else if ( data.length === 0 ) {
               setCurrentListIdx(0)
            }

            if ( data[currentListIdx] ) {
               setShownListName(data[currentListIdx].name)
            }
            else {
               setShownListName('')
            }
         })
   }

   const handleSelectList = (idx) => {
      setCurrentListIdx(idx)
      setShownListName(list[idx].name)
   }

   const handleCreateList = () => {
      createList({name: "new list"})
      refreshList()
   }

   const handleDeleteList = async () => {
      await deleteList(list[currentListIdx].id)
      refreshList()
   }

   const handleUpdateList = async () => {

      if ( shownListName.trim().length === 0 ) {
         return;
      }

      const curr = list[currentListIdx]
      await updateList({...curr, name: shownListName})
      refreshList()
   }

   const handleListKeyDown = (event) => {
      if (event.key === 'Enter') {
         event.preventDefault();

         handleUpdateList()
      }
   }

   return (
      <div className="taskView">
         <div className="taskView-header">
            Today's Focus
         </div>
         
         <div className='taskView-listGroup'>
            {list.map((item, idx) => {
               return <Tab key={idx} item={item} handleSelect={() => handleSelectList(idx)} 
                  isSelected={idx === currentListIdx}/>
            })}
            <button className="icon-button" onClick={handleCreateList}>
               <iconify-icon icon="material-symbols:add"/>
            </button>
         </div>
      
         <div className="taskView-container">            
            <div className="todoList-container">
               <div className="taskView-currentListHeader">
                  <input type="text" value={shownListName} 
                     placeholder="List Name"
                     onKeyDown={handleListKeyDown}
                     onChange={(e) => setShownListName(e.target.value)}/>
                  <button className="icon-button" onClick={handleDeleteList}>
                     <iconify-icon icon="lucide:delete" width="28px"></iconify-icon>
                  </button>
               </div>
               <TodoList listId={list[currentListIdx] ? list[currentListIdx].id : -1} handleDeleteList={handleDeleteList}/>
            </div>
         </div>         
      </div>    
   )
}