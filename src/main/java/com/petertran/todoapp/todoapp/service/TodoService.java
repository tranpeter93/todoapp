package com.petertran.todoapp.todoapp.service;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.petertran.todoapp.todoapp.data.TodoEntity;
import com.petertran.todoapp.todoapp.repository.TodoRepository;
import com.petertran.todoapp.todoapp.util.DateUtils;
import com.petertran.todoapp.todoapp.web.model.Todo;

@Service
public class TodoService {
   private final TodoRepository todoRepository;

   public TodoService(TodoRepository todoRepository) {
      this.todoRepository = todoRepository;
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

   public List<Todo> getTodosByListId( Long listId ) {
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
      // entity.setListEntity(todo.getListId());

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
            entity.getPosition()
            // entity.getListEntity() 
         );
   }
}
