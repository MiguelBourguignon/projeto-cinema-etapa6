package com.atividade.cinema;

import com.atividade.cinema.service.FilmeService;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

public class FilmeServiceTest {

    @Test
    public void testDuracaoValida() {
        FilmeService service = new FilmeService();
        // Testando um valor correto (120 minutos)
        assertTrue(service.verificarDuracaoValida(120));
    }

    @Test
    public void testDuracaoInvalidaNegativa() {
        FilmeService service = new FilmeService();
        // Testando um valor impossível (-10 minutos)
        assertFalse(service.verificarDuracaoValida(-10));
    }
}