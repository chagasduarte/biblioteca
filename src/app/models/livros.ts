export interface ILivro {
  id: number,
  nome: string,
  imagem: string,
  valor: number;
  status: number
}

export class Livro implements ILivro {
  id!: number;
  nome!: string;
  imagem!: string;
  valor!: number;
  status!: number;

}
