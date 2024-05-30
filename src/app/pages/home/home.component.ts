import { Component, OnInit } from '@angular/core';
import { LivrosService } from '../../services/livros.service';
import { CommonModule } from '@angular/common';
import { Livro } from '../../models/livros';
import { Status } from '../../utils/enumerables';
import { FormControl, FormGroup } from '@angular/forms';
import { randomInt } from 'crypto';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  livros!: Livro[];
  leituras_atuais!: Livro[];
  livroForm = new  FormGroup ({
    id: new FormControl(0),
    nome: new FormControl(""),
    imagem: new FormControl(""),
    valor: new FormControl(0),
    status: new FormControl(Status)
  })


  constructor(private readonly livrosService: LivrosService){}

  ngOnInit(): void {
    this.livrosService.buscaLivros().subscribe({
      next: (success: Livro[]) => {
        this.livros = success;
        this.leituras_atuais = success.filter(x => x.status == Status.lendo);
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
        console.log(success);
      }
    });
  }
  gerarID(){
    return randomInt(1000);
  }
}
