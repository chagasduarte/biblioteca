import { Component, NgModule, OnInit } from '@angular/core';
import { LivrosService } from '../../services/livros.service';
import { CommonModule } from '@angular/common';
import { Livro } from '../../models/livros';
import { Status } from '../../utils/enumerables';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  valorTotalBiblioteca!: number;
  livros!: Livro[];
  leituras_atuais!: Livro[];
  livroForm = new  FormGroup ({
    id: new FormControl(0),
    nome: new FormControl(""),
    imagem: new FormControl(""),
    valor: new FormControl(0),
    status: new FormControl(Status)
  });


  constructor(private readonly livrosService: LivrosService){}

  ngOnInit(): void {
    this.buscaLivros();
  }

  buscaLivros(){
    this.livrosService.buscaLivros().subscribe({
      next: (success: Livro[]) => {
        this.livros = success;
        this.leituras_atuais = this.livros.filter(x => x.status == Status.lendo);
        this.valorTotalBiblioteca = 0;
        this.livros.forEach( x => this.valorTotalBiblioteca += x.valor);
      }
    });
  }

  inserelivro(){
    let livro: Livro = {
      id: this.gerarID(),
      imagem: this.livroForm.controls.imagem.value || "",
      nome: this.livroForm.controls.nome.value || "",
      status: Status.ocio,
      valor: this.livroForm.controls.valor.value || 0
    }
    this.livrosService.insereLivros(livro).subscribe({
      next: (success: Livro) => {
        this.buscaLivros();
        this.livroForm.reset();
      },
      error: (err: any) => {
        console.log(err)
      }
    });
  }
  gerarID(){
    return this.livros.length + 1
  }
}
