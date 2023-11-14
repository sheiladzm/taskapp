package com.demo.taskappbackend.repository;

import com.demo.taskappbackend.model.Status;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusRepository extends JpaRepository<Status, Long> {

}
