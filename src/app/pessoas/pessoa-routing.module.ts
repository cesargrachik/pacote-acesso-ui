import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoaPesquisaComponent } from './pessoa-pesquisa/pessoa-pesquisa.component';
import { PerfilPesquisaComponent } from './perfil-pesquisa/perfil-pesquisa.component';
import { AparelhosPesquisaComponent } from './aparelhos-pesquisa/aparelhos-pesquisa.component';
import { PerfilCadastroComponent } from './perfil-cadastro/perfil-cadastro.component';
import { AparelhosCadastroComponent } from './aparelhos-cadastro/aparelhos-cadastro.component';

const routes: Routes = [
  { path: 'usuarios', component: PessoaPesquisaComponent },
  { path: 'usuarios/nova', component: PessoaCadastroComponent },
  { path: 'usuarios/:codigo', component: PessoaCadastroComponent },
  { path: 'perfil', component: PerfilPesquisaComponent },
  { path: 'perfil/nova', component: PerfilCadastroComponent },
  { path: 'aparelhos', component: AparelhosPesquisaComponent },
  { path: 'aparelhos/nova', component: AparelhosCadastroComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PessoaRoutingModule { }
