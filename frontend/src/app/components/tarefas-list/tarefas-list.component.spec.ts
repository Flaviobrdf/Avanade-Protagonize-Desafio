import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarefasListComponent } from './tarefas-list.component';

describe('TarefasListComponent', () => {
  let component: TarefasListComponent;
  let fixture: ComponentFixture<TarefasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarefasListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarefasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
