package com.petertran.todoapp.todoapp.web.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.petertran.todoapp.todoapp.service.TodoService;
import com.petertran.todoapp.todoapp.web.model.TodoList;

@RestController
@RequestMapping("/api/lists")
public class TodoListRestController {
   
   private TodoService todoService;

   public TodoListRestController( TodoService todoService ) {
      this.todoService = todoService;
   }

   @GetMapping
   public List<TodoList> getTodoList() {
      return this.todoService.getAllList();
   }
}
