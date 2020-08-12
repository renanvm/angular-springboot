package br.com.renan.challenge.controller;

import br.com.renan.challenge.domain.Pessoa;
import br.com.renan.challenge.repository.PessoaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping("/pessoas")
public class PessoaController {

    private PessoaRepository pessoaRepository;

    public PessoaController(PessoaRepository pessoaRepository) {
        this.pessoaRepository = pessoaRepository;
    }

    @PostMapping
    public ResponseEntity<?> createPessoa(@RequestBody Pessoa pessoa) throws URISyntaxException {
        Pessoa result = pessoaRepository.save(pessoa);
        return ResponseEntity.created(new URI("/api/pessoas/" + result.getId()))
                .body(result);
    }

    @PutMapping
    public ResponseEntity<?> updatePessoa(@RequestBody Pessoa pessoa) {
        if (pessoa.getId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Campo Id vazio");
        }
        Pessoa result = pessoaRepository.save(pessoa);
        return ResponseEntity.ok()
                .body(result);
    }

    @GetMapping
    public ResponseEntity<?> getAllPessoas() {
        return ResponseEntity.ok().body(pessoaRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPessoa(@PathVariable Long id) {
        if (pessoaRepository.findById(id).isPresent()) {
            Pessoa pessoa = pessoaRepository.findById(id).get();
            return ResponseEntity.ok().body(pessoa);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePessoa(@PathVariable Long id) {
        if (pessoaRepository.findById(id).isPresent()) {
            pessoaRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

}
