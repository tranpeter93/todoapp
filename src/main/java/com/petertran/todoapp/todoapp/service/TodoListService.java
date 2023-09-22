package com.petertran.todoapp.todoapp.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.petertran.todoapp.todoapp.data.TodoListEntity;
import com.petertran.todoapp.todoapp.repository.TodoListRepository;
import com.petertran.todoapp.todoapp.web.model.TodoList;

@Service
public class TodoListService {
   private final TodoListRepository todoListRepository;

   public TodoListService( TodoListRepository todoListRepository ) {
      this.todoListRepository = todoListRepository;
   }

   // LIST
   public List<TodoList> getAllList() {
      List<TodoList> result = new ArrayList<TodoList>();
      Iterable<TodoListEntity> entities = this.todoListRepository.findAll(); 

      entities.forEach( list -> {
         result.add( this.translateDbToWeb(list) );
      });

      return result;
   }

   public TodoList getListById(long listId) {
      Optional<TodoListEntity> result = this.todoListRepository.findById(listId);
      if ( result.isEmpty() ) {
         return null;
      }

      return this.translateDbToWeb( result.get() );
   }

   public TodoList createOrUpdateList(TodoList list) {

      TodoList res = this.translateDbToWeb( this.todoListRepository.save( this.translateWebToDb(list) ) );

      return res;
   }

   public void deleteList(long listId) {
      this.todoListRepository.deleteById(listId);
   }

   private TodoListEntity translateWebToDb(TodoList list) {
      TodoListEntity entity = new TodoListEntity();
      
      entity.setListId( list.getId() );
      entity.setName( list.getName() );

      return entity;
   }

   private TodoList translateDbToWeb(TodoListEntity entity) {
      return new TodoList(entity.getListId(), entity.getName());
   }

   
}
