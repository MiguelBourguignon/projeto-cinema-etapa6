package com.atividade.cinema.controller;

import com.atividade.cinema.model.Filme;
import com.atividade.cinema.service.FilmeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/filmes")
public class FilmeController {

    @Autowired
    private FilmeService service;

    @GetMapping
    public List<Filme> listar() {
        return service.listarTodos();
    }

    @PostMapping
    public ResponseEntity<Filme> criar(@RequestBody Filme filme) {
        Filme novo = service.criar(filme);
        return new ResponseEntity<>(novo, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Filme> atualizar(@PathVariable Long id, @RequestBody Filme filme) {
        Filme atualizado = service.atualizar(id, filme);
        if (atualizado != null) return ResponseEntity.ok(atualizado);
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }
}