package com.petertran.todoapp.todoapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.petertran.todoapp.todoapp.data.TodoEntity;
import com.petertran.todoapp.todoapp.data.TodoListEntity;

import java.util.List;
import java.sql.Date;


@Repository
public interface TodoRepository extends JpaRepository<TodoEntity, Long> {

   List<TodoEntity> findByDate(Date date);

   List<TodoEntity> findByIsCompleted(boolean completed);

   List<TodoEntity> findByListId(Long listId);
}
