package com.physaflow.calculator.exception;

public class PdfGenerationException extends RuntimeException {
    public PdfGenerationException(String mensaje, Throwable causa) {
        super(mensaje, causa);
    }
}