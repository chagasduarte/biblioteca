import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Livro } from '../models/livros';

@Injectable({
  providedIn: 'root'
})
export class LivrosService {

  constructor( private readonly httpClient: HttpClient) { }

  getLivros(): Observable<Livro[]>{
    return this.httpClient.get<Livro[]>("http://localhost:3000/livros");
  }
  getLivrosPorStatus(status:number): Observable<Livro[]>{
    return this.httpClient.get<Livro[]>("http://localhost:3000/livros?status=" + status);
  }

}
