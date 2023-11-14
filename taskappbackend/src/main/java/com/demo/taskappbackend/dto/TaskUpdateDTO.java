package com.demo.taskappbackend.dto;

import com.demo.taskappbackend.model.Status;
import java.time.ZonedDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TaskUpdateDTO {

    private String title;
    private String description;
    private ZonedDateTime dueDateTime;
    private Status status;
}
