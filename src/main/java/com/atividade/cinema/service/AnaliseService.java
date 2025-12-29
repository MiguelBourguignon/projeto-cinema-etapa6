package com.atividade.cinema.service;

import com.atividade.cinema.model.Analise;
import com.atividade.cinema.repository.AnaliseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AnaliseService {

    @Autowired
    private AnaliseRepository repository;

    public List<Analise> listarTodas() {
        return repository.findAll();
    }

    public Analise criar(Analise analise) {
        return repository.save(analise);
    }

    public Analise atualizar(Long id, Analise analiseAtualizada) {
        if (repository.existsById(id)) {
            analiseAtualizada.setId(id);
            return repository.save(analiseAtualizada);
        }
        return null;
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }
}