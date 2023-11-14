package com.demo.taskappbackend.service;

import com.demo.taskappbackend.exception.TaskNotFoundException;
import com.demo.taskappbackend.exception.TaskUpdateException;
import com.demo.taskappbackend.model.Status;
import com.demo.taskappbackend.model.Task;
import com.demo.taskappbackend.repository.TaskRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.ZonedDateTime;
import java.util.Optional;

@Service
public class TaskService {
    @PersistenceContext
    private EntityManager entityManager;
    private final TaskRepository taskRepository;
    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    private void checkTaskExistence(Long id) {
        if (!taskRepository.existsById(id)) {
            logger.error("Cannot find the task with id: " + id);
            throw new TaskNotFoundException("The task with id " + id + " cannot be found.");
        }
    }

    public Optional<Task> getTaskById(Long id) {
        checkTaskExistence(id);
        return taskRepository.findById(id);
    }

    public Page<Task> getPaginatedTasks(Pageable pageRequest) { return taskRepository.findAll(pageRequest); }

    private Optional<Task> getUpdatedTask(Long id, int rowsAffected) {
        if (rowsAffected > 0) {
            entityManager.clear();
            return getTaskById(id);
        } else {
            logger.error("Could not update the task with id: " + id);
            throw new TaskUpdateException("Failed to update the task with id: " + id);
        }
    }

    public Optional<Task> createTask(Task task) {
        Task savedTask = taskRepository.save(task);
        return Optional.of(savedTask);
    }


    public void deleteTask(Long id) {
        checkTaskExistence(id);
        taskRepository.deleteById(id);
    }

    public Optional<Task> updateTaskTitle(Long id, String title) {
        checkTaskExistence(id);
        int rowsAffected = taskRepository.updateTaskTitle(id, title);
        return getUpdatedTask(id, rowsAffected);
    }

    public Optional<Task> updateTaskDescription(Long id, String description) {
        checkTaskExistence(id);
        int rowsAffected = taskRepository.updateTaskDescription(id, description);
        return getUpdatedTask(id, rowsAffected);
    }

    public Optional<Task> updateTaskDueDateTime(Long id, ZonedDateTime dueDateTime) {
        checkTaskExistence(id);
        int rowsAffected = taskRepository.updateTaskDueDateTime(id, dueDateTime);
        return getUpdatedTask(id, rowsAffected);
    }

    public Optional<Task> updateTaskStatus(Long id, Status status) {
        checkTaskExistence(id);
        int rowsAffected = taskRepository.updateTaskStatus(id, status);
        return getUpdatedTask(id, rowsAffected);
    }
}
