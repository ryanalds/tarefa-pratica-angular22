import { Routes } from '@angular/router';
import { LivroLista } from './pages/livro-lista/livro-lista';

export const routes: Routes = [
  { path: '', redirectTo: 'livros', pathMatch: 'full' },
  { path: 'livros', component: LivroLista },
];
