import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PessoaService } from './pessoa.service';
import { Pessoa } from '../model/pessoa';
import { Endereco } from '../model/endereco';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pessoa-add',
  templateUrl: './pessoa-add.component.html',
  styleUrls: ['./pessoa-add.component.css']
})
export class PessoaAddComponent implements OnInit {

  pessoaForm = this.fb.group({
    id: [],
    nome: [],
    email: [],
    endereco: this.fb.group({
      id: [],
      logradouro: [],
      numero: [],
      bairro: [],
      cep: [],
      estado: [],
      cidade: [],
    }),
  });

  alert: boolean;
  msgAlert: string;

  constructor(private pessoaService: PessoaService, private fb: FormBuilder, protected activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pessoa }) => {
      this.updateForm(pessoa);
    });
  }

  private createFromPessoaForm(): Pessoa {
    return {
      ...new Pessoa(),
      id: this.pessoaForm.get(['id']).value,
      nome: this.pessoaForm.get(['nome']).value,
      email: this.pessoaForm.get(['email']).value,
      enderecos: []
    };
  }

  private createEnderecoFromForm(): Endereco {
    return {
      ...new Endereco(),
      id: this.pessoaForm.get(['endereco']).get(['id']).value,
      logradouro: this.pessoaForm.get(['endereco']).get(['logradouro']).value,
      numero: this.pessoaForm.get(['endereco']).get(['numero']).value,
      bairro: this.pessoaForm.get(['endereco']).get(['bairro']).value,
      cep: this.pessoaForm.get(['endereco']).get(['cep']).value,
      estado: this.pessoaForm.get(['endereco']).get(['estado']).value,
      cidade: this.pessoaForm.get(['endereco']).get(['cidade']).value,
    };
  }

  updateForm(pessoa: Pessoa) {
    this.pessoaForm.patchValue({
      id: pessoa.id,
      nome: pessoa.nome,
      email: pessoa.email,
      endereco: {
        id: pessoa.enderecos[0].id,
        logradouro: pessoa.enderecos[0].logradouro,
        numero: pessoa.enderecos[0].numero,
        bairro: pessoa.enderecos[0].bairro,
        cep: pessoa.enderecos[0].cep,
        estado: pessoa.enderecos[0].estado,
        cidade: pessoa.enderecos[0].cidade,
      }
    });
  }

  public save(): any {
    const pessoa = this.createFromPessoaForm();
    const endereco = this.createEnderecoFromForm();
    pessoa.enderecos.push(endereco);
    if (pessoa.id) {
      this.pessoaService.update(pessoa).subscribe(res => {
        this.showAlert("Pessoa atualizada com sucesso!");
      });
    } else {
      this.pessoaService.create(pessoa).subscribe(res => {
        this.showAlert("Pessoa cadastrada com sucesso!")
      });
    }
  }


  showAlert(message: string) {
    this.msgAlert = message;
    this.alert = true;
    setTimeout(() => {
      this.alert = false;
    }, 3000);
  }
}
