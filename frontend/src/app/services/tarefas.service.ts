import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  status: boolean;      
  dataCriacao: string;
}

@Injectable({
  providedIn: 'root'
})
export class TarefasService {
  private apiUrl = 'http://localhost:5112/api/Tarefas';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(this.apiUrl);
  }

  createTask(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>(this.apiUrl, tarefa);
  }

  updateTask(tarefa: Tarefa): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${tarefa.id}`, tarefa);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
