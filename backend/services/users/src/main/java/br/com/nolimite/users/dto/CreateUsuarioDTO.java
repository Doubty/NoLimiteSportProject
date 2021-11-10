package br.com.nolimite.users.dto;

import java.util.UUID;

public class CreateUsuarioDTO {
	private String email;
	private String senha;
	
	public String getSenha() {
		return senha;
	}
	public void setSenha(String senha) {
		this.senha = senha;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
}
