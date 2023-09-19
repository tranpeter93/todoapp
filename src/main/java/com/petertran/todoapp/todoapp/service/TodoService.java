package com.petertran.todoapp.todoapp.service;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.petertran.todoapp.todoapp.data.TodoEntity;
import com.petertran.todoapp.todoapp.data.TodoListEntity;
import com.petertran.todoapp.todoapp.repository.TodoListRepository;
import com.petertran.todoapp.todoapp.repository.TodoRepository;
import com.petertran.todoapp.todoapp.util.DateUtils;
import com.petertran.todoapp.todoapp.web.model.Todo;
import com.petertran.todoapp.todoapp.web.model.TodoList;

@Service
public class TodoService {
   private final TodoRepository todoRepository;
   private final TodoListRepository todoListRepository;

   public TodoService(TodoRepository todoRepository, TodoListRepository todoListRepository) {
      this.todoRepository = todoRepository;
      this.todoListRepository = todoListRepository;
   }

   public List<Todo> getAllTodo() {
      List<Todo> todos = new ArrayList<Todo>();
      Iterable<TodoEntity> todoEntities = this.todoRepository.findAll();
      
      todoEntities.forEach( todo -> {
         todos.add( this.translateDbToWeb(todo));
      });


      todos.sort( new Comparator<Todo>() {

         @Override
         public int compare(Todo t1, Todo t2) {
            return t1.getPosition() >= t2.getPosition() ? 1 : 0;
         };
      });

      return todos;
   }

   public List<Todo> getAllTodosByListId( long listId ) {
      List<Todo> todos = new ArrayList<Todo>();
      Iterable<TodoEntity> todoEntities = this.todoRepository.findByListId(listId);

      todoEntities.forEach(todo -> todos.add(this.translateDbToWeb(todo)));

      return todos;
   }

   public List<Todo> getAllTodoByCompletion( boolean completion ) {
      List<Todo> todos = new ArrayList<Todo>();
      
      Iterable<TodoEntity> todoEntities = this.todoRepository.findByIsCompleted( completion );

      todoEntities.forEach( todo -> todos.add(this.translateDbToWeb(todo)) );

      return todos;
   }


   public Todo getTodoById(long id) {
      Optional<TodoEntity> optional = this.todoRepository.findById(id);
      if ( optional.isEmpty() ) {
         throw new RuntimeException("id does not exist");
      }

      return this.translateDbToWeb( optional.get() );
   }

   public Todo createOrUpdateTodo(Todo todo) {
      TodoEntity entity = this.translateWebToDb(todo);
      entity = this.todoRepository.save(entity);
      return this.translateDbToWeb(entity);
   }

   public void deleteTodo(long id) {
      this.todoRepository.deleteById(id);
   }

   public List<Todo> createOrUpdateTodoList(List<Todo> list) {
      List<Todo> updatedList = new ArrayList<Todo>();
      for ( Todo todo : list ) {
         Todo updated = createOrUpdateTodo(todo);
         updatedList.add(updated);
      }

      return updatedList;
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


   // Utility
   private TodoEntity translateWebToDb(Todo todo) {
      TodoEntity entity = new TodoEntity();
      Date date = todo.getDate();

      entity.setId( todo.getId() );
      entity.setName( todo.getName() );
      entity.setDescription( todo.getDescription() );
      entity.setCompleted( todo.isCompleted() );
      entity.setDate( DateUtils.createDateFromDateString( date != null ? date.toString() : null ));
      entity.setPosition( todo.getPosition() );
      entity.setListId(todo.getListId());

      return entity;
   }

   private Todo translateDbToWeb(TodoEntity entity) {
      Date dateSql = new Date( entity.getDate().getTime() );
      return new Todo( 
            entity.getId(), 
            entity.getName(), 
            entity.getDescription(), 
            entity.isCompleted(), 
            dateSql, 
            entity.getPosition(),
            entity.getListId() 
         );
   }

   private TodoListEntity translateWebToDb(TodoList list) {
      TodoListEntity entity = new TodoListEntity();
      
      entity.setId( list.getId() );
      entity.setName( list.getName() );

      return entity;
   }

   private TodoList translateDbToWeb(TodoListEntity entity) {
      return new TodoList(entity.getId(), entity.getName());
   }
}
