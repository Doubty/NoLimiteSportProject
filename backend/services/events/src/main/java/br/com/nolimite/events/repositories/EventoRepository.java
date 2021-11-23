package br.com.nolimite.events.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import br.com.nolimite.events.entities.Evento;

@RepositoryRestResource()
public interface EventoRepository extends JpaRepository<Evento, Long> {
	Optional<Evento> findById (Long id);
}
