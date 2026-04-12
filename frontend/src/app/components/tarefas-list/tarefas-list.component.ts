import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TarefasService, Tarefa } from '../../services/tarefas.service';

@Component({
  selector: 'app-tarefas-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tarefas-list.component.html',
  styleUrls: ['./tarefas-list.component.css']
})
export class TarefasListComponent implements OnInit {
  tarefas: Tarefa[] = [];
  tarefasFiltradas: Tarefa[] = [];
  termoPesquisa: string = '';

  mostrarModal = false;
  editando = false;

  tarefaSelecionada: Tarefa = {
    id: 0,
    titulo: '',
    descricao: '',
    status: false,
    dataCriacao: ''
  };

  constructor(private tarefasService: TarefasService) { }

  ngOnInit() {
    this.tarefasService.getTasks().subscribe({
      next: (tarefas) => {
        this.tarefas = tarefas;
        this.tarefasFiltradas = [...tarefas];
        this.ordenar();
      },
      error: (err) => console.error('Erro ao carregar tarefas:', err)
    });
  }

  ordenar() {
    this.tarefas.sort((a, b) => {
      if (a.status !== b.status) {
        return a.status ? 1 : -1;
      }
      return new Date(a.dataCriacao).getTime() - new Date(b.dataCriacao).getTime();
    });
    this.filtrar();
  }

  filtrar() {
    const termo = this.termoPesquisa.trim().toLowerCase();
    if (!termo) {
      this.tarefasFiltradas = [...this.tarefas];
      return;
    }
    this.tarefasFiltradas = this.tarefas.filter(t =>
      (t.titulo && t.titulo.toLowerCase().includes(termo)) ||
      (t.descricao && t.descricao.toLowerCase().includes(termo))
    );
  }

  abrirModal() {
    this.editando = false;
    this.tarefaSelecionada = {
      id: 0,
      titulo: '',
      descricao: '',
      status: false, // ✅ sempre começa como pendente
      dataCriacao: new Date().toISOString()
    };
    this.mostrarModal = true;
  }

  editarTarefa(tarefa: Tarefa) {
    this.editando = true;
    this.tarefaSelecionada = { ...tarefa };
    this.mostrarModal = true;
  }

  salvarEdicao(event?: Event) {
    if (event) event.preventDefault();
    this.tarefasService.updateTask(this.tarefaSelecionada).subscribe({
      next: () => {
        const index = this.tarefas.findIndex(t => t.id === this.tarefaSelecionada.id);
        if (index !== -1) this.tarefas[index] = { ...this.tarefaSelecionada };
        this.ordenar();
        this.fecharModal();
      }
    });
  }

  adicionarTarefa(event?: Event) {
    if (event) event.preventDefault();
    this.tarefasService.createTask(this.tarefaSelecionada).subscribe({
      next: (tarefa) => {
        this.tarefas.push(tarefa);
        this.ordenar();
        this.fecharModal();
      },
      error: (err) => console.error('Erro ao criar tarefa:', err)
    });
  }

  alternarStatus(tarefa: Tarefa) {
    tarefa.status = !tarefa.status;
    this.tarefasService.updateTask(tarefa).subscribe({
      next: () => this.ordenar()
    });
  }

  excluirTarefa(id: number) {
    if (confirm(`Excluir tarefa?`)) {
      this.tarefasService.deleteTask(id).subscribe({
        next: () => this.tarefas = this.tarefas.filter(t => t.id !== id)
      });
    }
  }

  fecharModal() {
    this.mostrarModal = false;
    this.editando = false;
  }
}
