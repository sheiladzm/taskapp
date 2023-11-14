package com.demo.taskappbackend.repository;

import com.demo.taskappbackend.model.Status;
import com.demo.taskappbackend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import javax.transaction.Transactional;
import java.time.ZonedDateTime;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    @Modifying
    @Transactional
    @Query("UPDATE Task t SET t.title = :title where t.id = :id")
    int updateTaskTitle(@Param(value = "id") Long id, @Param(value = "title") String title);

    @Modifying
    @Transactional
    @Query("UPDATE Task t SET t.description = :description where t.id = :id")
    int updateTaskDescription(@Param(value = "id") Long id, @Param(value = "description") String description);

    @Modifying
    @Transactional
    @Query("UPDATE Task t SET t.dueDateTime = :dueDateTime where t.id = :id")
    int updateTaskDueDateTime(@Param(value = "id") Long id, @Param(value = "dueDateTime") ZonedDateTime dueDateTime);

    @Modifying
    @Transactional
    @Query("UPDATE Task t SET t.status = :status WHERE t.id = :id")
    int updateTaskStatus(@Param(value = "id") Long id, @Param(value = "status") Status status);
}
