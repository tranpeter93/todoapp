import React, {useState, useEffect} from "react";

import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { deleteTodo, createTodo, updateTodo, getTodosByList } from "../services/TodoApi";

import "../styles/components/todoList.scss"

import Todo from "./Todo";
import ViewOptions from "./ViewOptions";

function TodoList({listId}) {
   const [todos, setTodos] = useState([])
   const [newTaskName, setNewTaskName] = useState('')
   const [hideCompleted, setHideCompleted] = useState(false)

   useEffect(() => {

      console.log( "Updating to list: ", listId)

      getTodosByList(listId).then(data => setTodos(data))
   }, [listId])
   
   // EVENT HANDLERS  
   const handleAdd = async (todo) => {

      await createTodo({...todo, listId: listId})
      handleRefresh()
   }

   const handleDelete = async (listId, id) => {
      await deleteTodo(listId, id)
      handleRefresh()
   }

   const handleUpdate = async (listId, id, todo) => {
      await updateTodo(listId, id, todo);
      handleRefresh()
   }

   const handleHideCompleted = () => {
      setHideCompleted(!hideCompleted)
   }

   const handleRefresh = () => {
      getTodosByList(listId).then(data => setTodos(data))
   }

   const handleDragEnd = ( result ) => {
      const { source, destination } = result

      if ( !destination ) { 
         return;
      }

      if ( destination.index === source.index && 
            destination.droppableId === source.droppableId ) {
         return;
      }

      const copyTodos = todos
      const sourceTodo = copyTodos.splice( source.index, 1 )[0]
      copyTodos.splice( destination.index, 0, sourceTodo )
      
      for ( let i = 0; i < todos.length; i++ ) {
         copyTodos[i].position = i;
      }

      console.log( result )

      // reorderedTodos( copyTodos )
      handleRefresh()
   }

   const handleAddTask = () => {

      if ( !newTaskName || newTaskName.trim().length === 0) {
         return;
      }

      handleAdd({name: newTaskName, listId: listId})
      setNewTaskName('')
   }

   const handleVisibility = (todo) => {

      if ( !(hideCompleted && todo.completed) ) {
         return true
      }

      return false;
   }

   const handleAddKeyDown = (event) => {
      if (event.key === 'Enter') {
         event.preventDefault();

         handleAddTask()
      }
   }

   useEffect(() => console.log( "Todos: ", todos ), [todos])

   return (
      <>
         <ViewOptions handleFilter={handleHideCompleted} />
         <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="todoDroppable">
            {(provided) => (
               <ul className="todolist" {...provided.droppableProps} ref={provided.innerRef} >
                  {todos.map((todo, index) => {
                     return (
                        <Todo key={todo.id} todo={todo} index={index}
                           update={handleUpdate} handleDelete={handleDelete} isVisible={ handleVisibility(todo)} />                           
                     )
                  })}
                  {provided.placeholder}
               </ul>
               )}
            </Droppable>
         </DragDropContext>

         <div className="editor">
            <div className="editor-container">
               <input id="addTodoInput" type="text" value={newTaskName} 
                  onChange={(e) => setNewTaskName(e.target.value)} placeholder="Add new task"
                  onKeyDown={handleAddKeyDown}/>
               <button className="icon-button" onClick={handleAddTask}>
                  <iconify-icon icon="material-symbols:add"/>
               </button>
            </div>
         </div>
      </>
   )
}

export default TodoList