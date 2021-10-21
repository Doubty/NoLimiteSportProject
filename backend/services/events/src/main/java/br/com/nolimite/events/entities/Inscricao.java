package br.com.nolimite.events.entities;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "tb_registrations")
public class Inscricao {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_evento")
    private Evento evento;

    // ciclista possui um relacionamento com a tabela de usuário
    private Long ciclista;
    private boolean estaCondirmada;
    private String tipoPagamento;
    private LocalDate dataPagamento;
    private String termoUrl;
    private boolean estaCancelada;

    public Inscricao() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Evento getEvento() {
        return evento;
    }

    public void setEvento(Evento evento) {
        this.evento = evento;
    }

    public Long getCiclista() {
        return ciclista;
    }

    public void setCiclista(Long ciclista) {
        this.ciclista = ciclista;
    }

    public boolean isEstaCondirmada() {
        return estaCondirmada;
    }

    public void setEstaCondirmada(boolean estaCondirmada) {
        this.estaCondirmada = estaCondirmada;
    }

    public String getTipoPagamento() {
        return tipoPagamento;
    }

    public void setTipoPagamento(String tipoPagamento) {
        this.tipoPagamento = tipoPagamento;
    }

    public LocalDate getDataPagamento() {
        return dataPagamento;
    }

    public void setDataPagamento(LocalDate dataPagamento) {
        this.dataPagamento = dataPagamento;
    }

    public String getTermoUrl() {
        return termoUrl;
    }

    public void setTermoUrl(String termoUrl) {
        this.termoUrl = termoUrl;
    }

    public boolean isEstaCancelada() {
        return estaCancelada;
    }

    public void setEstaCancelada(boolean estaCancelada) {
        this.estaCancelada = estaCancelada;
    }
}
