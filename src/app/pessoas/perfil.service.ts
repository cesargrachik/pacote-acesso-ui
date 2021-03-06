import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { Perfil } from './../core/model';

export class PerfilFiltro {
  nomePerfil: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PerfilService {

  perfilUrl = 'http://localhost:8080/perfil';

  constructor(private http: Http) { }

  pesquisar(filtro: PerfilFiltro): Promise<any> {
    const params = new URLSearchParams();
    const headers = new Headers();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nomePerfil) {
      params.set('nomePerfil', filtro.nomePerfil);
    }

    return this.http.get(`${this.perfilUrl}`, { headers, search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const perfis = responseJson.content;
        // console.log(perfis);
        const resultado = {
          perfis,
          total: responseJson.totalElements
          };

        return resultado;
      })
  }

  listarTodas(): Promise<any> {
    const headers = new Headers();
    return this.http.get(this.perfilUrl, { headers })
      .toPromise()
      .then(response => response.json().content);
  }

  excluir(codigo: number): Promise<void> {
    const headers = new Headers();
     return this.http.delete(`${this.perfilUrl}/${codigo}`, { headers })
      .toPromise()
      .then(() => null);
  }


  adicionar(perfil: Perfil): Promise<Perfil> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    headers.append('Content-Type', 'application/json');
     return this.http.post(this.perfilUrl, JSON.stringify(perfil), { headers })
      .toPromise()
      .then(response => response.json());
  }

  atualizar(perfil: Perfil): Promise<Perfil> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.perfilUrl}/${perfil.idPerfil}`,
        JSON.stringify(perfil), { headers })
      .toPromise()
      .then(response => response.json() as Perfil);
  }

  buscarPorCodigo(codigo: number): Promise<Perfil> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(`${this.perfilUrl}/${codigo}`, { headers })
      .toPromise()
      .then(response => response.json() as Perfil);
  }



}
