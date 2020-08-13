import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PessoaListComponent } from './pessoa/pessoa-list.component';
import { PessoaAddComponent } from './pessoa/pessoa-add.component';



const routes: Routes = [
  { path: 'pessoa-list', component: PessoaListComponent },
  { path: 'pessoa-add', component: PessoaAddComponent },

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
