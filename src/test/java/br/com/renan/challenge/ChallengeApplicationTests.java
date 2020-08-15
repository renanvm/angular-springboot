package br.com.renan.challenge;

import br.com.renan.challenge.controller.PessoaController;
import br.com.renan.challenge.domain.Pessoa;
import br.com.renan.challenge.repository.PessoaRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import javax.transaction.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
class ChallengeApplicationTests {

    @Autowired
    private PessoaRepository pessoaRepository;
    private MockMvc restPessoaMockMvc;
    private static final Long DEFAULT_ID = 1l;
    private static final String DEFAULT_NOME = "Renan";
    private static final String DEFAULT_EMAIL = "renan@email.com";
    private Pessoa pessoa;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PessoaController pessoaController = new PessoaController(pessoaRepository);
        this.restPessoaMockMvc = MockMvcBuilders.standaloneSetup(pessoaController).build();
    }

    @BeforeEach
    public void initTest() {
        pessoa = new Pessoa();
        pessoa.setId(DEFAULT_ID);
        pessoa.setNome(DEFAULT_NOME);
        pessoa.setEmail(DEFAULT_EMAIL);
    }

    @Test
    @Transactional
    public void createPessoa() throws Exception {
        int databaseSize = pessoaRepository.findAll().size();

        restPessoaMockMvc.perform(post("/api/pessoas").contentType(MediaType.APPLICATION_JSON)
                .content(this.convertToJson(pessoa))).andExpect(status().isCreated());

        List<Pessoa> pessoaList = pessoaRepository.findAll();
        assertThat(pessoaList).hasSize(databaseSize + 1);
        Pessoa testPessoa = pessoaList.get(pessoaList.size() - 1);
        assertThat(testPessoa.getId()).isEqualTo(DEFAULT_ID);
        assertThat(testPessoa.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testPessoa.getEmail()).isEqualTo(DEFAULT_EMAIL);
    }


    public String convertToJson(Pessoa pessoa) {
        ObjectMapper mapper = new ObjectMapper();
        String json = null;
        try {
            json = mapper.writeValueAsString(pessoa);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return json;
    }

}
