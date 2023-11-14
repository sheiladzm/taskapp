package com.demo.taskappbackend.controller;

import com.demo.taskappbackend.model.Status;
import com.demo.taskappbackend.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/status")
@CrossOrigin
public class StatusController {
    private final StatusService statusService;

    @Autowired
    public StatusController(StatusService statusService) {
        this.statusService = statusService;
    }

    @ResponseStatus(HttpStatus.FOUND)
    @GetMapping("/{id}")
    public Optional<Status> getStatusById(@PathVariable Long id) {
        return statusService.getStatusById(id);
    }

    @GetMapping("/list")
    public List<Status> getAllStatuses() {
        return statusService.getAllStatuses();
    }
}
