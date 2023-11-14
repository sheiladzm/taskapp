package com.demo.taskappbackend.service;

import com.demo.taskappbackend.exception.StatusNotFoundException;
import com.demo.taskappbackend.model.Status;
import com.demo.taskappbackend.repository.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class StatusService {
    private final StatusRepository statusRepository;

    @Autowired
    public StatusService(StatusRepository statusRepository) {
        this.statusRepository = statusRepository;
    }

    private void checkStatusExistence(Long id) {
        if (!statusRepository.existsById(id)) {
            throw new StatusNotFoundException("The status with id " + id + " cannot be found.");
        }
    }

    public Optional<Status> getStatusById(Long id) {
        checkStatusExistence(id);
        return statusRepository.findById(id); }

    public List<Status> getAllStatuses() { return statusRepository.findAll(); }
}
