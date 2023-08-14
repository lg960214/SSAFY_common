package com.example.a104.project.util;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.ArrayList;
import java.util.List;

@Component
public class EmitterList {

    private final List<SseEmitter> emitters = new ArrayList<>();
    public List<SseEmitter> getEmitters(){
        return emitters;
    }

}
