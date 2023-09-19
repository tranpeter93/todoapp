package com.petertran.todoapp.todoapp.data;

import java.time.Duration;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="TODO")
public class TodoEntity {
   
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY )
   @Column(name="TODO_ID")
   private long id;

   @Column(name="NAME")
   private String name;

   @Column(name="DESCRIPTION")
   private String description;

   @Column(name="COMPLETED")
   private boolean isCompleted;

   @Column(name="DATE")
   private Date date;

   @Column(name="POSITION")
   private int position;

   @Column(name="LIST_ID")
   private long listId;

   // @Column(name="DURATION")
   // private Duration duration;
}
