package br.edu.ufersa.pw.nolimitesport.entities;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="tb_usuarios")
public class Usuario {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long id;
	
	@Column(unique=true)
	private String email;
	
	@OneToOne
	@JoinColumn(name="id_endereco")
	private Endereco endereco;
	
	@ManyToOne
	@JoinColumn(name="id_grupo_pedal")
	private GrupoPedal groupPedal;
	
	private String senha;
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
	
	public Usuario() {
		
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Endereco getEndereco() {
		return endereco;
	}
	public void setEndereco(Endereco endereco) {
		this.endereco = endereco;
	}
	public GrupoPedal getGroupPedal() {
		return groupPedal;
	}
	public void setGroupPedal(GrupoPedal groupPedal) {
		this.groupPedal = groupPedal;
	}
	public String getSenha() {
		return senha;
	}
	public void setSenha(String senha) {
		this.senha = senha;
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
