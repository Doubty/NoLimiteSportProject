package br.com.nolimite.events.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.nolimite.events.entities.Inscricao;

public interface InscricaoRepository extends JpaRepository<Inscricao, Long> {

}
