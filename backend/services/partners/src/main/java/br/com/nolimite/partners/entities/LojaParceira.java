package br.com.nolimite.partners.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "tb_partners")
public class LojaParceira {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "id_address")
    private Endereco endereco;

    @OneToMany(mappedBy = "socialnetwork")
    private List<RedeSocial> redeSocialList = new ArrayList<RedeSocial>();

    private String nome;
    private String email;
    private String telefone;
    private String url_banner;

    public LojaParceira() {
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Endereco getEndereco() {
        return this.endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    public List<RedeSocial> getRedeSocialList() {
        return this.redeSocialList;
    }

    public void setRedeSocialList(List<RedeSocial> redeSocialList) {
        this.redeSocialList = redeSocialList;
    }

    public String getNome() {
        return this.nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefone() {
        return this.telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getUrl_banner() {
        return this.url_banner;
    }

    public void setUrl_banner(String url_banner) {
        this.url_banner = url_banner;
    }

}
