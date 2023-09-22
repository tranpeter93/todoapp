package com.petertran.todoapp.todoapp.web.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.petertran.todoapp.todoapp.service.TodoListService;
import com.petertran.todoapp.todoapp.web.model.TodoList;

@RestController
@RequestMapping("/api/lists")
public class TodoListRestController {
   
   private TodoListService todoListService;

   public TodoListRestController( TodoListService todoListService ) {
      this.todoListService = todoListService;
   }

   @GetMapping
   public List<TodoList> getTodoList() {
      return this.todoListService.getAllList();
   }

   @GetMapping("/{listId}")
   public TodoList getTodo(@PathVariable long listId) {
      return this.todoListService.getListById(listId);
   }

   @PostMapping
   @ResponseStatus(HttpStatus.CREATED)
   public TodoList createTodoList(@RequestBody TodoList list) {
      return this.todoListService.createOrUpdateList(list);
   }

   @DeleteMapping("/{listId}")
   public void deleteList(@PathVariable long listId) {
      this.todoListService.deleteList(listId);
   }

   @PutMapping("/{listId}")
   public TodoList updateList(@PathVariable long listId, @RequestBody TodoList list) {
      if ( listId != list.getId() ) {
         throw new RuntimeException("ids do not match");
      }

      return this.todoListService.createOrUpdateList(list);
   }
}
