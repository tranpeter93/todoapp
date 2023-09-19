import React, { useState } from "react";
import "../../styles/components/todoDescription.scss"

function TodoDescription({todo}) {

   const { description, date, completed, id, position } = todo
   const [newSubtask, setNewSubtask] = useState('')

   //local state to be put into backend
   const [subtasks, setSubtasks] = useState([])

   const handleAddSubtask = () => {
      if ( !newSubtask || newSubtask.trim().length === 0 ) {
         return;
      }

      const tasks = [...subtasks, {name: newSubtask}]

      setSubtasks( tasks )
      setNewSubtask('')
   }

   return (
      <div className="todoDescription">
         <ul>
         {
            subtasks.map((task, idx) => {
               return (
                  <li key={idx} style={{listStyle: 'none'}}>{idx+1}. {task.name}</li>
               )
            })
         }
         </ul>
         <div>
            <input type="text" placeholder="new subtask..." value={newSubtask} onChange={e => setNewSubtask(e.target.value)}></input>
            <button type="submit" onClick={handleAddSubtask}>
               <iconify-icon icon="material-symbols:add"></iconify-icon>
            </button>
         </div>
         <div>{description}</div>
         <div>Created: {date}</div>         
         {/* <div>id: {id}</div> */}
         {/* <div>pos: {position}</div> */}
         
      </div>
   )
}

export default TodoDescription