
export class Perfil {
  id_perfil: string;
  nome_perfil: string;
}

export class Aparelho {
  id_aparelho: string;
  descricao_aparelho: string;
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



