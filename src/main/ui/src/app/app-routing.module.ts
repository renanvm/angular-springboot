import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PessoaListComponent } from './pessoa/pessoa-list.component';
import { PessoaAddComponent } from './pessoa/pessoa-add.component';
import { PessoaService } from './pessoa/pessoa.service';
import { Pessoa } from './model/pessoa';
import { Observable, of } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PessoaResolve implements Resolve<Pessoa> {
  constructor(private service: PessoaService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Pessoa> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id);
    }
    return of(new Pessoa());
  }
}

const routes: Routes = [
  { path: 'pessoa-list', component: PessoaListComponent },
  { path: 'pessoa-add', component: PessoaAddComponent },
  {
    path: 'pessoa-update/:id', component: PessoaAddComponent, resolve: {
      pessoa: PessoaResolve
    },
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
