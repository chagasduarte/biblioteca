import { Component, OnInit } from '@angular/core';
import { LivrosService } from '../../services/livros.service';
import { CommonModule } from '@angular/common';
import { Livro } from '../../models/livros';
import { Status } from '../../utils/enumerables';

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

  constructor(private readonly livrosService: LivrosService){}

  ngOnInit(): void {
    this.livrosService.getLivros().subscribe({
      next: (success: Livro[]) => {
        this.livros = success;
        this.leituras_atuais = success.filter(x => x.status == Status.lendo);
      }
    });
  }

}
