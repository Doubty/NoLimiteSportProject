package br.com.nolimite.users.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.nolimite.users.dto.CreateUsuarioDTO;
import br.com.nolimite.users.dto.UsuarioDTO;
import br.com.nolimite.users.repositories.UsuarioRepository;
import br.com.nolimite.users.services.AuthenticationService;
import br.com.nolimite.users.services.UsuarioService;

@RestController
@RequestMapping("api/usuarios")
public class UsuarioController {
	@Autowired
	UsuarioRepository userRepo;
	@Autowired
	UsuarioService service;
	@Autowired
	AuthenticationService authService;
	
	
	@GetMapping("/search/byEmail")
	public UsuarioDTO getByEmail(@Param("email") String email) {
		return service.findByEmail(email);
	}
	
	@GetMapping("/search/byToken")
	public UsuarioDTO getByToken(@RequestHeader("Authorization") String token) {
		return authService.getUserByToken(token);
	}
	
	@PostMapping
	public ResponseEntity<UsuarioDTO> save (@RequestBody CreateUsuarioDTO dto) {
		
		
		UsuarioDTO user =   service.save(dto);
		if(user==null) {
			return new ResponseEntity<> (null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		else {
			return new ResponseEntity<> (user, HttpStatus.CREATED);
		}
	}
	@DeleteMapping(value="/{email}")
	public ResponseEntity<String> delete (@PathVariable String email){
		UsuarioDTO dto = new UsuarioDTO();
		dto.setEmail(email);
		try {
			service.delete(dto);
			return new ResponseEntity<>(email,HttpStatus.OK);
		}
		catch(Exception e) {
			return new ResponseEntity<>("",HttpStatus.NOT_FOUND);
		}
	}
}
