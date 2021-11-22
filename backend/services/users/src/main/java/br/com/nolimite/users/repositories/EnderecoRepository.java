package br.com.nolimite.users.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.nolimite.users.entities.Endereco;


public interface EnderecoRepository extends JpaRepository<Endereco, Long>{
	
}
