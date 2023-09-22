export const createTodo = async (todo) => {
   try {
      const save = await fetch(`/api/lists/${todo.listId}/todos`, {
         method: "POST",
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify( todo )
      })
      const data = await save.json()
      return data;
   }
   catch (error) {
      console.log(error)
   }
}

export const getTodosByList = async (listId) => {
   try {
      const res = await fetch(`/api/lists/${listId}/todos`)
      const items = await res.json();
      return items;
   }
   catch (error) {
      console.log( error )
      throw error
   }
}

export const getTodoById = async (listId, todoId) => {
   try {
      const res = await fetch(`/api/lists/${listId}/todos/${todoId}`)
      const items = await res.json();
      return items;
   }
   catch (error) {
      console.log( error )
      throw error
   }
}

export const updateTodo = async (id, todo) => {
   try {
      const save = await fetch(`/api/lists/${todo.listId}/todos/${id}`, {
         method: "PUT",
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify( todo )
      })
      const data = await save.json()
      return data;
   }
   catch(error) {
      console.log(error);
   }
}

export const deleteTodo = async (listId, id) => {
   try {
      const res = await fetch(`/api/lists/${listId}/todos/${id}`, {
         method: "DELETE"
      })

      console.log( res.ok )
   }
   catch(error) {
      console.log(error)
   }
}