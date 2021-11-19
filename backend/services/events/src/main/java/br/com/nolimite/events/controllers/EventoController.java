package br.com.nolimite.events.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.nolimite.events.entities.Evento;
import br.com.nolimite.events.repositories.EventoRepository;
import br.com.nolimite.events.services.EventoService;

@RestController
@CrossOrigin
@RequestMapping("/api/eventos")
public class EventoController {
    @Autowired
    EventoRepository eventoRepo;
    @Autowired
    EventoService eventoService;

    @GetMapping
    public List<Evento> getEventos() {
        return eventoRepo.findAll();
    }
    
    @GetMapping("/search/byId")
	public Optional<Evento> getByEmail(@Param("id") Long id) {
		return eventoService.findById(id);
	}

    @PostMapping
    public ResponseEntity<Evento> postEvento(@RequestBody Evento evento) {
        Evento event = eventoRepo.save(evento);
        if (event == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(event, HttpStatus.ACCEPTED);
        }
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<Evento> updateEvento(@RequestBody Evento evento) {
        Evento event = eventoService.updateEvento(evento);
        if (event == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(event, HttpStatus.ACCEPTED);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEvento(@PathVariable Long id) {
        try {
            eventoRepo.deleteById(id);
            return new ResponseEntity<>("Deletado com Sucesso", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("", HttpStatus.NOT_FOUND);
        }
    }

}
