package br.com.nolimite.events.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.com.nolimite.events.entities.Inscricao;
import br.com.nolimite.events.repositories.InscricaoRepository;
import net.minidev.json.JSONObject;
import net.minidev.json.JSONValue;

@Service
public class InscricaoService {
    @Autowired
    InscricaoRepository inscricaoRepo;
    @Autowired
    RestService restService;

    public Inscricao save(Inscricao inscricao, String token) {
        System.out.println("ALOOOOOOOOOOOOOOOOOOOOOOO " + token);

        String json = restService.getUsersPlainJSON(token);
        System.out.println("ALIMENTOOOOOOOOOOOOOOO " + json);

        JSONObject jsonObj = (JSONObject) JSONValue.parse(json);
        String email = jsonObj.getAsString("email");

        System.out.println("EMAAAAAAAAAAAAAAAAAAAIL " + email);

        if (email != null || email != "") {
            inscricao.setCiclista(email);
            final Inscricao updatedInscricao = inscricaoRepo.save(inscricao);

            return updatedInscricao;
        }
        return null;
    }

    public Optional<Inscricao> validate(Long id) {
        System.out.println("INSCRICAAAAAAAAAAAAAAAAAAAO ");
        Optional<Inscricao> newInscricao = inscricaoRepo.findById(id);
        newInscricao.get().setEstaConfirmada(true);
        return newInscricao;
    }

    public List<Inscricao> findByUsuarioEmail(String email) {
        List<Inscricao> inscricoes = inscricaoRepo.findByCiclista(email);
        return inscricoes;
    };
}
