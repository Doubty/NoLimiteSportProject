package br.com.nolimite.events.entities;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;


@Entity
@Table(name = "tb_incricoes")
public class Inscricao {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@JoinColumn(name = "id_evento", insertable = false, updatable = false)
	@ManyToOne(targetEntity = Evento.class)
	@JsonIgnore
	private Evento evento;

	@Column(name = "id_evento")
	private Long eventoId;

	// ciclista possui um relacionamento com a tabela de usuário
	private String ciclista;
	private boolean estaConfirmada;
	private String tipoPagamento;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
	@JsonDeserialize(using = LocalDateDeserializer.class)
	@JsonSerialize(using = LocalDateSerializer.class)
	private LocalDate dataPagamento;

	private String termoUrl;
	private boolean estaCancelada;

	public Inscricao() {
	}

	public Long getEventoId() {
		return eventoId;
	}

	public void setEventoId(Long eventoId) {
		this.eventoId = eventoId;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Evento getEvento() {
		return evento;
	}

	public void setEvento(Evento evento) {
		this.evento = evento;
	}

	public String getCiclista() {
		return ciclista;
	}

	public void setCiclista(String ciclista) {
		this.ciclista = ciclista;
	}

	public boolean isEstaConfirmada() {
		return estaConfirmada;
	}

	public void setEstaConfirmada(boolean estaConfirmada) {
		this.estaConfirmada = estaConfirmada;
	}

	public String getTipoPagamento() {
		return tipoPagamento;
	}

	public void setTipoPagamento(String tipoPagamento) {
		this.tipoPagamento = tipoPagamento;
	}

	public LocalDate getDataPagamento() {
		return dataPagamento;
	}

	public void setDataPagamento(LocalDate dataPagamento) {
		this.dataPagamento = dataPagamento;
	}

	public String getTermoUrl() {
		return termoUrl;
	}

	public void setTermoUrl(String termoUrl) {
		this.termoUrl = termoUrl;
	}

	public boolean isEstaCancelada() {
		return estaCancelada;
	}

	public void setEstaCancelada(boolean estaCancelada) {
		this.estaCancelada = estaCancelada;
	}
}
