package com.petertran.todoapp.todoapp.web.model;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@ToString
public class Todo {
   
   private long id;
   private String name;
   private String description;
   private boolean isCompleted;
   private Date date;   
   private int position;
   private long listId;
}
