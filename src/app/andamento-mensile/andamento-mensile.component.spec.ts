import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AndamentoMensileComponent } from './andamento-mensile.component';

describe('AndamentoMensileComponent', () => {
  let component: AndamentoMensileComponent;
  let fixture: ComponentFixture<AndamentoMensileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AndamentoMensileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AndamentoMensileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
