package com.petertran.todoapp.todoapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.petertran.todoapp.todoapp.data.TodoListEntity;

@Repository
public interface TodoListRepository extends JpaRepository<TodoListEntity, Long> {
   
}
