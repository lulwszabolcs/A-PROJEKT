package com.example.airport.converter;

import com.example.airport.enumeration.problem.ProblemType;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class ProblemTypeConverter implements Converter<String, ProblemType> {

    @Override
    public ProblemType convert(String source) {
        for (ProblemType problemType : ProblemType.values()) {
            if (problemType.getDescription().equals(source)) {
                return problemType;
            }
        }
        throw new IllegalArgumentException("Unknown problem type: " + source);
    }
}