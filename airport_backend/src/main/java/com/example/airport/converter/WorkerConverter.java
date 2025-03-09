package com.example.airport.converter;

import com.example.airport.dto.worker.WorkerList;
import com.example.airport.dto.worker.WorkerRead;
import com.example.airport.dto.worker.WorkerSave;
import com.example.airport.model.Worker;

import java.util.ArrayList;
import java.util.List;

public class WorkerConverter {

    public static WorkerRead convertModelToRead(Worker worker) {
        WorkerRead workerRead = new WorkerRead();
        workerRead.setWorkerId(worker.getWorkerId());
        workerRead.setName(worker.getName());
        workerRead.setTitle(worker.getTitle());
        workerRead.setPhoneNumber(worker.getPhoneNumber());
        workerRead.setEmail(worker.getEmail());
        workerRead.setWage(worker.getWage().toString());
        return workerRead;
    }

    public static Worker convertSaveToModel(WorkerSave workerSave) {
        Worker worker = new Worker();
        worker.setName(workerSave.getName());
        worker.setTitle(workerSave.getTitle());
        worker.setEmail(workerSave.getEmail());
        worker.setPhoneNumber(workerSave.getPhoneNumber());
        worker.setWage(workerSave.getWage());
        return worker;
    }

    public static WorkerList convertModelToList(Worker worker) {
        WorkerList list = new WorkerList();
        list.setWorkerId(worker.getWorkerId());
        list.setName(worker.getName());
        list.setTitle(worker.getTitle());
        list.setEmail(worker.getEmail());
        list.setPhoneNumber(worker.getPhoneNumber());
        list.setWage(worker.getWage());
        return list;
    }

    public static List<WorkerList> convertModelsToList(List<Worker> workers) {
        List<WorkerList> dtos = new ArrayList<>();
        for (Worker worker : workers) {
            dtos.add(convertModelToList(worker));
        }
        return dtos;
    }

    public static Worker convertSaveToModel(Integer id, WorkerSave workerSave) {
        Worker worker = new Worker();
        worker.setWorkerId(id);
        worker.setName(workerSave.getName());
        worker.setTitle(workerSave.getTitle());
        worker.setEmail(workerSave.getEmail());
        worker.setPhoneNumber(workerSave.getPhoneNumber());
        worker.setWage(workerSave.getWage());
        return worker;
    }
}
