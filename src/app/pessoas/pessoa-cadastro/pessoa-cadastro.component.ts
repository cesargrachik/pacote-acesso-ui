import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoaService } from './../pessoa.service';
import { Pessoa , Perfil, Aparelho } from './../../core/model';
import { ConfirmationService } from 'primeng/components/common/api';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();
  exbindoFormularioPerfil = false;
  exbindoFormularioAparelho = false;
  perfil: Perfil;
  aparelho: Aparelho;


  perfilCombo =  [ { label : 'Administrador', value: '1'},
                   { label : 'Gerente', value: '2'},
                   { label : 'Vendedor', value: '3'},
                   { label : 'Vendedor Externo', value: '4'},
                   { label : 'Comprador', value: '5'},
                   { label : 'Auxiliar Administrativo', value: '6'}   ];

  aparelhoCombo =  [ { label : 'NoteBook', value: '1'},
                   { label : 'Monitor', value: '2'},
                   { label : 'HD externo', value: '3'},
                   { label : 'Cabo USB', value: '4'},
                   { label : 'Teclado', value: '5'},
                   { label : 'Mouse', value: '6'}  ];

  status =  [{ label : 'Ativo', value: 'A'},
             { label : 'Inativo', value: 'I'}];

  tempoExpiracaoSenha =  [{ label : '1 dias', value: '1'},
             { label : '2 Dias', value: '2'},
             { label : '5 Dias', value: '5'},
             { label : '10 Dias', value: '10'},
             { label : '30 Dias', value: '30'},
             { label : '365 Dias', value: '365'} ];

  constructor(
    private pessoaService: PessoaService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private confirmation: ConfirmationService
  ) { }

  ngOnInit() {
    const codigoPessoa = this.route.snapshot.params['codigo'];

    this.title.setTitle('Novo Usuário');
    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }
  }

  get editando() {
    return Boolean(this.pessoa.codigo)
  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
      .then(pessoa => {
        this.pessoa = pessoa;
        this.atualizarTituloEdicao();
       })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  adicionarPessoa(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
      .then(pessoaAdicionada => {
        this.toasty.success('Pessoa adicionada com sucesso!');
        this.router.navigate(['/usuarios']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPessoa(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
      .then(pessoa => {
        this.pessoa = pessoa;

        this.toasty.success('Pessoa alterada com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  nova(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.pessoa = new Pessoa();
    }.bind(this), 1);

    this.router.navigate(['/usuarios/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }

  prepararNovoPerfil() {
    this.exbindoFormularioPerfil = true;
    this.perfil = new Perfil();
  }


  confirmarPerfil(frm: FormControl) {
    this.pessoa.usuariosPerfil.push(this.clonarPerfil(this.perfil));
    this.exbindoFormularioPerfil = false;
    frm.reset();
  }

  clonarPerfil(perfil: Perfil): Perfil {
     return new Perfil(perfil.idPerfil , perfil.nomePerfil);
  }

  prepararNovoAparelho() {
    this.exbindoFormularioAparelho = true;
    this.aparelho = new Aparelho();
  }

  confirmarAparelho(frm: FormControl) {
    this.pessoa.usuariosAparelhos.push(this.clonarAparelho(this.aparelho));
    this.exbindoFormularioPerfil = false;
    frm.reset();
  }

  clonarAparelho(aparelho: Aparelho): Aparelho {
     return new Aparelho(aparelho.idAparelho , aparelho.descricaoAparelho);
  }


  confirmarExclusao(pessoa: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.toasty.success('Usuário sem permissão para excluir!');
      }
    });
  }

}
