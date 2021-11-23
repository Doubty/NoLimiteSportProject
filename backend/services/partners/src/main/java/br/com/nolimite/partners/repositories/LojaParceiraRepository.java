package br.com.nolimite.partners.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import br.com.nolimite.partners.entities.LojaParceira;

@RepositoryRestResource()
public interface LojaParceiraRepository extends JpaRepository<LojaParceira, Long> {

}
