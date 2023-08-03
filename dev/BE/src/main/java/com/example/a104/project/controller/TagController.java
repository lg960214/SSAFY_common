package com.example.a104.project.controller;

import com.example.a104.project.dto.RealTimeDto;
import com.example.a104.project.entity.ReaderVo;
import com.example.a104.project.repository.ReaderRepository;
import com.example.a104.project.service.AdminService;
import com.example.a104.project.service.TagService;
import com.example.a104.project.util.JwtTokenProvider;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/tags")
@RestController
public class TagController {
    private final TagService tagService;
    private final AdminService adminService;
    private final ReaderRepository readerRepository;

    private List<SseEmitter> emitters = new ArrayList<>();
    @GetMapping(value = "sse",produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SseEmitter> sse(@RequestHeader(value = "Authorization") String token, @RequestParam String region) throws IOException {
        SseEmitter emitter = new SseEmitter(1800000l);
        emitters.add(emitter);

//        emitter.onCompletion(()-> );
//        emitter.onTimeout(() -> );
        Claims claims = JwtTokenProvider.parseJwtToken(token);
        int gymCode = adminService.getGymCode((String) claims.get("sub"));

        List<RealTimeDto> list = adminService.realTimeDtoList(region,gymCode);

        emitter.send(list,MediaType.APPLICATION_JSON);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_EVENT_STREAM_VALUE)
                .body(emitter);
    }

    @PostMapping
    public void Tagging(@RequestBody Map<String, String> map) {
        String deviceCode = map.get("device_code");
        String reader = map.get("reader");
        tagService.Tagging(deviceCode, reader);
        ReaderVo readerVo = readerRepository.findByReader(reader);
        String region = readerVo.getRegion();
        int gymCode = readerVo.getGymCode();

        List<RealTimeDto> list = adminService.realTimeDtoList(region,gymCode);
        for(SseEmitter emitter: emitters){
            try{
                emitter.send(list,MediaType.APPLICATION_JSON);
            }
            catch (Exception e){

            }
        }

    }
}
