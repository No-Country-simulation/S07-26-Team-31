package com.physaflow.calculator.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender javaMailSender;

    @Value("${mail.from}")
    private String from;

    @Value("${frontend.baseUrl}")
    private String frontendBaseUrl;

    public void sendCalculationEmail(String to, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setFrom(from);
        message.setSubject("Tu diagnóstico de PhysaFlow está listo");
        message.setText(
                """
                Hola,
         
                Tu diagnóstico técnico en PhysaFlow ya se encuentra procesado y disponible.
         
                Podés acceder a los resultados ingresando al siguiente enlace:
                %s/result?token=%s
         
                ¡Saludos!
                El equipo de PhysaFlow
                """.formatted(frontendBaseUrl, token)
        );
        javaMailSender.send(message);
    }
}
