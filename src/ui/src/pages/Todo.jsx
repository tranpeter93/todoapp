import React, {useState} from "react";
import "../styles/components/todo.scss"
import { Draggable } from "react-beautiful-dnd";
import TodoDescription from "./TodoDetails/TodoDescription";

function Todo({todo, update, isVisible, index, handleDelete}) {

   const { id, name: initialName, description: initialDescription, completed, date: initialDate, position } = todo
   const [name, setName] = useState(initialName)
   const [description, setDescription] = useState(initialDescription)
   const [date, setDate] = useState(initialDate)
   // const [isEditing, setIsEditing] = useState(false)
   const [showExpandButton, setShowExpandButton] = useState(false)
   const [isExpanded, setIsExpanded] = useState(false)

   const saveChanges = async () => {
      disableEditing()

      const updatedTodo = {...todo, name: name }
      update(id, updatedTodo).catch( ex => console.log(ex) )
   }

   const parseHour = () => {
      let hour = new Date( date ).getHours();
      if ( hour > 12 ) {
         hour %= 12;
         hour += "PM"
      }
      else {
         hour += "AM"
      }
      return hour;
   }

   const cancelChanges = () => {
      disableEditing()

      setName( initialName )
      setDescription( initialDescription )
   }

   const toggleCompletion = () => {
      const updatedTodo = {...todo, completed: !completed }
      update(id, updatedTodo).catch( ex => console.log(ex) )
   }

   const enableEditing = () => {
      // setIsEditing(true)
   }

   const disableEditing = () => {
      // setIsEditing(false)
   }

   const handleExpand = () => {
      setIsExpanded(!isExpanded)
   }

   const handleTodoKeyDown = (event) => {
      if (event.key === 'Enter') {
         event.preventDefault();

         saveChanges()
      }
   }

   return (
      <Draggable draggableId={todo.id+""} index={index}>
         {(provided) => (
            <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
               { isVisible && ( 
                  <div className="listItem">            
                     <div className="listItem-container" onMouseEnter={() => setShowExpandButton(true)} onMouseLeave={() => setShowExpandButton(false)}>
                        <div className="checkBox-container">
                           <label>
                              <input className="checkbox" type="checkbox" onChange={toggleCompletion} checked={completed}/>                   
                           </label>
                        </div>
                        <div className="listItem-header">
                           <input type="text" placeholder="task" value={name} 
                              onChange={(evt) => setName(evt.target.value)} onFocus={enableEditing}
                              onKeyDown={(evt) => handleTodoKeyDown(evt, todo)}/> 
                        </div>
                        {/* <div className="listItem-expand">
                           <button className={showExpandButton || isExpanded ? 'icon-button show' : 'hide'} onClick={handleExpand}>
                              <iconify-icon icon="quill:expand"></iconify-icon>
                           </button>
                        </div> */}
                        <div className="listItem-delete">
                           <button className={showExpandButton || isExpanded ? 'icon-button show' : 'hide'} onClick={e => handleDelete(todo.listId, id)}>
                              <iconify-icon icon="mdi:trash-can-outline"></iconify-icon> 
                           </button>
                        </div>
                     </div>
                     <div className="listItem-details">
                        <div className={isExpanded ? 'expanded' : 'collapsed'}>
                           {/* <input type="text" value={description} onChange={(evt) => setDescription(evt.target.value)} onFocus={enableEditing}/> */}
                           <TodoDescription todo={todo} />
                           
                        </div>
                     </div>
                  </div>
                  )
               }
            </li>               
         )}                                    
      </Draggable>
   )   
}

export default Todo