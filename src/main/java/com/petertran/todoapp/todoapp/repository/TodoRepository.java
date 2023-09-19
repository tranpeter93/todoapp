package com.petertran.todoapp.todoapp.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.petertran.todoapp.todoapp.data.TodoEntity;
import java.util.List;
import java.sql.Date;


@Repository
public interface TodoRepository extends CrudRepository<TodoEntity, Long> {

   List<TodoEntity> findByDate(Date date);

   List<TodoEntity> findByIsCompleted(boolean completed);

   List<TodoEntity> findByListId(long listId);
}
