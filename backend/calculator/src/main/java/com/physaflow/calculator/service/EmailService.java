package com.physaflow.calculator.service;

import com.sendgrid.*;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class EmailService {

    @Value("${sendgrid.api-key:}")
    private String apiKey;

    @Value("${mail.from}")
    private String from;

    @Value("${backend.baseUrl}")
    private String backendBaseUrl;

    public void sendCalculationEmail(String to, String token, String pdfFilename) {
        if (apiKey == null || apiKey.isBlank()) {
            log.warn("SendGrid API key no configurada. Email no enviado a: {}", to);
            return;
        }

        Email fromEmail = new Email(from);
        Email toEmail = new Email(to);
        String subject = "Tu diagnóstico de PhysaFlow está listo";
        String body = """
        <html>
        <body style="
            margin: 0;
            padding: 20px;
            font-family: Arial, Helvetica, sans-serif;
            color: #333333;
        ">

            <!-- LOGO -->
            <div style="text-align: center; margin-bottom: 30px;">
                <img
                    src="%s"
                    alt="PhysaFlow"
                    width="180"
                    style="display: inline-block; border: 0;"
                >
            </div>

            <p>Hola,</p>

            <p>
                Tu diagnóstico técnico en <strong>PhysaFlow</strong>
                ya se encuentra procesado y disponible.
            </p>

            <p>
                Podés acceder al cálculo obtenido ingresando al siguiente enlace:
            </p>

            <!-- BOTÓN DIAGNÓSTICO -->
            <div style="text-align: center; margin: 25px 0;">
                <a
                    href="%s"
                    style="
                        display: inline-block;
                        background-color: #2563eb;
                        color: #ffffff;
                        text-decoration: none;
                        padding: 12px 24px;
                        border-radius: 6px;
                        font-size: 15px;
                        font-weight: bold;
                    "
                >
                    Ver diagnóstico
                </a>
            </div>

            <p>
                También podés descargar el análisis completo en formato PDF:
            </p>

            <!-- BOTÓN PDF -->
            <div style="text-align: center; margin: 25px 0;">
                <a
                    href="%s"
                    style="
                        display: inline-block;
                        background-color: #10b981;
                        color: #ffffff;
                        text-decoration: none;
                        padding: 12px 24px;
                        border-radius: 6px;
                        font-size: 15px;
                        font-weight: bold;
                    "
                >
                    Descargar PDF
                </a>
            </div>

            <p>
                ¡Saludos!<br>
                El equipo de <strong>PhysaFlow</strong>
            </p>

        </body>
        </html>
        """.formatted(
                "https://raw.githubusercontent.com/No-Country-simulation/S07-26-Team-31/refs/heads/main/PhysaFlowCalculator/assets/images/logo.png",
                    backendBaseUrl + "/api/calculations/" + token,
                        backendBaseUrl + "/api/pdf/descargar/" + pdfFilename
                );

        Mail mail = new Mail(fromEmail, subject, toEmail, new Content("text/html", body));
        mail.setFrom(fromEmail);

        SendGrid sg = new SendGrid(apiKey);
        Request request = new Request();
        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            Response response = sg.api(request);
            log.info("Email enviado a {} - Status: {}", to, response.getStatusCode());
        } catch (Exception e) {
            log.error("Error al enviar email a {}: {}", to, e.getMessage());
        }
    }
}
