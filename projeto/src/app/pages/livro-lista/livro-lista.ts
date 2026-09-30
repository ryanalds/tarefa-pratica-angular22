import { Component, inject } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from '@openng/optimus-ui/table';
import { DialogModule } from '@openng/optimus-ui/dialog';
import { LivroService } from '../../services/livro.service';
import { Livro } from '../../models/livro.model';

@Component({
  selector: 'app-livro-lista',
  imports: [
    TableModule,
    DialogModule,
    FormsModule,
    CurrencyPipe,
    DatePipe,
  ],
  templateUrl: './livro-lista.html',
})
export class LivroLista {
  private readonly service = inject(LivroService);
  readonly livros = this.service.livros;

  dialogVisivel = false;
  livroEmEdicao: Livro | null = null;
  titulo = '';
  preco: number | null = null;
  publicadoEm = '';
  disponivel = true;

  abrirNovo(): void {
    this.livroEmEdicao = null;
    this.titulo = '';
    this.preco = null;
    this.publicadoEm = '';
    this.disponivel = true;
    this.dialogVisivel = true;
  }

  abrirEdicao(livro: Livro): void {
    this.livroEmEdicao = livro;
    this.titulo = livro.titulo;
    this.preco = livro.preco;
    this.publicadoEm = this.formatarDataInput(livro.publicadoEm);
    this.disponivel = livro.disponivel;
    this.dialogVisivel = true;
  }

  salvar(): void {
    const titulo = this.titulo.trim();
    if (!titulo || this.preco === null || this.preco < 0 || !this.publicadoEm) {
      return;
    }

    const dados = {
      titulo,
      preco: this.preco,
      publicadoEm: new Date(`${this.publicadoEm}T00:00:00`),
      disponivel: this.disponivel,
    };

    if (this.livroEmEdicao) {
      this.service.atualizar({ ...dados, id: this.livroEmEdicao.id });
    } else {
      this.service.adicionar(dados);
    }

    this.dialogVisivel = false;
  }

  remover(livro: Livro): void {
    if (!window.confirm(`Deseja remover o livro "${livro.titulo}"?`)) {
      return;
    }

    const id = livro.id;
    this.service.remover(id);
  }

  private formatarDataInput(data: Date): string {
    const dataValida = new Date(data);
    const ano = dataValida.getFullYear();
    const mes = String(dataValida.getMonth() + 1).padStart(2, '0');
    const dia = String(dataValida.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  }
}
