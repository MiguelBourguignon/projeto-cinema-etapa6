package com.atividade.cinema.controller;

import com.atividade.cinema.model.Analise;
import com.atividade.cinema.service.AnaliseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/analises")
public class AnaliseController {

    @Autowired
    private AnaliseService service;

    @GetMapping
    public List<Analise> listar() {
        return service.listarTodas();
    }

    @PostMapping
    public ResponseEntity<Analise> criar(@RequestBody Analise analise) {
        // Dica: O JSON deve enviar o ID do filme
        Analise nova = service.criar(analise);
        return new ResponseEntity<>(nova, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Analise> atualizar(@PathVariable Long id, @RequestBody Analise analise) {
        Analise atualizada = service.atualizar(id, analise);
        if (atualizada != null) return ResponseEntity.ok(atualizada);
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }
}