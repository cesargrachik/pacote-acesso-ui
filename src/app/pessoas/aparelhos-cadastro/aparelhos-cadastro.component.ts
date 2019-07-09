import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AparelhosService } from './../aparelhos.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Aparelho } from './../../core/model';

@Component({
  selector: 'app-aparelhos-cadastro',
  templateUrl: './aparelhos-cadastro.component.html',
  styleUrls: ['./aparelhos-cadastro.component.css']
})
export class AparelhosCadastroComponent implements OnInit {

    aparelho = new Aparelho();

    constructor(private aparelhosService: AparelhosService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private confirmation: ConfirmationService) { }

  ngOnInit() {
   const codigoAparelho = this.route.snapshot.params['idAparelho'];

    this.title.setTitle('Novo Aparelho Usuário');

    if (codigoAparelho) {
      this.carregarAparelho(codigoAparelho);
    }
  }

  carregarAparelho(codigo: number) {
    this.aparelhosService.buscarPorCodigo(codigo)
      .then(aparelhoPesquisa => {
        this.aparelho = aparelhoPesquisa;
        this.atualizarTituloEdicao();
       })
      .catch(erro => this.errorHandler.handle(erro));
  }

  nova(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.aparelho = new Aparelho();
    }.bind(this), 1);

    this.router.navigate(['/aparelho/nova']);
  }

  get editando() {
    return Boolean(this.aparelho.idAparelho)
  }


  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizar(form);
     } else {
      this.adicionar(form);
    }
  }


  adicionar(form: FormControl) {
    this.aparelhosService.adicionar(this.aparelho)
      .then(aparelhoAdicionado => {
        this.toasty.success('Aparelho adicionado com sucesso!');
        this.router.navigate(['/aparelhos']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizar(form: FormControl) {
    this.aparelhosService.atualizar(this.aparelho)
      .then(aparelhoAtualizado => {
        this.aparelho = aparelhoAtualizado;

        this.toasty.success('Aparelho alterado com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Aparelho: ${this.aparelho.descricaoAparelho}`);
  }


}
