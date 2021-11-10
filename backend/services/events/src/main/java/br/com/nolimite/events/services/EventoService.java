package br.com.nolimite.events.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.nolimite.events.entities.Evento;
import br.com.nolimite.events.repositories.EventoRepository;

@Service
public class EventoService {
    @Autowired
    EventoRepository eventoRepo;

    public Evento updateEvento(Evento evento) {
        Evento event = eventoRepo.getById(evento.getId());
        event.setBannerUrl(evento.getBannerUrl());
        event.setTitulo(evento.getTitulo());
        event.setDescricao(evento.getDescricao());
        event.setDataSaida(evento.getDataSaida());
        event.setDataRetorno(evento.getDataRetorno());
        event.setLocalConcentracao(evento.getLocalConcentracao());
        event.setDestino(evento.getDestino());
        event.setQtdVagas(evento.getQtdVagas());
        event.setRitmo(evento.getRitmo());
        event.setTipoEvento(evento.getTipoEvento());
        event.setInfoComplementar(evento.getInfoComplementar());
        event.setTemCamisa(evento.getTemCamisa());

        final Evento updatedEvent = eventoRepo.save(event);
        return updatedEvent;
    }
}
