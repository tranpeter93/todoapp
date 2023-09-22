export const createList = async (list) => {
   try {
      const save = await fetch(`/api/lists`, {
         method: "POST",
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify( list )
      })
      const data = await save.json()
      return data;
   }
   catch (error) {
      console.log(error)
   }
}

export const getLists = async () => {
   try {
      const result = await fetch(`/api/lists`)
      const data = await result.json();
      return data;
   }
   catch (error) {
      console.log(error)
   }
}

export const getListsById = async (id) => {
   try {
      const result = await fetch(`/api/lists/${id}`)
      const data = await result.json();
      return data;
   }
   catch (error) {
      console.log(error)
   }
}

export const updateList = async (list) => {
   try {
      const save = await fetch(`/api/lists/${list.listId}`, {
         method: "PUT",
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify( list )
      })
      const data = await save.json()
      return data;
   }
   catch(error) {
      console.log(error);
   }
}

export const deleteList = async (listId) => {
   try {
      const res = await fetch(`/api/lists/${listId}`, {
         method: "DELETE"
      })

      console.log( res.ok )
   }
   catch(error) {
      console.log(error)
   }
}

