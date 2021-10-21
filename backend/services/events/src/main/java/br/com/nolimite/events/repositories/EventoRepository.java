package br.com.nolimite.events.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.nolimite.events.entities.Evento;

public interface EventoRepository extends JpaRepository<Long, Evento>{

}
