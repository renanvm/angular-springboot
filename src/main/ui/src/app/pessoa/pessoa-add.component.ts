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
  enderecos: Endereco[] = [];

  constructor(private pessoaService: PessoaService, private fb: FormBuilder, protected activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pessoa }) => {
      this.updateForm(pessoa)
      this.enderecos = pessoa.enderecos;
    });
  }

  private createFromPessoaForm(): Pessoa {
    return {
      ...new Pessoa(),
      id: this.pessoaForm.get(['id']).value,
      nome: this.pessoaForm.get(['nome']).value,
      email: this.pessoaForm.get(['email']).value,
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
    });
  }

  cleanForm() {
    this.pessoaForm.patchValue({
      id: [],
      nome: [],
      email: [],
      endereco: {
        id: [],
        logradouro: [],
        numero: [],
        bairro: [],
        cep: [],
        estado: [],
        cidade: [],
      }
    });
  }

  public save(): any {
    const pessoa = this.createFromPessoaForm();
    pessoa.enderecos = this.enderecos;
    if (pessoa.id) {
      this.pessoaService.update(pessoa).subscribe(res => {
        this.showAlert("Pessoa atualizada com sucesso!");
        this.cleanForm();
        this.enderecos = [];
      });
    } else {
      this.pessoaService.create(pessoa).subscribe(res => {
        this.showAlert("Pessoa cadastrada com sucesso!")
        this.cleanForm();
        this.enderecos = [];
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

  addEndereco() {
    const endereco = this.createEnderecoFromForm();
    this.enderecos.push(endereco);
  }

  removeEndereco(index) {
    this.enderecos = this.enderecos.filter((endereco, i) => {
      return i != index
    })
  }

}
