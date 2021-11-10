package br.com.nolimite.users.dto;

import java.time.LocalDate;
import java.util.UUID;

public class CreateUsuarioDTO {
	private String email;
	private String senha;
	private Long groupPedal;
    private String nome;
    private String telefoneCelular;
    private String telefoneFixo;
    private String cpf;
    private String sexo;
    private LocalDate dataNascimento;
    private String tipoSanguineo;
    private String planoSaude;
    private Integer nivel;
    private String temCamisa;
	
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
	public Long getGroupPedal() {
		return groupPedal;
	}
	public void setGroupPedal(Long groupPedal) {
		this.groupPedal = groupPedal;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getTelefoneCelular() {
		return telefoneCelular;
	}
	public void setTelefoneCelular(String telefoneCelular) {
		this.telefoneCelular = telefoneCelular;
	}
	public String getTelefoneFixo() {
		return telefoneFixo;
	}
	public void setTelefoneFixo(String telefoneFixo) {
		this.telefoneFixo = telefoneFixo;
	}
	public String getCpf() {
		return cpf;
	}
	public void setCpf(String cpf) {
		this.cpf = cpf;
	}
	public String getSexo() {
		return sexo;
	}
	public void setSexo(String sexo) {
		this.sexo = sexo;
	}
	public LocalDate getDataNascimento() {
		return dataNascimento;
	}
	public void setDataNascimento(LocalDate dataNascimento) {
		this.dataNascimento = dataNascimento;
	}
	public String getTipoSanguineo() {
		return tipoSanguineo;
	}
	public void setTipoSanguineo(String tipoSanguineo) {
		this.tipoSanguineo = tipoSanguineo;
	}
	public String getPlanoSaude() {
		return planoSaude;
	}
	public void setPlanoSaude(String planoSaude) {
		this.planoSaude = planoSaude;
	}
	public Integer getNivel() {
		return nivel;
	}
	public void setNivel(Integer nivel) {
		this.nivel = nivel;
	}
	public String getTemCamisa() {
		return temCamisa;
	}
	public void setTemCamisa(String temCamisa) {
		this.temCamisa = temCamisa;
	}
	
}
