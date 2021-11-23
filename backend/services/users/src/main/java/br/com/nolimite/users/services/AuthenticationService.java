package br.com.nolimite.users.services;

import static java.util.Collections.emptyList;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import br.com.nolimite.users.dto.UsuarioDTO;
import br.com.nolimite.users.entities.Usuario;
import br.com.nolimite.users.repositories.UsuarioRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class AuthenticationService {
	static final long EXPIRATIONTIME = 864_000_00; 
	static final String SIGNINGKEY = "SecretKey";
	static final String PREFIX = "Bearer";
	
	static public void addToken(HttpServletResponse res, String	email) {
		String JwtToken = Jwts.builder().setSubject(email)
				.setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
				.signWith(SignatureAlgorithm.HS512, SIGNINGKEY)
				.compact();
		res.addHeader("Authorization", PREFIX + " " + JwtToken);
		res.addHeader("Access-Control-Expose-Headers", "Authorization");
	}
	
	static public Authentication getAuthentication(HttpServletRequest request) {
		String token = request.getHeader("Authorization");
		if (token != null) {
			String email = Jwts.parser()
					.setSigningKey(SIGNINGKEY)
					.parseClaimsJws(token.replace(PREFIX, ""))
					.getBody()
					.getSubject();
			if (email != null)
				return new UsernamePasswordAuthenticationToken(email, null, emptyList());
		}
		return null;
	}
	
	@Autowired
	private UsuarioRepository repo;
	@Autowired
	private ModelMapper mapper;
	
	public UsuarioDTO getUserByToken(String token) {
		if (token != null) {
			String email = Jwts.parser()
					.setSigningKey(SIGNINGKEY)
					.parseClaimsJws(token.replace(PREFIX, ""))
					.getBody()
					.getSubject();
			if (email != null) {
				Usuario usuario = repo.findByEmail(email);
				UsuarioDTO dto = mapper.map(usuario, UsuarioDTO.class);
				return dto;
			}
		}
		return null;
	}
}
