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
      error: (err) => {
        console.error('Erro ao carregar tarefas:', err);
        alert('Erro ao carregar tarefas. Tente novamente.');
      }
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
      status: false, // sempre começa como pendente
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

    if (!this.tarefaSelecionada.titulo.trim() || !this.tarefaSelecionada.descricao.trim()) {
      alert('Título e descrição são obrigatórios.');
      return;
    }

    if (this.tarefaSelecionada.titulo.length < 3 || this.tarefaSelecionada.descricao.length < 5) {
      alert('Título deve ter pelo menos 3 caracteres e descrição pelo menos 5.');
      return;
    }

    this.tarefasService.updateTask(this.tarefaSelecionada).subscribe({
      next: () => {
        const index = this.tarefas.findIndex(t => t.id === this.tarefaSelecionada.id);
        if (index !== -1) this.tarefas[index] = { ...this.tarefaSelecionada };
        this.ordenar();
        this.fecharModal();
        alert('Tarefa atualizada com sucesso!');
      },
      error: (err) => {
        console.error('Erro ao atualizar tarefa:', err);
        alert('Erro ao atualizar tarefa. Tente novamente.');
      }
    });
  }

  adicionarTarefa(event?: Event) {
    if (event) event.preventDefault();

    if (!this.tarefaSelecionada.titulo.trim() || !this.tarefaSelecionada.descricao.trim()) {
      alert('Título e descrição são obrigatórios.');
      return;
    }

    if (this.tarefaSelecionada.titulo.length < 3 || this.tarefaSelecionada.descricao.length < 5) {
      alert('Título deve ter pelo menos 3 caracteres e descrição pelo menos 5.');
      return;
    }

    this.tarefasService.createTask(this.tarefaSelecionada).subscribe({
      next: (tarefa) => {
        this.tarefas.push(tarefa);
        this.ordenar();
        this.fecharModal();
        alert('Tarefa criada com sucesso!');
      },
      error: (err) => {
        console.error('Erro ao criar tarefa:', err);
        alert('Erro ao criar tarefa. Tente novamente.');
      }
    });
  }



  alternarStatus(tarefa: Tarefa) {
    tarefa.status = !tarefa.status;
    this.tarefasService.updateTask(tarefa).subscribe({
      next: () => this.ordenar(),
      error: (err) => {
        console.error('Erro ao atualizar status:', err);
        alert('Erro ao atualizar status da tarefa.');
      }
    });
  }

  excluirTarefa(id: number) {
    if (confirm(`Excluir tarefa?`)) {
      this.tarefasService.deleteTask(id).subscribe({
        next: () => {
          this.tarefas = this.tarefas.filter(t => t.id !== id);
          alert('Tarefa excluída com sucesso!');
        },
        error: (err) => {
          console.error('Erro ao excluir tarefa:', err);
          alert('Erro ao excluir tarefa. Tente novamente.');
        }
      });
    }
  }

  fecharModal() {
    this.mostrarModal = false;
    this.editando = false;
  }
}
