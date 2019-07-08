import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoaPesquisaComponent } from './pessoa-pesquisa/pessoa-pesquisa.component';
import { PerfilPesquisaComponent } from './perfil-pesquisa/perfil-pesquisa.component';
import { AparelhosPesquisaComponent } from './aparelhos-pesquisa/aparelhos-pesquisa.component';

const routes: Routes = [
  { path: 'usuarios', component: PessoaPesquisaComponent },
  { path: 'usuarios/nova', component: PessoaCadastroComponent },
  { path: 'usuarios/:codigo', component: PessoaCadastroComponent },
  { path: 'perfil', component: PerfilPesquisaComponent },
  { path: 'aparelhos', component: AparelhosPesquisaComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PessoaRoutingModule { }
