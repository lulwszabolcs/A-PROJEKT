package com.example.airport.service;

import com.example.airport.converter.ProblemConverter;
import com.example.airport.dto.problem.ProblemList;
import com.example.airport.dto.problem.ProblemPatch;
import com.example.airport.dto.problem.ProblemRead;
import com.example.airport.dto.problem.ProblemSave;
import com.example.airport.enumeration.problem.ProblemPatchKey;
import com.example.airport.enumeration.problem.ProblemStatus;
import com.example.airport.enumeration.problem.ProblemType;
import com.example.airport.enumeration.role.Role;
import com.example.airport.exception.ProblemNotFoundException;
import com.example.airport.exception.StatusNotFoundException;
import com.example.airport.model.Problem;
import com.example.airport.repository.ProblemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProblemService {

    @Autowired
    ProblemRepository repository;

    @Autowired
    private ProblemRepository problemRepository;


    public ProblemRead createProblem(ProblemSave problemSave) {
        Role role = switchRoleToSolveTheProblem(problemSave.getProblemType());
        Problem createingProblem = ProblemConverter.convertModelToSave(problemSave, role);
        Problem createdProblem = repository.save(createingProblem);
        return ProblemConverter.convertModelToRead(createdProblem);
    }

    public ProblemRead getProblem(int id) {
        throwExceptionIfProblemNotFound(id);
        return ProblemConverter.convertModelToRead(repository.findById(id).get());
    }

    public ProblemRead updateProblem(int id, ProblemSave problemSave) {
        throwExceptionIfProblemNotFound(id);
        Role role = switchRoleToSolveTheProblem(problemSave.getProblemType());
        return ProblemConverter.convertModelToRead(repository.save(ProblemConverter.convertModelToSave(id, problemSave, role)));
    }

    public List<ProblemList> listProblems() {
        List<Problem> problems = repository.findAll();
        return ProblemConverter.convertModelsToList(problems);
    }

    public ProblemRead deleteProblem(int id) {
        throwExceptionIfProblemNotFound(id);
        Problem problem = repository.getReferenceById(id);
        repository.deleteById(id);
        return ProblemConverter.convertModelToRead(problem);
    }

    private Role switchRoleToSolveTheProblem(ProblemType problemType) {
        Role requiredRole;
        switch (problemType) {
            case VEHICLE_FAILURE:
                requiredRole = Role.MAINTENANCE_TECHNICIAN;
                break;
            case EQUIPMENT_FAILURE:
                requiredRole = Role.MAINTENANCE_TECHNICIAN;
                break;
            case FUEL_LEAK:
                requiredRole = Role.REFUELING_OPERATOR;
                break;
            case COMMUNICATION_BREAKDOWN:
                requiredRole = Role.AIR_TRAFFIC_CONTROLLER;
                break;
            case NAVIGATION_ERROR:
                requiredRole = Role.NAVIGATION_SYSTEM_TECHNICIAN;
                break;
            case POWER_OUTAGE:
                requiredRole = Role.MAINTENANCE_TECHNICIAN;
                break;
            case RUNWAY_OBSTRUCTION:
                requiredRole = Role.GROUND_CONTROL_OPERATOR;
                break;
            case WEATHER_DISRUPTION:
                requiredRole = Role.GROUND_CONTROL_OPERATOR;
                break;
            case AIR_TRAFFIC_CONTROL_ERROR:
                requiredRole = Role.AIR_TRAFFIC_CONTROLLER;
                break;
            case FUEL_SUPPLY_PROBLEM:
                requiredRole = Role.REFUELING_OPERATOR;
                break;
            case SYSTEM_FAILURE:
                requiredRole = Role.MAINTENANCE_TECHNICIAN;
                break;
            case BAGGAGE_MISPLACEMENT:
                requiredRole = Role.BAGGAGE_HANDLER;
                break;
            case CUSTOMS_DELAY:
                requiredRole = Role.SECURITY_SCREENING_OFFICER;
                break;
            case LIGHTING_FAILURE:
                requiredRole = Role.MAINTENANCE_TECHNICIAN;
                break;
            case CHECK_IN_ERROR:
                requiredRole = Role.CHECK_IN_AGENT;
                break;
            case BOARDING_DELAY:
                requiredRole = Role.GATE_AGENT;
                break;
            case DEICING_PROBLEM:
                requiredRole = Role.MAINTENANCE_TECHNICIAN;
                break;
            case FUEL_TRUCK_DELAY:
                requiredRole = Role.REFUELING_OPERATOR;
                break;
            case FIRE_ALARM:
                requiredRole = Role.FIREFIGHTER;
                break;
            case LAVATORY_MALFUNCTION:
                requiredRole = Role.MAINTENANCE_TECHNICIAN;
                break;
            case TICKETING_ERROR:
                requiredRole = Role.CUSTOMER_SERVICE_AGENT;
                break;
            case SECURITY_SYSTEM_FAILURE:
                requiredRole = Role.SECURITY_SCREENING_OFFICER;
                break;
            case LOST_CHILD:
                requiredRole = Role.AIRPORT_SECURITY_GUARD;
                break;
            case MEDICAL_EMERGENCY:
                requiredRole = Role.AIRPORT_SECURITY_GUARD;
                break;
            case RUNWAY_CRACK:
                requiredRole = Role.MAINTENANCE_TECHNICIAN;
                break;
            case SNOW_CLEARANCE_ISSUE:
                requiredRole = Role.MAINTENANCE_TECHNICIAN;
                break;
            case BIRD_STRIKE:
                requiredRole = Role.GROUND_CONTROL_OPERATOR;
                break;
            case HEATING_FAILURE:
                requiredRole = Role.MAINTENANCE_TECHNICIAN;
                break;
            case COOLING_FAILURE:
                requiredRole = Role.MAINTENANCE_TECHNICIAN;
                break;
            case RADIO_FAILURE:
                requiredRole = Role.NAVIGATION_SYSTEM_TECHNICIAN;
                break;
            case UNAUTHORIZED_PERSONNEL:
                requiredRole = Role.SECURITY_SCREENING_OFFICER;
                break;
            case RUNWAY_OVERRUN:
                requiredRole = Role.GROUND_CONTROL_OPERATOR;
                break;
            case PARKING_SHORTAGE:
                requiredRole = Role.LOGISTICS_COORDINATOR;
                break;
            case CARGO_SECURITY_BREACH:
                requiredRole = Role.AIRPORT_SECURITY_GUARD;
                break;
            case BAGGAGE_SCREENING_ERROR:
                requiredRole = Role.BAGGAGE_HANDLER;
                break;
            case EMERGENCY_EXIT_PROBLEM:
                requiredRole = Role.SECURITY_SCREENING_OFFICER;
                break;
            default:
                requiredRole = Role.MAINTENANCE_TECHNICIAN;
                break;
        }
        return requiredRole;
    }

    public ProblemRead modifyProblem(int id, ProblemPatch problemPatch) {
        throwExceptionIfProblemNotFound(id);

        Problem problem = problemRepository.getReferenceById(id);

        if (problemPatch.getKey() == ProblemPatchKey.STATUS) {
            try {
                ProblemStatus newStatus = ProblemStatus.valueOf(problemPatch.getValue().toUpperCase());
                problem.setStatus(newStatus);
            } catch (IllegalArgumentException e) {
                throw new StatusNotFoundException();
            }
        } else {
            throw new IllegalArgumentException();
        }

        Problem modifiedProblem = problemRepository.save(problem);
        return ProblemConverter.convertModelToRead(modifiedProblem);
    }

    private void throwExceptionIfProblemNotFound(int id) {
        if (!problemRepository.existsById(id)){
            throw new ProblemNotFoundException();
        }
    }

    public List<ProblemList> listProblemsByType(ProblemType problemType) {
        List<Problem> problems = problemRepository.findByProblemType(problemType);
        if (problems.isEmpty()){
            throw new ProblemNotFoundException();
        }
        return ProblemConverter.convertModelsToList(problems);
    }
}


