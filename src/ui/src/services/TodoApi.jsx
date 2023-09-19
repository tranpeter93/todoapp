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

export const createTodo = async (todo) => {
   try {
      const save = await fetch(`/api/todos`, {
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

export const deleteTodo = async (id) => {
   try {
      const res = await fetch(`/api/todos/${id}`, {
         method: "DELETE"
      })

      console.log( res.ok )
   }
   catch(error) {
      console.log(error)
   }
}

export const updateTodo = async (id, todo) => {
   try {
      const save = await fetch(`/api/todos/${id}`, {
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

export const getAllTodos = async () => {
   try {
      const res = await fetch('/api/todos')
      const items = await res.json();
      return items;
   }
   catch (error) {
      console.log( error )
      throw error
   }
}

export const getTodosByList = async (listId) => {
   try {
      const res = await fetch(`/api/todos/${listId}`)
      const items = await res.json();
      return items;
   }
   catch (error) {
      console.log( error )
      throw error
   }
}

export const reorderedTodos = async ( todos ) => {
   try {
      const res = await fetch('/api/todos/reorder', {
         method: "PUT",
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify( Array.from(todos) )
      })
      const items = await res.json()
      return items;
   }
   catch (error) {
      console.log( error )
      throw error
   }
}