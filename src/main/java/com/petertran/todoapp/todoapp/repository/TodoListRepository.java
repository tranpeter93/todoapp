package com.petertran.todoapp.todoapp.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.petertran.todoapp.todoapp.data.TodoListEntity;

@Repository
public interface TodoListRepository extends CrudRepository<TodoListEntity, Long> {
   
}
