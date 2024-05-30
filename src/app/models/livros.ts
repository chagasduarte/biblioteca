import { Status } from "../utils/enumerables";

export interface ILivro {
  id: number,
  nome: string,
  imagem: string,
  valor: number;
  status: Status
}

export class Livro implements ILivro {
  id!: number;
  nome!: string;
  imagem!: string;
  valor!: number;
  status!: Status;
}
