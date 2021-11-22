package br.com.nolimite.partners.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.nolimite.partners.entities.LojaParceira;
import br.com.nolimite.partners.entities.RedeSocial;
import br.com.nolimite.partners.repositories.LojaParceiraRepository;
import br.com.nolimite.partners.repositories.RedeSocialRepository;

@Service
public class LojasParceirasService {
	@Autowired
    LojaParceiraRepository lojasRepo;
	
	@Autowired
    RedeSocialRepository redeRepo;
	
	public List<LojaParceira> findAll() {
		List<LojaParceira> newList = lojasRepo.findAll();
		newList.stream().forEach(b -> b.setRedeSocialList(redeRepo.findByLoja(b)));
		//newList.stream().forEach(b -> b.setRedeSocialList(null));
		return newList;
	}
	
	public LojaParceira save (LojaParceira lojaParceira){
		if (lojaParceira.getRedeSocialList() != null) {
			lojaParceira.getRedeSocialList().stream().forEach(b -> b.setLoja(lojaParceira));
		}
        lojasRepo.save(lojaParceira);
        return lojaParceira;
    }
}
