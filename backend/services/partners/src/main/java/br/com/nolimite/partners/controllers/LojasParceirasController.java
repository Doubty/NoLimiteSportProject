package br.com.nolimite.partners.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.nolimite.partners.entities.LojaParceira;
import br.com.nolimite.partners.repositories.LojaParceiraRepository;
import br.com.nolimite.partners.repositories.RedeSocialRepository;
import br.com.nolimite.partners.services.LojasParceirasService;

@RestController
@CrossOrigin
@RequestMapping("/api/lojaParceiras/todos")
public class LojasParceirasController {
    @Autowired
    LojaParceiraRepository lojasRepo;
    
    @Autowired
    RedeSocialRepository redeRepo;
    
    @Autowired
    LojasParceirasService lojasService;

    @GetMapping
    public List<LojaParceira> getLojasParceiras() {
        return lojasService.findAll();
    }
    
    @PostMapping
	public ResponseEntity<LojaParceira> save (@RequestBody LojaParceira loja) {
		
		
		LojaParceira lojaParceira = lojasService.save(loja);
		if(lojaParceira==null) {
			return new ResponseEntity<> (null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		else {
			return new ResponseEntity<> (lojaParceira, HttpStatus.CREATED);
		}
	}
}