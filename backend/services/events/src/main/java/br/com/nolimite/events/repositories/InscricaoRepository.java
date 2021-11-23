package br.com.nolimite.events.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.nolimite.events.entities.Inscricao;

public interface InscricaoRepository extends JpaRepository<Inscricao, Long> {
	Optional<Inscricao> findById(Long id);

	List<Inscricao> findByEventoId(Long eventoId);

	List<Inscricao> findByCiclista(String email);
}
