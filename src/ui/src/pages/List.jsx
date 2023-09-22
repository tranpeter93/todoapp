import React, {useEffect, useState} from "react";
import {createList, deleteList, updateList, getLists} from '../services/TodoListApi'

function List() {

   const [list, setList] = useState([])
   const [addInputVal, setAddInputVal] = useState('')

   useEffect(() => {
      getLists().then(data => setList(data))
   })

   const handleAddList = () => {
      if ( !addInputVal || addInputVal.trim().length === 0 ) return;

      createList({name: addInputVal})
      setAddInputVal('')


   }

   const handleUpdate = (listId, name) => {
      updateList({id: listId, name: name})
   }

   const handleDelete = (listId) => {
      deleteList(listId)
   }

   return (
      <>
         <div className="list">
            <div className="list-container">
               <div className="list-header">

               </div>
               <div className="list-body">
                  <ol className="list-collection">
                  {
                     list.map((item, idx) => {
                        return (
                           <li className="list-item">
                              <div className="list-name">{item.name}</div>
                              <div>
                                 <div className="list-setDefault">
                                    {/* <button>setAsDefault</button> */}
                                 </div>
                                 <div className="list-deleteList">
                                    <button onClick={() => {handleDelete(item.id)}}>deleteList</button>
                                 </div>
                              </div>
                           </li>
                        )
                     })
                  }   
                  </ol>               
               </div>
               <div>
                  <div>
                     <input type="text" placeholder="add new list" value={addInputVal} onChange={e => setAddInputVal(e.target.value)}/>
                     <button type="submit" onClick={handleAddList}>+</button>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default List