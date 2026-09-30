import { Injectable, signal } from '@angular/core';
import { Livro } from '../models/livro.model';

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  private readonly livrosState = signal<Livro[]>([
    {
      id: 1,
      titulo: 'Clean Code: A Handbook of Agile Software Craftsmanship',
      preco: 189.9,
      publicadoEm: new Date('2008-08-01'),
      disponivel: true,
    },
    {
      id: 2,
      titulo: 'O Programador Pragmático',
      preco: 129.9,
      publicadoEm: new Date('1999-10-20'),
      disponivel: true,
    },
    {
      id: 3,
      titulo: 'Use a Cabeça! JavaScript',
      preco: 154.9,
      publicadoEm: new Date('2014-12-01'),
      disponivel: false,
    },
    {
      id: 4,
      titulo: 'Dom Casmurro',
      preco: 39.9,
      publicadoEm: new Date('1899-01-01'),
      disponivel: true,
    },
    {
      id: 5,
      titulo: 'O Hobbit',
      preco: 59.9,
      publicadoEm: new Date('1937-09-21'),
      disponivel: true,
    },
    {
      id: 6,
      titulo: 'A Hora da Estrela',
      preco: 34.9,
      publicadoEm: new Date('1977-10-26'),
      disponivel: false,
    },
    {
      id: 7,
      titulo: 'A Revolução dos Bichos',
      preco: 44.9,
      publicadoEm: new Date('1945-08-17'),
      disponivel: true,
    },
    {
      id: 8,
      titulo: 'A Morte de Ivan Ilitch',
      preco: 32.9,
      publicadoEm: new Date('1886-01-01'),
      disponivel: true,
    },
    {
      id: 9,
      titulo: '1984',
      preco: 49.9,
      publicadoEm: new Date('1949-06-08'),
      disponivel: true,
    },
    {
      id: 10,
      titulo: 'Crime e Castigo',
      preco: 59.9,
      publicadoEm: new Date('1866-01-01'),
      disponivel: true,
    },
    {
      id: 11,
      titulo: 'O Estrangeiro',
      preco: 39.9,
      publicadoEm: new Date('1942-05-19'),
      disponivel: true,
    },
    {
      id: 12,
      titulo: 'Ensaio sobre a Cegueira',
      preco: 54.9,
      publicadoEm: new Date('1995-01-01'),
      disponivel: false,
    },
    {
      id: 13,
      titulo: 'Java: Como Programar',
      preco: 239.9,
      publicadoEm: new Date('2016-01-01'),
      disponivel: true,
    },
    {
      id: 14,
      titulo: 'Effective Java',
      preco: 179.9,
      publicadoEm: new Date('2017-12-27'),
      disponivel: true,
    },
  ]);

  readonly livros = this.livrosState.asReadonly();

  listar(): Livro[] {
    return [...this.livros()];
  }

  buscarPorId(id: number): Livro | undefined {
    return this.livros().find((livro) => livro.id === id);
  }

  adicionar(livro: Livro): void {
    this.livrosState.update((livros) => [...livros, livro]);
  }

  atualizar(livroAtualizado: Livro): boolean {
    const livros = this.livros();
    const indice = livros.findIndex(
      (livro) => livro.id === livroAtualizado.id,
    );

    if (indice === -1) {
      return false;
    }

    this.livrosState.update((atuais) =>
      atuais.map((livro) =>
        livro.id === livroAtualizado.id ? livroAtualizado : livro,
      ),
    );
    return true;
  }

  remover(id: number): boolean {
    const livros = this.livros();
    const indice = livros.findIndex((livro) => livro.id === id);

    if (indice === -1) {
      return false;
    }

    this.livrosState.update((atuais) => atuais.filter((livro) => livro.id !== id));
    return true;
  }
}
