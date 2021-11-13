package br.com.nolimite.users.services;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import br.com.nolimite.users.dto.CreateUsuarioDTO;
import br.com.nolimite.users.dto.UsuarioDTO;
import br.com.nolimite.users.entities.Usuario;
import br.com.nolimite.users.repositories.UsuarioRepository;

@Service
public class UsuarioService {
	@Autowired
	private UsuarioRepository repo;
	@Autowired
	private ModelMapper mapper;
	public UsuarioDTO findByEmail(String email) {
		Usuario usuario = repo.findByEmail(email);
		UsuarioDTO dto = mapper.map(usuario, UsuarioDTO.class);
		return dto;
	}
	public CreateUsuarioDTO findUsuarioByEmail(String email) {
		Usuario usuario = repo.findByEmail(email);
		CreateUsuarioDTO dto = mapper.map(usuario, CreateUsuarioDTO.class);
		return dto;
	}
	@Transactional(propagation=Propagation.REQUIRED, readOnly=false)
	public UsuarioDTO save(CreateUsuarioDTO dto) {
		Usuario usuario = new Usuario();
		usuario = mapper.map(dto, Usuario.class);
		return mapper.map(repo.save(usuario), UsuarioDTO.class);
	}
	@Transactional(propagation=Propagation.REQUIRED, readOnly=false)
	public void delete (UsuarioDTO dto) {
		repo.deleteByEmail(dto.getEmail());
	}
}
