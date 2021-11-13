package br.com.nolimite.users.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import br.com.nolimite.users.entities.Usuario;
@RepositoryRestResource()
public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
	Usuario findByEmail(String email);
	public void deleteByEmail(String email);
}
