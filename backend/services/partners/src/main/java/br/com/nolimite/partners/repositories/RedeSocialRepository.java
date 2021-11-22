package br.com.nolimite.partners.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import br.com.nolimite.partners.entities.LojaParceira;
import br.com.nolimite.partners.entities.RedeSocial;

@RepositoryRestResource()
public interface RedeSocialRepository extends JpaRepository<RedeSocial, Long>{
	List<RedeSocial> findByLoja (LojaParceira loja);
}
