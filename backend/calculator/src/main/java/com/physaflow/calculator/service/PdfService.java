package com.physaflow.calculator.service;

import com.lowagie.text.DocumentException;
import com.lowagie.text.Font;
import com.lowagie.text.Document;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.physaflow.calculator.dto.ComparisonResponse;
import com.physaflow.calculator.exception.PdfGenerationException;
import com.physaflow.calculator.exception.ResourceNotFoundException;
import com.physaflow.calculator.model.Calculo;
import com.physaflow.calculator.model.CalculoOptimizado;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Service
public class PdfService {
    private final Path directorioDestino;

    public PdfService(@Value("${file.download_dir}") String directorioDestino) {
        this.directorioDestino = Paths.get(directorioDestino).toAbsolutePath().normalize();
    }

    @PostConstruct
    public void init() throws IOException {
        Files.createDirectories(directorioDestino);
    }

    public String generarPdf(Calculo calculo, CalculoOptimizado calculoOptimizado, ComparisonResponse comparacion) {
        String uuid = UUID.randomUUID().toString();
        String nombreCompleto = uuid + ".pdf";

        Path rutaArchivo = directorioDestino.resolve(nombreCompleto).normalize();
        try (FileOutputStream fos = new FileOutputStream(rutaArchivo.toFile())) {
            Document documento = new Document();
            PdfWriter.getInstance(documento, fos);
            documento.open();

            agregarTitulo(documento);
            agregarInformacionGeneral(documento,calculo);
            agregarEscenario(
                    documento,
                    "Escenario actual",
                    calculo.getCapacidadInstalacionMw(),
                    calculo.getPorcentajeUtilizacion(),
                    calculo.getTipoEnfriamiento(),
                    calculo.getPue(),
                    calculo.getCapacidadDesperdiciadaMw(),
                    calculo.getEstadoSalud()
            );
            agregarEscenario(
                    documento,
                    "Escenario optimizado",
                    calculoOptimizado.getCapacidadInstalacionMw(),
                    calculoOptimizado.getPorcentajeUtilizacion(),
                    calculoOptimizado.getTipoEnfriamiento(),
                    calculoOptimizado.getPue(),
                    calculoOptimizado.getCapacidadDesperdiciadaMw(),
                    calculoOptimizado.getEstadoSalud()
            );
            agregarResumen(documento,comparacion);

            documento.close();

            return nombreCompleto;
        } catch (Exception e) {
            throw new PdfGenerationException("Error interno al procesar y almacenar el archivo PDF", e);
        }
    }

    private void agregarTitulo(Document documento) throws DocumentException {
        Font tituloFont = new Font(Font.HELVETICA,20, Font.BOLD);

        Paragraph titulo = new Paragraph("Análisis de Eficiencia del Data Center", tituloFont);
        documento.add(new Paragraph(" "));
        titulo.setAlignment(Paragraph.ALIGN_CENTER);

        documento.add(titulo);
        documento.add(new Paragraph("Análisis comparativo entre escenario actual y escenario optimizado"));
        documento.add(new Paragraph(" "));
    }

    private void agregarInformacionGeneral(Document documento, Calculo calculo) throws DocumentException {
        Font subtitulo = new Font(Font.HELVETICA,14, Font.BOLD);
        DateTimeFormatter formateador = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss")
                .withZone(ZoneId.systemDefault());

        documento.add(new Paragraph("Información general", subtitulo));
        documento.add(new Paragraph("Capacidad de instalación: " + calculo.getCapacidadInstalacionMw() + " MW"));
        documento.add(new Paragraph("Fecha de análisis: " + formateador.format(calculo.getCreadoEn())));
        documento.add(new Paragraph(" "));
    }

    private void agregarEscenario(
            Document documento,
            String titulo,
            double capacidad,
            double utilizacion,
            String tipoEnfriamiento,
            double pue,
            double capacidadDesperdiciada,
            String estado
    ) throws DocumentException {
        Font subtitulo = new Font(Font.HELVETICA,14, Font.BOLD);

        documento.add(new Paragraph(titulo, subtitulo));
        documento.add(new Paragraph(" "));
        PdfPTable tabla = new PdfPTable(2);
        tabla.setWidthPercentage(100);

        agregarParametro(tabla, "Capacidad", capacidad + " MW");
        agregarParametro(tabla, "Utilización", utilizacion + "%");
        agregarParametro(tabla, "Enfriamiento", tipoEnfriamiento);
        agregarParametro(tabla, "PUE", formatear(pue));
        agregarParametro(tabla,"Capacidad desperdiciada", formatear(capacidadDesperdiciada) + " MW");
        agregarParametro(tabla, "Estado", estado);

        documento.add(tabla);
        documento.add(new Paragraph(" "));
    }

    private void agregarParametro(PdfPTable tabla, String nombre, String valor) {
        tabla.addCell(nombre);
        tabla.addCell(valor);
    }

    private String formatear(double valor) {
        return String.format("%.2f", valor);
    }

    private void agregarResumen(Document documento, ComparisonResponse comparacion) throws DocumentException {
        Font subtitulo = new Font(Font.HELVETICA,14, Font.BOLD);

        documento.add(new Paragraph("Resumen de optimización", subtitulo));
        documento.add(new Paragraph("Ahorro anual estimado: " + formatear(comparacion.getAhorroAnualMaximo() - comparacion.getAhorroAnualMinimo()) ));
        documento.add(new Paragraph("Reducción de capacidad desperdiciada: " + formatear(comparacion.getReduccionCapacidadDesperdiciadaMw()) + " MW"));
        documento.add(new Paragraph("Mejora del PUE: " + formatear(comparacion.getMejoraPue())));
        documento.add(new Paragraph("Reducción del costo de carbono: " + formatear(comparacion.getReduccionCostoCarbono())));
        documento.add(new Paragraph("Estado de salud: "+ comparacion.getMejoraEstadoSalud()));
    }


    public File obtenerArchivo(String nombreArchivo) {
        Path rutaArchivo = directorioDestino.resolve(nombreArchivo).toAbsolutePath().normalize();
        if (!rutaArchivo.startsWith(directorioDestino)) {
            throw new IllegalArgumentException("Acceso denegado");
        }

        File archivo = rutaArchivo.toFile();
        if (!archivo.exists() || !archivo.isFile()) {
            throw new ResourceNotFoundException("El archivo solicitado no existe en el servidor");
        }

        return archivo;
    }
}