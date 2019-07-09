
export class Perfil {
  idPerfil: number;
  nomePerfil: string;

   constructor(idPerfil?: number, nomePerfil?: string) {
     this.idPerfil = idPerfil;
     this.nomePerfil = nomePerfil;
   }
}

export class Aparelho {
  idAparelho: number;
  descricaoAparelho: string;
  codigo_aparelho: string;

  constructor(idAparelho?: number, descricaoAparelho?: string) {
    this.idAparelho = idAparelho;
    this.descricaoAparelho = descricaoAparelho;
  }
}


export class Pessoa {
  codigo: number;
  nome: string;
  login: string;
  email: string;
  senha: string;
  data_criacao: Date;
  tempo_expiracao_senha: number;
  cod_autorizacao: string;
  status_usuario: string;
  cod_pessoa: number;
  usuariosPerfil = new Array<Perfil>();
  usuariosAparelhos = new Array<Aparelho>();
 }



