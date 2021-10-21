package br.com.nolimite.users.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.nolimite.users.entities.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{

}
