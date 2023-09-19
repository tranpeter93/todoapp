import React, {useState} from "react";

const localData = ['default', 'personal', 'chores', 'dailies', 'work', 'reminders']

function List() {

   const [list, setList] = useState(localData)
   const [addInputVal, setAddInputVal] = useState('')

   const handleAddList = () => {
      if ( !addInputVal || addInputVal.trim().length === 0 ) return;

      setList([...list, addInputVal ])
      setAddInputVal('')
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
                     list.map((name, idx) => {
                        return (
                           <li className="list-item">
                              <div className="list-name">{name}</div>
                              <div>
                                 <div className="list-setDefault">
                                    <button>setAsDefault</button>
                                 </div>
                                 <div className="list-deleteList">
                                    <button>deleteList</button>
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