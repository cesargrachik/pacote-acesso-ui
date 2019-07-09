import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from '../../core/error-handler.service';
import { AparelhosFiltro, AparelhosService } from '../aparelhos.service';

@Component({
  selector: 'app-aparelhos-pesquisa',
  templateUrl: './aparelhos-pesquisa.component.html',
  styleUrls: ['./aparelhos-pesquisa.component.css']
})
export class AparelhosPesquisaComponent implements OnInit {


  totalRegistros = 0;
  filtro = new AparelhosFiltro();
  aparelhos = [];
  @ViewChild('tabela') grid;

  constructor(
    private aparelhosService: AparelhosService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private toasty: ToastyService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Aparelhos');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.aparelhosService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.aparelhos = resultado.aparelhos;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(aparelhos: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(aparelhos);
      }
    });
  }

  excluir(aparelhos: any) {
    this.aparelhosService.excluir(aparelhos.id_aparelho)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.toasty.success('Aparelhos excluído com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
