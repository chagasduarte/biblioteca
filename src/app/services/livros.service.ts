import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Livro } from '../models/livros';

@Injectable({
  providedIn: 'root'
})
export class LivrosService {
  private url = "http://localhost:3000/livros"
  constructor( private readonly httpClient: HttpClient) { }

  buscaLivros(): Observable<Livro[]>{
    return this.httpClient.get<Livro[]>(this.url);
  }
  buscaLivrosPorStatus(status:number): Observable<Livro[]>{
    return this.httpClient.get<Livro[]>(this.url + "status=" + status);
  }
  insereLivros(livro: Livro) {
    return this.httpClient.post<Livro>(this.url, livro);
  }

}
