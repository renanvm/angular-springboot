import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {PessoaService} from './pessoa.service';
import {Pessoa} from '../model/pessoa';
import {Endereco} from '../model/endereco';

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

  constructor(private pessoaService: PessoaService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
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

  public save(): any {
    const pessoa = this.createFromPessoaForm();
    const endereco = this.createEnderecoFromForm();
    pessoa.enderecos.push(endereco);
    this.pessoaService.create(pessoa).subscribe(res => {
      console.log(res);
    });
  }

}
