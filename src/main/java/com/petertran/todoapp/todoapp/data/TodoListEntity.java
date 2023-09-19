package com.petertran.todoapp.todoapp.data;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="TODO_LIST")
public class TodoListEntity {
   
   @Id
   @Column(name="ID")
   @GeneratedValue( strategy = GenerationType.IDENTITY ) 
   private long id;
   
   @Column(name="NAME")
   private String name;
}
