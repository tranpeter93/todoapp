package com.petertran.todoapp.todoapp.web.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.petertran.todoapp.todoapp.service.TodoService;
import com.petertran.todoapp.todoapp.web.model.Todo;

@RestController
@RequestMapping("/api/todos")
public class TodoRestController {
   
   private TodoService todoService;

   public TodoRestController(TodoService todoService) {
      this.todoService = todoService;
   }

   @GetMapping
   public List<Todo> getAllTodoEntity(@RequestParam(name="completed", required = false) boolean completed) {

      List<Todo> result = null;


      if ( completed  ) {
         result = this.todoService.getAllTodoByCompletion(true);
      }
      else {
         result = this.todoService.getAllTodo();
      }

      return result;
   }

   @GetMapping("/{listId}")
   public List<Todo> getTodo(@PathVariable long listId) {
      return this.todoService.getAllTodosByListId(listId);
   }

   @PostMapping
   @ResponseStatus( HttpStatus.CREATED )
   public Todo createTodo(@RequestBody Todo todo ) {
      return this.todoService.createOrUpdateTodo(todo);
   }

   @PutMapping("/{id}")
   public Todo updateTodo( @PathVariable("id")long id, @RequestBody Todo todo ) {
      if ( id != todo.getId() ) {
         throw new RuntimeException("ids do not match");
      }

      return this.todoService.createOrUpdateTodo( todo );
   }

   @DeleteMapping("/{id}")
   public void deleteTodo(@PathVariable("id")long id) {
      this.todoService.deleteTodo(id);
   }

   @PutMapping("/reorder")
   public List<Todo> reorderTodo(@RequestBody List<Todo> list ) {
      return this.todoService.createOrUpdateTodoList(list);
   }
}
