import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Aparelho } from './../core/model';

export class AparelhosFiltro {
  descricaoAparelho: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class AparelhosService {

  aparelhosUrl = 'http://localhost:8080/aparelhos';

  constructor(private http: Http) { }

  pesquisar(filtro: AparelhosFiltro): Promise<any> {
    const params = new URLSearchParams();
    const headers = new Headers();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricaoAparelho) {
      params.set('descricaoAparelho', filtro.descricaoAparelho);
    }

    return this.http.get(`${this.aparelhosUrl}`, { headers, search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const aparelhos = responseJson.content;
        const resultado = {
          aparelhos,
          total: responseJson.totalElements
          };

        return resultado;
      })
  }

  listarTodas(): Promise<any> {
    const headers = new Headers();
    return this.http.get(this.aparelhosUrl, { headers })
      .toPromise()
      .then(response => response.json().content);
  }

  excluir(codigo: number): Promise<void> {
    const headers = new Headers();
     return this.http.delete(`${this.aparelhosUrl}/${codigo}`, { headers })
      .toPromise()
      .then(() => null);
  }


  adicionar(aparelho: Aparelho): Promise<Aparelho> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

      return this.http.post(this.aparelhosUrl, JSON.stringify(aparelho), { headers })
      .toPromise()
      .then(response => response.json());
  }

  atualizar(aparelho: Aparelho): Promise<Aparelho> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.aparelhosUrl}/${aparelho.idAparelho}`,
        JSON.stringify(aparelho), { headers })
      .toPromise()
      .then(response => response.json() as Aparelho);
  }

  buscarPorCodigo(codigo: number): Promise<Aparelho> {
    return this.http.get(`${this.aparelhosUrl}/${codigo}`)
      .toPromise()
      .then(response => response.json() as Aparelho);
  }



}
