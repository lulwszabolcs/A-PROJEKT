package com.example.airport.service;

import com.example.airport.converter.WorkerConverter;
import com.example.airport.dto.worker.WorkerList;
import com.example.airport.dto.worker.WorkerRead;
import com.example.airport.dto.worker.WorkerSave;
import com.example.airport.exception.WorkerNotFoundException;
import com.example.airport.model.Worker;
import com.example.airport.repository.WorkerRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkerService {

    @Autowired
    private WorkerRepository repository;

    public WorkerRead readWorker(int id) {
        if (!repository.existsById(id)) {
            throw new WorkerNotFoundException();
        }
        Worker worker = repository.getReferenceById(id);
        return WorkerConverter.convertModelToRead(worker);
    }

    public List<WorkerList> listWorkers() {
        List<Worker> workers = repository.findAll();
        return WorkerConverter.convertModelsToList(workers);
    }

    public WorkerRead createWorker(@Valid WorkerSave workerSave) {
        Worker worker = repository.save(WorkerConverter.convertSaveToModel(workerSave));
        return WorkerConverter.convertModelToRead(worker);
    }

    public WorkerRead updateWorker(int id, WorkerSave workerSave) {
        if (!repository.existsById(id)) {
            throw new WorkerNotFoundException();
        }
        return WorkerConverter.convertModelToRead(repository.save(WorkerConverter.convertSaveToModel(id, workerSave)));
    }

    public WorkerRead deleteWorker(int id) {
        if (!repository.existsById(id)) {
            throw new WorkerNotFoundException();
        }
        Worker worker = repository.getReferenceById(id);
        repository.delete(worker);
        return WorkerConverter.convertModelToRead(worker);
    }
}
