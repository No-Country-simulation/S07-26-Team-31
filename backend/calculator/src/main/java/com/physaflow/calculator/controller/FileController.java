package com.physaflow.calculator.controller;

import com.physaflow.calculator.dto.SafeFileName;
import com.physaflow.calculator.service.PdfService;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;

@RestController
@RequestMapping("/api/pdf")
@RequiredArgsConstructor
public class FileController {

    private final PdfService pdfService;

    @GetMapping("/descargar/{nombreArchivo}")
    public ResponseEntity<Resource> descargarPdf(
            @PathVariable @NotBlank @SafeFileName String nombreArchivo
    ) {
        File archivo = pdfService.obtenerArchivo(nombreArchivo);
        Resource recurso = new FileSystemResource(archivo);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + archivo.getName() + "\"")
                .body(recurso);
    }
}