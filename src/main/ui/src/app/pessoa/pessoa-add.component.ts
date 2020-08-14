import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {PessoaService} from './pessoa.service';
import {Pessoa} from '../model/pessoa';

@Component({
  selector: 'app-pessoa-add',
  templateUrl: './pessoa-add.component.html',
  styleUrls: ['./pessoa-add.component.css']
})
export class PessoaAddComponent implements OnInit {

  pessoaForm = this.fb.group({
    id: [],
    nome: [],
    email: []
  });

  constructor(private pessoaService: PessoaService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  private createFromForm(): Pessoa {
    return {
      ...new Pessoa(),
      id: this.pessoaForm.get(['id']).value,
      nome: this.pessoaForm.get(['nome']).value,
      email: this.pessoaForm.get(['email']).value
    };
  }

  public save(): any{
    const pessoa = this.createFromForm();
    this.pessoaService.create(pessoa).subscribe(res => {
      console.log(res);
    });
  }

}
