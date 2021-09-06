import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanestrategicoComponent } from './planestrategico.component';

describe('PlanestrategicoComponent', () => {
  let component: PlanestrategicoComponent;
  let fixture: ComponentFixture<PlanestrategicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanestrategicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanestrategicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
