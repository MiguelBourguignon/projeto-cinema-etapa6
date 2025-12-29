package com.atividade.cinema.service;

import com.atividade.cinema.model.Filme;
import com.atividade.cinema.repository.FilmeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FilmeService {

    @Autowired
    private FilmeRepository repository;

    public List<Filme> listarTodos() {
        return repository.findAll();
    }

    public Filme criar(Filme filme) {
        return repository.save(filme);
    }

    public Filme atualizar(Long id, Filme filme) {
        if (repository.existsById(id)) {
            filme.setId(id);
            return repository.save(filme);
        }
        return null;
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }
}