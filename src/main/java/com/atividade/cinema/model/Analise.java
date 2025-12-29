package com.atividade.cinema.model;

import jakarta.persistence.*;

@Entity
public class Analise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String filmeTitulo; // Opcional, apenas para facilitar a leitura
    private String analise; // O texto da análise
    private double nota;

    // Relacionamento: Muitas análises para Um filme
    @ManyToOne
    @JoinColumn(name = "filme_id")
    private Filme filme;

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getFilmeTitulo() { return filmeTitulo; }
    public void setFilmeTitulo(String filmeTitulo) { this.filmeTitulo = filmeTitulo; }

    public String getAnalise() { return analise; }
    public void setAnalise(String analise) { this.analise = analise; }

    public double getNota() { return nota; }
    public void setNota(double nota) { this.nota = nota; }

    public Filme getFilme() { return filme; }
    public void setFilme(Filme filme) { this.filme = filme; }
}