package com.physaflow.calculator.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/calculate")
@RequiredArgsConstructor
public class MainController {

    @GetMapping("/hello")
    public ResponseEntity<String> getWelcomeMessage() {

        log.info("Endpoint /hello invocado con éxito.");

        return ResponseEntity.ok("Endpoint /hello invocado con éxito.");
    }
}