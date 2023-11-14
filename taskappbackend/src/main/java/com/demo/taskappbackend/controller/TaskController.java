package com.demo.taskappbackend.controller;

import com.demo.taskappbackend.dto.TaskUpdateDTO;
import com.demo.taskappbackend.model.Task;
import com.demo.taskappbackend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import java.util.Optional;

@RestController
@RequestMapping("api/task")
@CrossOrigin
public class TaskController {
    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/create")
    public Optional<Task> create(@RequestBody Task task) {
        Optional<Task> createdTask = taskService.createTask(task);
        return createdTask;
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id) {
        taskService.deleteTask(id);
    }

    @ResponseStatus(HttpStatus.FOUND)
    @PatchMapping("/{id}/update")
    public Optional<Task> updateTask(@PathVariable Long id, @RequestBody TaskUpdateDTO taskUpdateDTO) {
        Optional<Task> updatedTask = Optional.empty();

        if (taskUpdateDTO.getTitle() != null) {
            updatedTask = taskService.updateTaskTitle(id, taskUpdateDTO.getTitle());
        }
        if (taskUpdateDTO.getDescription() != null) {
            updatedTask = taskService.updateTaskDescription(id, taskUpdateDTO.getDescription());
        }
        if (taskUpdateDTO.getDueDateTime() != null) {
            updatedTask = taskService.updateTaskDueDateTime(id, taskUpdateDTO.getDueDateTime());
        }
        if (taskUpdateDTO.getStatus() != null) {
            updatedTask = taskService.updateTaskStatus(id, taskUpdateDTO.getStatus());
        }
        return updatedTask;
    }

    @ResponseStatus(HttpStatus.FOUND)
    @GetMapping("/{id}")
    public Optional<Task> getTaskById(@PathVariable Long id) {
        return taskService.getTaskById(id);
    }

    @GetMapping("/list")
    public Page<Task> getPaginatedTasks(@PageableDefault(size = 25, sort = "dueDateTime",
            direction = Sort.Direction.ASC) Pageable pageRequest) {
        return taskService.getPaginatedTasks(pageRequest);
    }
}
