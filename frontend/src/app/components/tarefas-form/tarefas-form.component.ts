import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TarefasService, Tarefa } from '../../services/tarefas.service';

@Component({
  selector: 'app-tarefas-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tarefas-form.component.html',
  styleUrls: ['./tarefas-form.component.css']
})
export class TarefasFormComponent {
  novaTarefa: Tarefa = {
    id: 0,
    titulo: '',
    descricao: '',
    status: false,
    dataCriacao: new Date().toISOString()
  };

  constructor(private tarefasService: TarefasService) {}

  salvarTarefa(event?: Event) {
    if (event) event.preventDefault();
    this.tarefasService.createTask(this.novaTarefa).subscribe({
      next: (tarefa) => {
        console.log('Tarefa criada:', tarefa);
        // limpa o formulário
        this.novaTarefa = {
          id: 0,
          titulo: '',
          descricao: '',
          status: false,
          dataCriacao: new Date().toISOString()
        };
      },
      error: (err) => console.error('Erro ao criar tarefa:', err)
    });
  }
}
