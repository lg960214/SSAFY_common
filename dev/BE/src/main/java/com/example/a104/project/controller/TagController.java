package com.example.a104.project.controller;

import com.example.a104.project.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/tags")
@RestController
public class TagController {
    private final TagService tagService;

    @PostMapping
    public void Tagging(@RequestBody Map<String, String> map) {
        String deviceCode = map.get("device_code");
        String reader = map.get("reader");
        tagService.Tagging(deviceCode, reader);

    }
}
