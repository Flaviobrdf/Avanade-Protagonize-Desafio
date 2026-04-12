import { Routes } from '@angular/router';
import { TarefasListComponent } from './components/tarefas-list/tarefas-list.component';
import { TarefasFormComponent } from './components/tarefas-form/tarefas-form.component';

export const routes: Routes = [
  { path: 'tarefas', component: TarefasListComponent },
  { path: 'nova-tarefa', component: TarefasFormComponent },
  { path: '', redirectTo: '/tarefas', pathMatch: 'full' }
];

