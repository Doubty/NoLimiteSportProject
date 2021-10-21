package br.com.nolimite.products.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.nolimite.products.entities.Produto;

public interface ProdutoRepository extends JpaRepository<Long, Produto>{

}
