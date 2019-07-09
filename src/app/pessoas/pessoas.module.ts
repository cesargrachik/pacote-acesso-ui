import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { DialogModule } from 'primeng/components/dialog/dialog';

import { SharedModule } from './../shared/shared.module';
import { PessoaPesquisaComponent } from './pessoa-pesquisa/pessoa-pesquisa.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoaRoutingModule } from './pessoa-routing.module';
import { PerfilPesquisaComponent } from './perfil-pesquisa/perfil-pesquisa.component';
import { PerfilCadastroComponent } from './perfil-cadastro/perfil-cadastro.component';
import { AparelhosPesquisaComponent } from './aparelhos-pesquisa/aparelhos-pesquisa.component';
import { AparelhosCadastroComponent } from './aparelhos-cadastro/aparelhos-cadastro.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    DataTableModule,
    TooltipModule,
    InputMaskModule,
    DropdownModule,
    CalendarModule,
    DialogModule,
    SharedModule,
    PessoaRoutingModule
  ],
  declarations: [
    PessoaCadastroComponent,
    PessoaPesquisaComponent,
    PerfilCadastroComponent,
    PerfilPesquisaComponent,
    AparelhosPesquisaComponent,
    AparelhosCadastroComponent
  ],
  exports: []
})
export class PessoasModule { }
