package com.example.transportation.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class NotFoundException extends RuntimeException {
    public NotFoundException(){super("entity not found");}
    public NotFoundException(String message){super(message);}
    public NotFoundException(String entityName,long id){
        super("%s with id %d not found".formatted(entityName,id));
    }
}
