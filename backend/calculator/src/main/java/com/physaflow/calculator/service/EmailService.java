package com.physaflow.calculator.service;

import com.sendgrid.*;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Slf4j
@Service
public class EmailService {

    @Value("${sendgrid.api-key:}")
    private String apiKey;

    @Value("${mail.from}")
    private String from;

    @Value("${frontend.baseUrl}")
    private String frontendBaseUrl;

    public void sendCalculationEmail(String to, String token) {
        if (apiKey == null || apiKey.isBlank()) {
            log.warn("SendGrid API key no configurada. Email no enviado a: {}", to);
            return;
        }

        Email fromEmail = new Email(from);
        Email toEmail = new Email(to);
        String subject = "Tu diagnóstico de PhysaFlow está listo";
        String body = """
                Hola,

                Tu diagnóstico técnico en PhysaFlow ya se encuentra procesado y disponible.

                Podés acceder a los resultados ingresando al siguiente enlace:
                %s/result?token=%s

                ¡Saludos!
                El equipo de PhysaFlow
                """.formatted(frontendBaseUrl, token);

        Mail mail = new Mail(fromEmail, subject, toEmail, new Content("text/plain", body));
        mail.setFrom(fromEmail);

        SendGrid sg = new SendGrid(apiKey);
        Request request = new Request();
        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            Response response = sg.api(request);
            log.info("Email enviado a {} - Status: {}", to, response.getStatusCode());
        } catch (IOException e) {
            log.error("Error al enviar email a {}: {}", to, e.getMessage());
        }
    }
}
