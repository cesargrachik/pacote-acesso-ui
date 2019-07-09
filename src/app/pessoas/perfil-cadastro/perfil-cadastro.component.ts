import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PerfilService } from './../perfil.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Perfil } from './../../core/model';

@Component({
  selector: 'app-perfil-cadastro',
  templateUrl: './perfil-cadastro.component.html',
  styleUrls: ['./perfil-cadastro.component.css']
})
export class PerfilCadastroComponent implements OnInit {

  perfil = new Perfil();

  constructor(
    private perfilService: PerfilService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private confirmation: ConfirmationService) { }

  ngOnInit() {

    const codigoPerfil = this.route.snapshot.params['idPerfil'];

    this.title.setTitle('Novo Perfil Usuário');

    if (codigoPerfil) {
      this.carregarPerfil(codigoPerfil);
    }
  }

  carregarPerfil(codigo: number) {
    this.perfilService.buscarPorCodigo(codigo)
      .then(perfilPesquisa => {
        this.perfil = perfilPesquisa;
        this.atualizarTituloEdicao();
       })
      .catch(erro => this.errorHandler.handle(erro));
  }


  nova(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.perfil = new Perfil();
    }.bind(this), 1);

    this.router.navigate(['/perfil/nova']);
  }

  get editando() {
    return Boolean(this.perfil.idPerfil)
  }


  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizar(form);
     } else {
      this.adicionar(form);
    }
  }


  adicionar(form: FormControl) {
    this.perfilService.adicionar(this.perfil)
      .then(perfilAdicionado => {
        this.toasty.success('Perfil adicionado com sucesso!');
        this.router.navigate(['/perfil']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizar(form: FormControl) {
    this.perfilService.atualizar(this.perfil)
      .then(perfilAtualizado => {
        this.perfil = perfilAtualizado;

        this.toasty.success('Perfil alterado com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de perfil: ${this.perfil.nomePerfil}`);
  }

}
