
export class Perfil {
  idPerfil: string;
  nomePerfil: string;
}

export class Aparelho {
  idAparelho: string;
  descricaoAparelho: string;
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



