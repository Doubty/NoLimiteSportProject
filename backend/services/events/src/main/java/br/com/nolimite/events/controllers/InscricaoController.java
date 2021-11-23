package br.com.nolimite.events.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.nolimite.events.entities.Inscricao;
import br.com.nolimite.events.repositories.InscricaoRepository;
import br.com.nolimite.events.services.InscricaoService;

@RestController
@CrossOrigin
@RequestMapping("/api/eventos/inscricoes")
public class InscricaoController {
    @Autowired
    InscricaoRepository inscricaoRepo;
    @Autowired
    InscricaoService inscricaoService;

    @GetMapping
    public List<Inscricao> getInscricoes() {
        return inscricaoRepo.findAll();
    }

    @GetMapping("/byEmail")
    public List<Inscricao> findByUsuarioEmail(@Param("email") String email) {
        return inscricaoService.findByUsuarioEmail(email);
    }

    @PostMapping
    public ResponseEntity<Inscricao> postInscricao(@RequestBody Inscricao inscricao,
            @RequestHeader("Authorization") String token) {
        Inscricao inscrito = inscricaoService.save(inscricao, token);

        if (inscrito == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(inscrito, HttpStatus.ACCEPTED);
        }
    }

    @PostMapping("/validateById")
    public ResponseEntity<Inscricao> validate(@Param("id") Long id, @RequestHeader("Authorization") String token) {
        Inscricao inscrito = inscricaoService.validate(id).get();
        inscricaoRepo.save(inscrito);

        if (inscrito == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(inscrito, HttpStatus.ACCEPTED);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEvento(@PathVariable Long id) {
        try {
            inscricaoRepo.deleteById(id);
            return new ResponseEntity<>("Deletado com sucesso", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("", HttpStatus.NOT_FOUND);
        }
    }
}
