package com.petertran.todoapp.todoapp.data;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="TODO_LIST")
public class TodoListEntity {
   
   @Id
   @Column(name="LIST_ID")
   @GeneratedValue( strategy = GenerationType.IDENTITY ) 
   private Long listId;
   
   @Column(name="NAME")
   private String name;

}
